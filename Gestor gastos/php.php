<?php

//CONEXIÓN
$mysqli_conn = new mysqli('localhost', 'root', 'usuario', 'gesgas');

if ($mysqli_conn->connect_errno) { //Conexión con la Base de Datos
    echo "Error de conexión: " . $mysqli_conn->connect_errno;
}

//CONSULTAS GRÁFICA PRINCIPAL ANUAL
if (isset($_GET["barrasAnual"])) {
    $sql_anual = "SELECT YEAR(fecha) as AÑOS, SUM(cantidad) as TOTAL FROM gastos GROUP by YEAR(fecha)";
    $resultado_anual = $mysqli_conn->query($sql_anual);

    //Procesar datos para pasarselos a javascript
    $datos_anual = [];

    foreach ($resultado_anual as $i => $ra) {
        $datos_anual[$i]["YEARS"] = intval($ra["AÑOS"]);
        $datos_anual[$i]["GASTO"] = floatval($ra["TOTAL"]);
        
    }

    sort($datos_anual);

    echo json_encode($datos_anual);
}



//CONSULTAS GRÁFICA PRINCIPAL MENSUAL
if (isset($_GET["yearMes"])) {

    $año_seleccionado = intval($_GET['yearMes']);

    $sql_mensual = "SELECT YEAR(fecha) as ANIO, MONTH(fecha) as MES, SUM(cantidad) as TOTAL FROM gastos WHERE YEAR(fecha)='$año_seleccionado' GROUP BY MONTH(fecha), YEAR(fecha) ORDER BY YEAR(fecha), MONTH(fecha); ";
    $resultado_mensual = $mysqli_conn->query($sql_mensual);

    if ($resultado_mensual) {
        $datos_mensual = [];

        foreach ($resultado_mensual as $i => $valor) {
            $datos_mensual[$i]['ANIO'] = intval($valor['ANIO']);
            $datos_mensual[$i]['MES'] = intval($valor['MES']);
            $datos_mensual[$i]['GASTO'] = floatval($valor['TOTAL']);
            switch ($datos_mensual[$i]['MES']) {
                case 1: $datos_mensual[$i]['MES'] = "Enero"; break;
                case 2: $datos_mensual[$i]['MES'] = "Febrero"; break;
                case 3: $datos_mensual[$i]['MES'] = "Marzo"; break;
                case 4: $datos_mensual[$i]['MES'] = "Abril"; break;
                case 5: $datos_mensual[$i]['MES'] = "Mayo"; break;
                case 6: $datos_mensual[$i]['MES'] = "Junio"; break;
                case 7: $datos_mensual[$i]['MES'] = "Julio"; break;
                case 8: $datos_mensual[$i]['MES'] = "Agosto"; break;
                case 9: $datos_mensual[$i]['MES'] = "Septiembre"; break;
                case 10: $datos_mensual[$i]['MES'] = "Octubre"; break;
                case 11: $datos_mensual[$i]['MES'] = "Noviembre"; break;
                case 12: $datos_mensual[$i]['MES'] = "Diciembre"; break;
            }
        }

        $datos_json_mensual = json_encode($datos_mensual);
        echo $datos_json_mensual;
    }
}



