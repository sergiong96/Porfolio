const http = require('http');
const urlPars = require('url');
const mysql = require('mysql2');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const host = 'localhost';
const port = 8080;

const conn = mysql.createConnection({ //Creación conexión BD
    host: "localhost",
    user: "root",
    password: "usuario",
    database: "marketart"
});


conn.connect(function (error) { //Verificación y conexión
    if (error) {
        console.log("Error al conectarse con la base de datos");
        process.exit();
    } else {
        console.log("Conexión exitosa con la base de datos");
    }
});

const server = http.createServer((req, res) => { //Creación servidor
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, X-Api-Key, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'); //Estas 3 líneas son necesarias para evitar el bloqueo de la política CORS, ya que mando la solicitud desde un host distinto (el 4200 de Angular)

    if (req.method === 'OPTIONS') {
        // Manejo de la solicitud OPTIONS para preflight, así no me da error en las solicitudes POST
        res.writeHead(204); //Respuesta exitosa sin contenido
        res.end();
        return;
    }
    const url = req.url; //const {url}=req es lo mismo, significa que extraiga req.url y lo guarde en la variable url

    if (url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Servidor en funcionamiento");

    } else if (url.includes("/productosOferta")) {
        let consultaOfer = "SELECT * FROM productos WHERE precio_unitario<10.00";
        conn.query(consultaOfer, (error, resultado) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Error al realizar la consulta" }));
                return;
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(resultado));
            }
        });

    } else if (req.method === "GET" && url.includes("/productosNavBar")) {
        let parsedUrl = urlPars.parse(req.url, true); //Parseo la URL para obtener sus parámetros
        let id_categoria = parsedUrl.query.id_categoria; //Extraigo el valor de id_categoria

        let consultaNav = `SELECT * FROM productos WHERE id_categoria=?`;

        conn.query(consultaNav, [id_categoria], (error, resultado) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Error al realizar la consulta" }));
                return;
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(resultado));
            }
        });

    } else if (req.method === "GET" && url.includes("/productDetail")) {

        let parsedURL = urlPars.parse(req.url, true);

        let productCat = parsedURL.query.productCat;
        let productID = parsedURL.query.productId;

        const consultaDetail = "SELECT * FROM productos WHERE id_categoria=? AND id_producto=?";

        conn.query(consultaDetail, [productCat, productID], (error, resultado) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Error al realizar la consulta" }));
                return;
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(resultado));
            }
        })


    } else if (req.method === "GET" && url.includes("/detallePedido")) {

        let parsedUrl = urlPars.parse(req.url, true);
        let idPedido = parsedUrl.query.idPedido;

        const consultaDetallePedido = "SELECT p.id_pedido, dp.id_detalle_pedido, prod.id_producto, prod.nombre, dp.cantidad, prod.precio_unitario, prod.url_imagen FROM detalle_pedidos AS dp INNER JOIN pedidos AS p ON dp.id_pedido=p.id_pedido INNER JOIN productos AS prod ON prod.id_producto=dp.id_producto WHERE dp.id_pedido=? ORDER BY dp.id_pedido ASC";
        conn.query(consultaDetallePedido, [idPedido], (error, result) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Error al realizar la consulta" }));
                return;
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            }
        })

    } else if (req.method === "GET" && url.includes("/datosUsuarioPedido")) {
        let parsedURL = urlPars.parse(req.url, true);
        const tokenSesion = parsedURL.query.tokenSesion;
        const secretKey = '952258821675233518';

        let tokenDecodificado = jwt.verify(tokenSesion, secretKey);

        let id_user = tokenDecodificado.id_usuario;
        let correo = tokenDecodificado.correo;
        const consultaInfoUserPurchase = `SELECT nombre, primer_apellido, segundo_apellido, correo, telefono, direccion 
        FROM user_info WHERE id_user=? AND correo=?`;

        conn.query(consultaInfoUserPurchase, [id_user, correo], (error, result) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Error al realizar la consulta" }));
                return;
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            }
        });

    } else if (req.method === "GET" && url === "/pedidos") {

        const bearerToken = req.headers['authorization'];
        const tokenSesion = bearerToken.split(' ')[1];

        const secretKey = '952258821675233518';
        const tokenDecodificado = jwt.verify(tokenSesion, secretKey);
        const id_cliente = tokenDecodificado.id_usuario;
        const consultaPedidos = "SELECT * FROM pedidos WHERE id_cliente=?";

        conn.query(consultaPedidos, [id_cliente], (error, result) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Error al realizar la consulta" }));
                return;
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            }
        });

    } else if (req.method === "POST" && url.includes("/realizarPedido")) {

        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            let dataChunks = Buffer.concat(chunks);
            let dataClienteString = dataChunks.toString();
            let dataClienteJSON = JSON.parse(dataClienteString);
            console.log("Datos recibidos: ", dataClienteJSON);

            //Insertar en tabla pedidos (ok)
            const tokenUser = dataClienteJSON.tokenSesion;
            const secretKey = '952258821675233518';
            const tokenDecodificado = jwt.verify(tokenUser, secretKey);

            const id_cliente = tokenDecodificado.id_usuario;
            const productosPedidos = dataClienteJSON.arrayPedidos;
            const fecha = dataClienteJSON.fecha;
            let gasto_total = 0;

            for (const producto of productosPedidos) {
                
                gasto_total += parseFloat(producto.precio)*parseInt(producto.cantidad);
                console.log("Producto ", producto);
            }
            console.log("Gasto total ", gasto_total);
            const consultaInsertPedido = "INSERT INTO pedidos (fecha, id_cliente, gasto_total) VALUES (?,?,?)";

            console.log("Datos a insertar en tabla pedidos: ", id_cliente, fecha, gasto_total);

            conn.query(consultaInsertPedido, [fecha, id_cliente, gasto_total], (error, result) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Error al realizar la consulta" }));
                    return;
                } else {
                    console.log("Pedido insertado con éxito en la tabla pedidos");
                }
            });


            //Insertar en tabla detalle pedidos
            const getLastIdQuery = 'SELECT LAST_INSERT_ID() AS id_pedido'; //Para obtener el id_pedido despues de insertar el pedido
            conn.query(getLastIdQuery, (error, result) => {
                if (error) {
                    console.error("Error al realizar la consulta", error);
                    return;
                } else {
                    var idPedidoLast = result[0].id_pedido; //Debe ser el resultado de la consulta de last_insert_id
                    var contInsertOk = 0;
                    for (producto of productosPedidos) { //Iterar sobre el array de productos

                        let cantidad = producto.cantidad;
                        let idProducto = producto.idProducto;
                        const consultaInsertDetallePedido = "INSERT INTO detalle_pedidos (cantidad, id_pedido, id_producto) VALUES (?,?,?)";
                        console.log("Datos a insertar en tabla detalle_pedidos: ", idPedidoLast, cantidad, idProducto);

                        conn.query(consultaInsertDetallePedido, [cantidad, idPedidoLast, idProducto], (error, result) => {
                            if (error) {
                                console.error("Error al realizar la consulta", error);
                                return;
                            } else {
                                console.log("Producto ", idProducto, " insertado con éxito en la tabla detalle_pedidos");
                                contInsertOk++;
                                if (contInsertOk === productosPedidos.length) {
                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify("El pedido ha sido registrado con éxito"));
                                }

                            }
                        });

                    }
                }


            });

        });

    } else if (req.method === "POST" && url.includes("/areaCliente")) {
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            let dataChunks = Buffer.concat(chunks);
            let dataClienteString = dataChunks.toString();
            let dataClienteJSON = JSON.parse(dataClienteString);


            const tokenUser = dataClienteJSON.tokenUser;
            const secretKey = '952258821675233518';

            let tokenDecodificado = jwt.verify(tokenUser, secretKey);

            let id_User = tokenDecodificado.id_usuario;
            let email = tokenDecodificado.correo;

            const consultaAreaCliente = `SELECT ui.id_user, ui.nombre, ui.primer_apellido, ui.segundo_apellido, ui.correo, ui.telefono, ui.direccion, p.id_pedido, p.fecha, p.estado, p.id_cliente, dp.id_detalle_pedido, dp.cantidad, dp.id_pedido, dp.id_producto, prod.precio_unitario, prod.url_imagen 
            FROM user_info AS ui 
            INNER JOIN pedidos AS p ON ui.id_user=p.id_cliente 
            INNER JOIN detalle_pedidos AS dp ON p.id_pedido=dp.id_pedido 
            INNER JOIN productos AS prod ON prod.id_producto=dp.id_producto 
            WHERE ui.id_user=? AND ui.correo=?`;

            conn.query(consultaAreaCliente, [id_User, email], (error, response) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Error al realizar la consulta" }));
                    return;
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(response));
                }
            });
        });

    } else if (req.method === "POST" && url.includes("/login")) {

        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            let data = Buffer.concat(chunks); //Se guardan los datos que han llegado como streams binarios

            let dataString = data.toString(); //Se guardan esos datos pero como cadena de texto

            /*Otra forma de obtener los parámetros de la url:*/
            /*let datosParsed = new URLSearchParams(dataString); //Se parsea la URL para obtener sus parámetros
            let objetoForm = {};
            for (entrada of datosParsed.entries()) {
                objetoForm[entrada[0]] = entrada[1]; //Se guardan los parámetros y valores del formulario en un objeto
            }*/

            let datosLogin = JSON.parse(dataString);
            let correoLogin = datosLogin.correo;
            let passLogin = datosLogin.pass;

            let consultaLogin = "SELECT id_user, nombre, contraseña_hash FROM user_info WHERE correo=?";
            conn.query(consultaLogin, [correoLogin], (error, resultado) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Error al realizar la consulta" }));
                    return;
                }

                if (resultado.length === 0) { //Si el correo no coincide con ningun almacenado en la BD
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Credenciales inválidas" }));
                    return;
                }


                const hashBD = resultado[0]['contraseña_hash'];
                let id_usuario = resultado[0].id_user;

                const datosLoginToken = { //PayLoad token
                    id_usuario: id_usuario,
                    correo: correoLogin
                };

                //Puedo determinar  el tiempo que tardará el token en expirar y perder su validez.

                bcryptjs.compare(passLogin, hashBD, (error, result) => {
                    if (error) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "Error al realizar la consulta" }));
                        return;
                    } else if (result) { //Si la contraseña coincide
                        let nombreUsuario = resultado[0].nombre;
                        const claveSecreta = '952258821675233518';
                        let tokenSesion = jwt.sign(datosLoginToken, claveSecreta);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ mensaje: "Iniciando sesión...", tokenSesion, nombreUsuario }));


                    } else if (!result) { //Si no coincide
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "Credenciales inválidas" }));
                    }
                });
            });

        });




    } else if (req.method === "POST" && url.includes('/registro')) {

        const chunks = [];

        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            let data = Buffer.concat(chunks);
            let dataString = data.toString();
            const formData = JSON.parse(dataString); //Se hace así en este caso, cambia el modo de tratar los datos que llegan debido a la forma en la que he pasado los datos del formulario

            console.log("Datos formulario registro:", formData);

            bcryptjs.genSalt(10, (err, salt) => {
                if (err) {
                    console.log("Error al generar el salt");
                    return;
                }
                bcryptjs.hash(formData.pass, salt, (err, hash) => {
                    if (err) {
                        console.log("Error al generar el hash");
                        return;
                    }

                    let nombre = formData.nombre;
                    let primer_apellido = formData.primerApellido;
                    let segundo_apellido = formData.segundoApellido;
                    let email = formData.correo;
                    let telefono = formData.telefono;
                    let direccion = formData.direccion;
                    let contraseña = hash;

                    const queryInsert = "INSERT INTO user_info (nombre, primer_apellido, segundo_apellido, correo,telefono, direccion, contraseña_hash) VALUES (?,?,?,?,?,?,?)";

                    conn.query(queryInsert, [nombre, primer_apellido, segundo_apellido, email, telefono, direccion, contraseña], (error, resultado) => {
                        if (error) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: "Error al realizar la consulta" }));
                            return;
                        } else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify("¡Registro Exitoso!"));
                        }

                    });

                });
            });

        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Ruta no encontrada");
    }
});


server.listen(port, host, () => { //Servidor en escucha
    console.log(`El servidor está activo y escuchando en ${host}: ${port}`)
});