//CONSULTAS GRÁFICA PRINCIPAL SEMANAL
if(isset($_GET['yearSem']) && isset($_GET['mesSem'])){
    $year= intval($_GET['yearSem']);
    $mes= $_GET['mesSem'];


    switch($mes){
        case "Enero": $mes = '01'; break;
        case "Febrero": $mes = '02'; break;
        case "Marzo": $mes = '03'; break;
        case "Abril": $mes = '04'; break;
        case "Mayo": $mes = '05'; break;
        case "Junio": $mes = '06'; break;
        case "Julio": $mes = '07'; break;
        case "Agosto": $mes = '08'; break;
        case "Septiembre": $mes = '09'; break;
        case "Octubre": $mes = '10'; break;
        case "Noviembre": $mes = '11'; break;
        case "Diciembre": $mes = '12'; break;
    }
    
    $sql_semanal="SELECT fecha as FECHA, DAY(fecha) as DIA, sum(cantidad) AS GASTO FROM gastos WHERE YEAR(fecha)='$year' AND MONTH(fecha)='$mes' group by DAY(fecha), MONTH(fecha) ORDER BY DIA;";
    $resultado_semanal=$mysqli_conn->query($sql_semanal);


    if($resultado_semanal){ //Codigo para meter en datos_semanal la fecha distribuidas en semanas dias 1,2,3,4,5,6,7=semana 1, etc y los gastos de esa semanas 
        $datos_semanal=[
            "SEMANA 1"=>0,
            "SEMANA 2"=>0,
            "SEMANA 3"=>0,
            "SEMANA 4"=>0,
            "SEMANA 5"=>0,
        ];

            foreach($resultado_semanal as $i=>$valor){
                $dia=intval($valor['DIA']);
                $gasto=floatval($valor['GASTO']);


                if($dia>=1 && $dia<=7){
                    $datos_semanal['SEMANA 1']+=$gasto;

                }else if($dia>=8 && $dia<=14){
                    $datos_semanal['SEMANA 2']+=$gasto;

                }else if($dia>=15 && $dia<=21){
                    $datos_semanal['SEMANA 3']+=$gasto;

                }else if($dia>=22 && $dia<=28){
                    $datos_semanal['SEMANA 4']+=$gasto;

                }else if($dia>=29 && $dia<=31){
                    $datos_semanal['SEMANA 5']+=$gasto;
                }
            }

            $datos_json_semanal=json_encode($datos_semanal);
            echo $datos_json_semanal;

    }


}


//FORMULARIO AÑADIR GASTO
if(isset($_POST["Fecha"]) && isset($_POST["Cantidad"]) && isset($_POST["Categoria"]) && isset($_POST["Asunto"])){

    $asunto=$_POST["Asunto"];
    $fecha=$_POST["Fecha"];
    $cantidad=$_POST["Cantidad"];
    $categoria=$_POST["Categoria"];
    $id_categoria;

    switch($categoria){
        case "Transporte": $id_categoria=1;break;
        case "Ocio": $id_categoria=2;break;
        case "Alimentación": $id_categoria=3;break;
        case "Trabajo": $id_categoria=4;break;
        case "Hogar": $id_categoria=5;break;
        case "Ropa": $id_categoria=6;break;
        case "Otras compras": $id_categoria=7;break;
        case "Salud": $id_categoria=8;break;

    }

$sql_form="INSERT INTO gastos (fecha, cantidad, id_categoria, asunto) VALUES ('$fecha','$cantidad','$id_categoria','$asunto');";
$resultado_addGasto=$mysqli_conn->query($sql_form);
echo $resultado_addGasto;
}

//DATOS TABLA GASTOS
if (isset($_GET["accion"])) {
    $accion = $_GET["accion"];

    if ($accion === "datos_tabla") {

        $datos_tabla=[];

        $sql_tabla = "SELECT * FROM gastos ORDER BY fecha DESC;";
        $resultado_tabla=$mysqli_conn->query($sql_tabla);


        foreach($resultado_tabla as $i=>$rt){
            $datos_tabla[$i]["Id"]=$rt["id_gasto"];
            $datos_tabla[$i]["Asunto"]=$rt["asunto"];
            $datos_tabla[$i]["Fecha"]=$rt["fecha"];
            $datos_tabla[$i]["Cantidad"]=$rt["cantidad"];
            $datos_tabla[$i]["Categoria"]=$rt["id_categoria"];

            switch($datos_tabla[$i]["Categoria"]){
                case 1: $datos_tabla[$i]["Categoria"]="Transporte"; break;
                case 2: $datos_tabla[$i]["Categoria"]="Ocio"; break;
                case 3: $datos_tabla[$i]["Categoria"]="Alimentación"; break;
                case 4: $datos_tabla[$i]["Categoria"]="Trabajo"; break;
                case 5: $datos_tabla[$i]["Categoria"]="Hogar"; break;
                case 6: $datos_tabla[$i]["Categoria"]="Ropa"; break;
                case 7: $datos_tabla[$i]["Categoria"]="Otras compras"; break;
                case 8: $datos_tabla[$i]["Categoria"]="Salud"; break;

            }
        }

        

        echo json_encode($datos_tabla);

    }else if($accion==="borrarRegistro" && isset($_GET["Id_del"])){

        $id_borrar=$_GET["Id_del"];
        
        $sql_delete="DELETE FROM gastos WHERE id_gasto='$id_borrar';";
        $result_borrado=$mysqli_conn->query($sql_delete);

        if($result_borrado===TRUE){
            echo json_encode("El registro se ha borrado con exito");
        }
       

    }

}

//Gráfica pastel categorías ANUAL
if(isset($_GET["yearCatAn"])){

    $añoCatAn=$_GET["yearCatAn"];
    $datosCatAnual=[];
    
    $sql_cat_anual="SELECT fecha, sum(cantidad) as gasto, cat.nombre as nombreCat FROM gastos AS gast INNER JOIN categorias AS cat ON gast.id_categoria=cat.id_categoria WHERE year(fecha)='$añoCatAn' GROUP BY cat.nombre, year(fecha) ORDER BY fecha desc;";
    $respuesta_cat_an=$mysqli_conn->query($sql_cat_anual);

    foreach($respuesta_cat_an as $i=>$rca){
        $datosCatAnual[$i]["CATEGORIAS"]=$rca["nombreCat"];
        $datosCatAnual[$i]["GASTO"]=floatval($rca["gasto"]);
    }

    echo json_encode($datosCatAnual);

}


//Gráfica pastel categorías MENSUAL
if(isset($_GET["mesCatMes"]) && isset($_GET["yearCatMes"])){

    $mesCatMes=$_GET["mesCatMes"];
    $añoCatMes=$_GET["yearCatMes"];
$datosCatMensual=[];
switch($mesCatMes){
    case "Enero": $mesCatMes = '01'; break;
    case "Febrero": $mesCatMes = '02'; break;
    case "Marzo": $mesCatMes = '03'; break;
    case "Abril": $mesCatMes = '04'; break;
    case "Mayo": $mesCatMes = '05'; break;
    case "Junio": $mesCatMes = '06'; break;
    case "Julio": $mesCatMes = '07'; break;
    case "Agosto": $mesCatMes = '08'; break;
    case "Septiembre": $mesCatMes = '09'; break;
    case "Octubre": $mesCatMes = '10'; break;
    case "Noviembre": $mesCatMes = '11'; break;
    case "Diciembre": $mesCatMes = '12'; break;
}

    $sql_cat_mes="SELECT fecha, sum(cantidad) as gasto, cat.nombre as nombreCat FROM gastos AS gast INNER JOIN categorias AS cat ON gast.id_categoria=cat.id_categoria WHERE year(fecha)='$añoCatMes' AND month(fecha)='$mesCatMes' GROUP BY cat.nombre, month(fecha), year(fecha) ORDER BY fecha DESC;";
    $respuesta_cat_mes=$mysqli_conn->query($sql_cat_mes);

    foreach($respuesta_cat_mes as $i=>$rcm){
        $datosCatMensual[$i]["CATEGORIAS"]=$rcm["nombreCat"];
        $datosCatMensual[$i]["GASTO"]=$rcm["gasto"];
    }

    echo json_encode($datosCatMensual);

}

if(isset($_GET["añosInf"])){ //Años disponibles en el formulario del informe
    $años_disponibles=[];
    $sql_años="SELECT DISTINCT YEAR(fecha) AS años FROM gastos ORDER BY años;";
    $result_sql_años=$mysqli_conn->query($sql_años);

    foreach($result_sql_años as $i=>$rsa){
        $años_disponibles[$i]=$rsa;
    }

    echo json_encode($años_disponibles);
}


//Obtener los datos del informe ANUAL
if (isset($_GET["añoInformeAn"])) {

    $año_selected = $_GET["añoInformeAn"];

    $arrayUserInfoAn = [];
    $arrayGastosAn = [
        ["nombre"=>"Alimentación", "cantidad"=>0],
        ["nombre"=>"Hogar", "cantidad"=>0],		
        ["nombre"=>"Ocio", "cantidad"=>0],		
        ["nombre"=>"Otras compras", "cantidad"=>0],		
        ["nombre"=>"Ropa", "cantidad"=>0],		
        ["nombre"=>"Salud", "cantidad"=>0],		
        ["nombre"=>"Trabajo", "cantidad"=>0],		
        ["nombre"=>"Transporte", "cantidad"=>0]	
    ];

    $arrayTotalDatosAnual = [];

    $sql_user_anual = "SELECT Nombre, primer_apellido, email, telefono, direccion FROM user_info;";
    $resultado_user_an = $mysqli_conn->query($sql_user_anual);

    foreach ($resultado_user_an as $i => $rua) {
        $arrayUserInfoAn[$i] = $rua;
    }

    $sql_gastos_anual = "SELECT cat.nombre, fecha, cantidad FROM gastos AS gast INNER JOIN categorias AS cat ON gast.id_categoria=cat.id_categoria WHERE year(fecha)='$año_selected' GROUP BY cat.nombre ORDER BY cat.nombre;";
    $resultado_gastos_anual = $mysqli_conn->query($sql_gastos_anual);

    foreach ($resultado_gastos_anual as $i => $rga) {
        $arrayGastosAn[$i] = $rga;
    }
    foreach ($resultado_gastos_anual as $i => $rga) {
        $nombreCategoria=$rga['nombre'];
        $cantidadCategoria=$rga['cantidad'];

        for($e=0; $e<count($arrayGastosAn); $e++){

            if($arrayGastosAn[$e]['nombre']===$nombreCategoria){
                $arrayGastosAn[$e]['cantidad']=$cantidadCategoria;
             
            }
        }

    }
    $arrayTotalDatosAnual = ["UserInfo" => $arrayUserInfoAn, "Gastos" => $arrayGastosAn];

    echo json_encode($arrayTotalDatosAnual);
}


//Obtener los datos del informe MENSUAL
if (isset($_GET["añoInformeMes"]) && isset($_GET["mesInforme"])) {
    $año_selected = $_GET["añoInformeMes"];
    $mes_selected = $_GET["mesInforme"];

switch($mes_selected){
    case "Enero": $mes_selected = '01'; break;
    case "Febrero": $mes_selected = '02'; break;
    case "Marzo": $mes_selected = '03'; break;
    case "Abril": $mes_selected = '04'; break;
    case "Mayo": $mes_selected = '05'; break;
    case "Junio": $mes_selected = '06'; break;
    case "Julio": $mes_selected = '07'; break;
    case "Agosto": $mes_selected = '08'; break;
    case "Septiembre": $mes_selected = '09'; break;
    case "Octubre": $mes_selected = '10'; break;
    case "Noviembre": $mes_selected = '11'; break;
    case "Diciembre": $mes_selected = '12'; break;
}

    $arrayUserInfoMes = [];
    $arrayGastosMes = [
        ["nombre" => "Alimentación", "cantidad" => 0],
        ["nombre" => "Hogar", "cantidad" => 0],
        ["nombre" => "Ocio", "cantidad" => 0],
        ["nombre" => "Otras compras", "cantidad" => 0],
        ["nombre" => "Ropa", "cantidad" => 0],
        ["nombre" => "Salud", "cantidad" => 0],
        ["nombre" => "Trabajo", "cantidad" => 0],
        ["nombre" => "Transporte", "cantidad" => 0]
    ];


    $arrayTotalDatosMensual = [];

    $sql_user_mensual = "SELECT Nombre, primer_apellido, email, telefono, direccion FROM user_info;";
    $resultado_user_mes = $mysqli_conn->query($sql_user_mensual);


    foreach ($resultado_user_mes as $i => $rum) {
        $arrayUserInfoMes[$i] = $rum;
    }

    $sql_gastos_mensual = "SELECT cat.nombre, fecha, cantidad FROM gastos AS gast INNER JOIN categorias AS cat ON gast.id_categoria=cat.id_categoria WHERE year(fecha)='$año_selected' AND month(fecha)='$mes_selected' GROUP BY cat.nombre ORDER BY cat.nombre;";
    $resultado_gastos_mensual = $mysqli_conn->query($sql_gastos_mensual);

    foreach ($resultado_gastos_mensual as $i => $rgm) {
        $nombreCategoria = $rgm['nombre'];
        $cantidadCategoria = $rgm['cantidad'];

        for ($e = 0; $e < count($arrayGastosMes); $e++) {

            if ($arrayGastosMes[$e]['nombre'] === $nombreCategoria) {
                $arrayGastosMes[$e]['cantidad'] = $cantidadCategoria;
            }
        }
    }

    $arrayTotalDatosMensual = ["UserInfo" => $arrayUserInfoMes, "Gastos" => $arrayGastosMes];

    echo json_encode($arrayTotalDatosMensual);
}

$mysqli_conn->close();

?>