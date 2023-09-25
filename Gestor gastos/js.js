
let grafica = null;

/*PESTAÑAS ASIDE*/
function pestañas(pestaña) {

  let tab_ocultar = document.getElementsByClassName("tab selected");
  let cont_ocultar = document.getElementsByClassName("cont selected");

  for (let i = 0; i < (tab_ocultar.length + cont_ocultar.length); i++) {
    tab_ocultar[i].classList.remove("selected");
    cont_ocultar[i].classList.remove("selected");
  }

  let split_pestaña = pestaña.split("_");
  let contenido_seleccionado = split_pestaña[0] + "_cont";

  document.getElementById(contenido_seleccionado).classList.add("selected");

  if (contenido_seleccionado === "main_cont") { //PESTAÑA MAIN
    let select_tiempoMain = document.getElementById("select_tiempo").value;
    mostrarFecha();

    if (select_tiempoMain === "Anual") {
      mostrarFecha();
      añoAjaxAn();
    } else if (select_tiempoMain === "Mensual") {
      mostrarFecha();
      añoAjaxMes();
    } else if (select_tiempoMain === "Semanal") {
      mostrarFecha();
      añoAjaxSem();
    }

    document.getElementById("select_tiempo").addEventListener("change", function () {
      let tiempo_select = this.value;
      console.log(tiempo_select);
      if (tiempo_select === "Anual") {
        mostrarFecha();
        añoAjaxAn();
      } else if (tiempo_select === "Mensual") {
        mostrarFecha();
        añoAjaxMes();
      } else if (tiempo_select === "Semanal") {
        mostrarFecha();
        añoAjaxSem();
      }
    })

  } else if (contenido_seleccionado === "add_cont") { //PESTAÑA AÑADIR GASTO Y TABLA
    let trs = document.querySelectorAll("tr"); //Para no crear tablas duplicadas cada vez que selecciono la pestaña sin recargar la página
    if (trs.length <= 1) {
      obtenerDatosYCrearTabla();
    }

  } else if (contenido_seleccionado === "cat_cont") { //PESTAÑA GRÁFICA TARTA
    let select_tiempoCat = document.getElementById("select_tiempoCat").value;
    mostrarFechaCat();
    if (select_tiempoCat === "Anual") {
      datosGraficaCatAnual();
    } else if (select_tiempoCat === "Mensual") {
      datosGraficaCatMensual();
    }

    document.getElementById("select_tiempoCat").addEventListener("change", function () {
      $tiempoCat_seleccionado = this.value;
      if ($tiempoCat_seleccionado === "Anual") {
        mostrarFechaCat();
        datosGraficaCatAnual();
      } else if ($tiempoCat_seleccionado === "Mensual") {
        mostrarFechaCat();
        datosGraficaCatMensual();
      }

    });

  } else if (contenido_seleccionado === "inf_cont") { //PESTAÑA INFORME
    añosFormInforme();
  }

  document.getElementById(pestaña).classList.add("selected");

}


/*FUNCIONES CREAR GRÁFICAS ANUAL, MENSUAL Y SEMANAL*/
function crearGraficaAnual(categoriasJSON_anual, datosJSON_anual) {
  let CanvasPrincipal = document.getElementById("MainGraph").getContext('2d');
  document.getElementById("tiempo").style = "opacity: 0";

  if (grafica) {
    grafica.destroy();
  }

  grafica = new Chart(CanvasPrincipal, { //Estilizar y vincularla con datos PHP
    type: 'bar',
    data: {
      labels: categoriasJSON_anual,
      datasets: [{
        label: 'Gastos Anuales',
        data: datosJSON_anual,
        backgroundColor: 'rgba(42, 75, 155, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }, {
        label: 'Gastos Anuales (línea)',
        data: datosJSON_anual,
        type: 'line',
        borderColor: 'rgba(255, 50, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1


      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          ticks: {
            color: "#000000",
          },
          beginAtZero: true
        },
        x: {
          ticks: {
            color: "#000000",
          },
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutBounce',
      }
    }
  });
}

function crearGraficaMensual(categoriasJSON_mensual, datosJSON_mensual) {

  let CanvasPrincipal = document.getElementById("MainGraph").getContext('2d');
  document.getElementById("tiempo").style = "opacity:1";

  if (grafica) {
    grafica.destroy();
  }
  grafica = new Chart(CanvasPrincipal, { //Estilizar y vincularla con datos PHP
    type: 'bar',
    data: {
      labels: categoriasJSON_mensual,
      datasets: [{
        label: 'Gastos Mensuales',
        data: datosJSON_mensual,
        backgroundColor: 'rgba(42, 75, 155, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }, {
        label: 'Gastos Mensuales (línea)',
        data: datosJSON_mensual,
        type: 'line',
        borderColor: 'rgba(255, 50, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1

      }]

    },
    options: {
      scales: {
        y: {
          ticks: {
            color: "#000000",
          },
          beginAtZero: true
        },
        x: {
          ticks: {
            color: "#000000",
          },
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutBounce',
      }

    }

  });
}

function crearGraficaSemanal(categoriasJSON_semanal, datosJSON_semanal) {
  let CanvasPrincipal = document.getElementById("MainGraph").getContext('2d');
  document.getElementById("tiempo").style = "opacity:1";

  if (grafica) {
    grafica.destroy();
  }
  grafica = new Chart(CanvasPrincipal, { //Estilizar y vincularla con datos PHP
    type: 'bar',
    data: {
      labels: categoriasJSON_semanal,
      datasets: [{
        label: 'Gastos Semanales',
        data: datosJSON_semanal,
        backgroundColor: 'rgba(42, 75, 155, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }, {

        label: 'Gastos Semanales (línea)',
        data: datosJSON_semanal,
        type: 'line',
        borderColor: 'rgba(255, 50, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1


      }]
    },
    options: {
      scales: {
        y: {
          ticks: {
            color: "#000000",
          },
          beginAtZero: true
        },
        x: {
          ticks: {
            color: "#000000",
          },
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutBounce',
      }

    }

  });
}


//MUESTRA DISTINTOS TIPOS DE FECHA EN FUNCION DEL TRAMO TEMPORAL SELECCIONADO
function mostrarFecha() {
  let tiempo_seleccionado = document.getElementById("select_tiempo").value;
  let span = document.getElementById("span_fecha");
  let date = new Date();

  //Anual
  if (tiempo_seleccionado === "Anual") {
    let año = date.getFullYear();
    span.innerText = año;

    //Mensual
  } else if (tiempo_seleccionado === "Mensual") {
    let año = date.getFullYear();
    span.innerText = año;

    //Semanal
  } else if (tiempo_seleccionado === "Semanal") {
    var nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    var numMes = date.getMonth() + 1; //Sumo 1 para que el número del mes sea el mismo que en el calendario, por defecto, los meses en Date empiezan con Enero=0

    span.innerText = nombreMeses[numMes - 1] + ' ' + date.getFullYear();
  }
}


//Para que muestre la fecha actual y cree la gráfica mensual por defecto al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  let pestañaPorDefecto=document.getElementById("main_tab");
  pestañaPorDefecto.click();
  mostrarFecha();
  añoAjaxMes();
});


function añoAjaxAn() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let totalDatosJSON_anual=JSON.parse(xhr.responseText);
      let categoriasJSON_mensual = [];
      let datosJSON_mensual = [];

      for(let i=0; i<totalDatosJSON_anual.length;i++){
        categoriasJSON_mensual[i] = totalDatosJSON_anual[i]["YEARS"];
        datosJSON_mensual[i] = totalDatosJSON_anual[i]["GASTO"];
      }

      console.log(totalDatosJSON_anual);
      crearGraficaAnual(categoriasJSON_mensual, datosJSON_mensual);
    }
  }
  xhr.open("GET", "php.php?barrasAnual="+"yes", true);
  xhr.send();
}


function añoAjaxMes() {
  let yearMes = document.getElementById("span_fecha").innerText;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const totalDatosJSON_mensual = JSON.parse(xhr.responseText);

      let categoriasJSON_mensual = [];
      let datosJSON_mensual = [];

      for (let i = 0; i < totalDatosJSON_mensual.length; i++) {
        categoriasJSON_mensual[i] = totalDatosJSON_mensual[i]['MES'];
        datosJSON_mensual[i] = totalDatosJSON_mensual[i]['GASTO'];
      }

      crearGraficaMensual(categoriasJSON_mensual, datosJSON_mensual);
    }
  }
  xhr.open("GET", "php.php?yearMes=" + yearMes, true);
  xhr.send();
}

function añoAjaxSem() {
  let fecha = document.getElementById("span_fecha").innerText.split(' ');
  let yearSem = fecha[1];
  let mesSem = fecha[0];

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const totalDatosJSON_semanal = JSON.parse(xhr.responseText);

      let categoriasJSON_semanal = [];
      let datosJSON_semanal = [];

      for (const semana in totalDatosJSON_semanal) {
        categoriasJSON_semanal.push(semana);
        datosJSON_semanal.push(totalDatosJSON_semanal[semana])


      }

      crearGraficaSemanal(categoriasJSON_semanal, datosJSON_semanal);


    }

  }
  xhr.open("GET", "php.php?yearSem=" + yearSem + "&mesSem=" + mesSem, true);
  xhr.send();
}


function prevBoton() { //Botón calendario anterior
  let tiempo_seleccionado = document.getElementById("select_tiempo").value;
  let span = document.getElementById("span_fecha");
  let añoActual;
  let añoAnterior;

  if (tiempo_seleccionado === "Mensual") {
    añoActual = parseInt(span.innerText);
    añoAnterior = añoActual - 1;
    span.innerText = añoAnterior;
    añoAjaxMes();


  } else if (tiempo_seleccionado === "Semanal") {
    var nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var split_mes = span.innerText.split(" ");
    var mesActual = nombreMeses.indexOf(split_mes[0]);
    var mesAnterior = (mesActual - 1 + nombreMeses.length) % nombreMeses.length; //Así da la vuelta correctamente cuando llega a Enero

    if (mesActual === 0) {
      var año_actual = parseInt(split_mes[1]);
      var año_anterior = año_actual - 1;
      span.innerText = nombreMeses[mesAnterior] + ' ' + (año_anterior);
    } else {
      span.innerText = nombreMeses[mesAnterior] + ' ' + (split_mes[1]);
    }
    añoAjaxSem();
  }

}


function nextBoton() { //Botón calendario siguiente
  let tiempo_seleccionado = document.getElementById("select_tiempo").value;
  let span = document.getElementById("span_fecha");
  let date = new Date();
  let añoActual;
  let añoSiguiente;

  if (tiempo_seleccionado === "Mensual") {
    if (parseInt(span.innerText) < date.getFullYear()) {
      añoActual = parseInt(span.innerText);
      añoSiguiente = añoActual + 1;
      span.innerText = añoSiguiente;
    }

    añoAjaxMes();

  } else if (tiempo_seleccionado === "Semanal") {
    var nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var split_mes = span.innerText.split(" ");
    añoActual = parseInt(split_mes[1]);
    var mesActual = nombreMeses.indexOf(split_mes[0]);
    var mesSiguiente = (mesActual + 1 + nombreMeses.length) % nombreMeses.length;

    if (mesActual === 11 && añoActual < date.getFullYear()) {
      añoSiguiente = parseInt(añoActual + 1);
      span.innerText = nombreMeses[mesSiguiente] + ' ' + (añoSiguiente);
    } else if (mesActual != date.getMonth() || añoActual != date.getFullYear()) {
      span.innerText = nombreMeses[mesSiguiente] + ' ' + (añoActual);
    }

    añoAjaxSem();
  }

}

/*TABLA PESTAÑA AÑADIR GASTO. Obtener datos, crear tabla, borrado registros y botones registros*/
var paginaActual=1;
var registrosPorPagina=10;


function obtenerDatosYCrearTabla(){
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var datosTabla = JSON.parse(xhr.responseText);
      crearTabla(datosTabla);
    }
  };
  xhr.open("GET", "php.php?accion=datos_tabla", true);
  xhr.send();
}


function crearTabla(datosTabla) {

  let tbody = document.getElementById("tbodyTablaGastos");

  let inicio = (paginaActual - 1) * registrosPorPagina;
  let fin = inicio + registrosPorPagina;

  for (let i = inicio; i < fin && i < datosTabla.length; i++) {
    let fila = document.createElement("tr");
    fila.setAttribute("id", "fila_" + datosTabla[i]["Id"]);

    let asunto = document.createElement("td");
    asunto.textContent = datosTabla[i]["Asunto"];
    fila.appendChild(asunto);

    let fecha = document.createElement("td");
    fecha.textContent = datosTabla[i]["Fecha"];
    fila.appendChild(fecha);

    let cantidad = document.createElement("td");
    cantidad.textContent = datosTabla[i]["Cantidad"];
    fila.appendChild(cantidad);

    let categoria = document.createElement("td");
    categoria.textContent = datosTabla[i]["Categoria"];
    fila.appendChild(categoria);

    let iconoBasuraTd = document.createElement("td");
    let iconoBasuraIcon = document.createElement("i");
    iconoBasuraIcon.className = "fa-solid fa-trash-can";
    iconoBasuraIcon.setAttribute("title", "Eliminar Registro");
    iconoBasuraIcon.onclick = function () {
      let confBorr = confirm("¿Desea eliminar el registro con fecha " + datosTabla[i]["Fecha"] + " con asunto " + "\""+datosTabla[i]['Asunto'] + "\"?");
      if (confBorr === true) {
        borrarReg(datosTabla[i]["Id"]);
      }

    }

    iconoBasuraTd.appendChild(iconoBasuraIcon);
    fila.appendChild(iconoBasuraTd);

    tbody.appendChild(fila);
  }

  let nodosTbody = tbody.childNodes; //Bucle para borrar los nodos vacíos de tipo texto que se generan al crear la tabla
  for (let i = 0; i < nodosTbody.length; i++) {
    if (nodosTbody[i].nodeType === Node.TEXT_NODE) {
      nodosTbody[i].remove();
    }
  }

}


function borrarReg(id_del) {
  let url = `php.php?accion=borrarRegistro&Id_del=${id_del}`;
  
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

    .then(response => response.json())
    .then(data => {
      let filaBorrar = document.getElementById("fila_" + id_del);
      if (filaBorrar) {
        filaBorrar.remove();
      }

      console.log(data);

    })
    .catch(error => {
      console.log("ERROR:", error);
    });
 
}


function btnPrev_tabla() {
  let tbody = document.getElementById("tbodyTablaGastos");
  if (paginaActual > 1) {
    for (let i = 0; i < 10; i++) {
      if (tbody.children.length > 0) {
        tbody.removeChild(tbody.children[0]);
      }
    }

    paginaActual--;
    obtenerDatosYCrearTabla();
  }
}

function btnNext_tabla() {
  let tbody = document.getElementById("tbodyTablaGastos");
  if (tbody.childNodes.length == 10) {
    for (let i = 0; i < 10; i++) {
      if (tbody.children.length > 0) {
        tbody.removeChild(tbody.children[0]);
      }
    }

    paginaActual++;
    obtenerDatosYCrearTabla();
  }

}

/*PESTAÑA GRÁFICAS CATEGORIAS*/
function mostrarFechaCat() {
  let tiempo_seleccionadoCat = document.getElementById("select_tiempoCat").value;
  let span_fecha = document.getElementById("span_fechaCat");
  let date = new Date();
  let año = date.getFullYear();
  let mes = date.getMonth() + 1; //Sumo 1 para que el número del mes sea el mismo que en el calendario, por defecto, los meses en Date empiezan con Enero=0

  if (tiempo_seleccionadoCat === "Anual") {
    span_fecha.innerText = año;

  } else if (tiempo_seleccionadoCat === "Mensual") {
     
    let nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    span_fecha.innerText = nombreMeses[mes - 1] + ' ' + date.getFullYear();
  }

}

function prevBotonCat() { //Botón calendario anterior
  let tiempo_seleccionado = document.getElementById("select_tiempoCat").value;
  let span_fecha = document.getElementById("span_fechaCat");
  let añoActual;
  let añoAnterior;

  if (tiempo_seleccionado === "Anual") {
    añoActual = parseInt(span_fecha.innerText);
    añoAnterior = añoActual - 1;
    span_fecha.innerText = añoAnterior;
    datosGraficaCatAnual();

  } else if (tiempo_seleccionado === "Mensual") {
    let nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let split_mes = span_fecha.innerText.split(" ");
    let mesActual = nombreMeses.indexOf(split_mes[0]);
    let mesAnterior = (mesActual - 1 + nombreMeses.length) % nombreMeses.length; //Así da la vuelta correctamente cuando llega a Enero

    if (mesActual === 0) {
      añoActual = parseInt(split_mes[1]);
      añoAnterior = añoActual - 1;
      span_fecha.innerText = nombreMeses[mesAnterior] + ' ' + (añoAnterior);
    } else {
      span_fecha.innerText = nombreMeses[mesAnterior] + ' ' + (split_mes[1]);
    }
    datosGraficaCatMensual();
  }

}


function nextBotonCat() { //Botón calendario siguiente
  let tiempo_seleccionado = document.getElementById("select_tiempoCat").value;
  let span_fecha = document.getElementById("span_fechaCat");
  let date = new Date();
  let añoActual;
  let añoSiguiente;

  if (tiempo_seleccionado === "Anual") {
    if (parseInt(span_fecha.innerText) < date.getFullYear()) {
      añoActual = parseInt(span_fecha.innerText);
      añoSiguiente = añoActual + 1;
      span_fecha.innerText = añoSiguiente;
    }
    datosGraficaCatAnual();
    
  } else if (tiempo_seleccionado === "Mensual") {
    let nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let split_mes = span_fecha.innerText.split(" ");
    añoActual = parseInt(split_mes[1]);
    let mesActual = nombreMeses.indexOf(split_mes[0]);
    let mesSiguiente = (mesActual + 1 + nombreMeses.length) % nombreMeses.length;

    if (mesActual === 11 && añoActual < date.getFullYear()) {
      añoSiguiente = parseInt(añoActual + 1);
      span_fecha.innerText = nombreMeses[mesSiguiente] + ' ' + (añoSiguiente);
    } else if (mesActual != date.getMonth() || añoActual != date.getFullYear()) {
      span_fecha.innerText = nombreMeses[mesSiguiente] + ' ' + (añoActual);
    }

    datosGraficaCatMensual();
  }

}

function datosGraficaCatAnual(){

  let año=document.getElementById("span_fechaCat").innerText;
  let urlAn = `php.php?yearCatAn=${año}`;
  
  fetch(urlAn, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

    .then(response => response.json())
    .then(data => {
      let labelsCatAn=[];
      let datossCatAn=[];

      for (let i = 0; i < data.length; i++) {
        labelsCatAn[i] = data[i]['CATEGORIAS'];
        datossCatAn[i] = data[i]['GASTO'];
      }

      graficaCatAnual(labelsCatAn, datossCatAn);
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
}


function graficaCatAnual(labelsCatAn, datosCatAn){
let canvasCat=document.getElementById("categoryGraph").getContext('2d');

if(grafica){
  grafica.destroy();
}

grafica=new Chart(canvasCat, { 
  type: 'pie',
  data: {
    labels: labelsCatAn,
    datasets: [{
      label: 'Gastos Por Categorías',
      data: datosCatAn,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(234, 123, 80)',
        'rgb(136, 99, 132)',
        'rgb(250, 162, 235)',
        'rgb(200, 205, 86)',
        'rgb(100, 123, 80)',
      ],
      hoverOffset: 4
    }]
  }
});
}

function datosGraficaCatMensual() {
  let split_fecha = document.getElementById("span_fechaCat").innerText.split(" ");
  let añoCatMes = split_fecha[1];
  let mesCatMes = split_fecha[0];
  let urlMes = `php.php?yearCatMes=${añoCatMes}&mesCatMes=${mesCatMes}`;

  fetch(urlMes, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      let labelsCatMes = [];
      let datosCatMes = [];

      for (let i = 0; i < data.length; i++) {
        labelsCatMes[i] = data[i]['CATEGORIAS'];
        datosCatMes[i] = data[i]['GASTO'];
      }

      graficaCatMensual(labelsCatMes, datosCatMes);
    })
    .catch(error => {
      console.log("ERROR:", error)
    })
}


function graficaCatMensual(labelsCatMes, datosCatMes){
  let canvasCatMes=document.getElementById("categoryGraph").getContext('2d');
  
  if(grafica){
    grafica.destroy();
  }

  grafica=new Chart(canvasCatMes, { 
    type: 'pie',
    data: {
      labels: labelsCatMes,
      datasets: [{
        label: 'Gastos Por Categorías',
        data: datosCatMes,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(234, 123, 80)',
          'rgb(136, 99, 132)',
          'rgb(250, 162, 235)',
          'rgb(200, 205, 86)',
          'rgb(100, 123, 80)',
        ],
        hoverOffset: 4
      }]
    }
  });


}

//PESTAÑA INFORME
function distInforme() {
  let periodoSeleccionado = document.getElementById("periInf").value;
  let labelCambia = document.getElementById("mesInfLabel");
  let inputCambia = document.getElementById("mesInf");

  if (periodoSeleccionado === "Mensual") {
    labelCambia.style = "display:inline-block";
    inputCambia.style = "display:inline-block";
  } else if (periodoSeleccionado === "Anual") {
    labelCambia.style = "display:none";
    inputCambia.style = "display:none";
  }

}

//Para que los options del select solo sean los años registrados en la BD
function añosFormInforme() {
  let select_añoInf = document.getElementById("añoInf");
  let url = `php.php?añosInf=yes`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

    .then(response => response.json())
    .then(data => {

      if (select_añoInf.childNodes.length <= 1) {
        for (let i = 0; i < data.length; i++) {
          let option = document.createElement("option");

          option.value = data[i]["años"];
          option.textContent = data[i]["años"];
          select_añoInf.appendChild(option);
        }
      }

    })
    .catch(error => {
      console.log("ERROR:", error)
    })
}


function obtenerDatosInforme() {
  let periodo_temp = document.getElementById("periInf").value;
  let añoInf = document.getElementById("añoInf").value;


  if (periodo_temp === "Anual") { //Petición y rellenado del informe Anual

    let urlAnual = `php.php?añoInformeAn=${añoInf}`;

    fetch('/Portafolio/Gestor%20gastos/plantillaInformeAnual.html', { //Primero: inserto la plantilla vacía en el HTML
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

      .then(response => response.text())
      .then(data => {
        document.getElementById("plantilla").innerHTML = data;

      })
      .catch(error => {
        console.log("ERROR:", error)
      })

    //Segundo: obtengo los datos de la base de datos
    fetch(urlAnual, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

      .then(response => response.json())
      .then(data => {

        let userInfo = data.UserInfo;
        let gastos = data.Gastos;
        let fecha = new Date();
        let fecha_formateada = String(fecha.getDate()).padStart(2, '0') + "-" + String(fecha.getMonth() + 1).padStart(2, '0') + "-" + fecha.getFullYear();

        //Tercero: relleno la plantilla con los datos correspondientes

        //Tabla info usuario
        document.querySelector("#tablaUser tr:nth-child(1) td:nth-child(2)").innerText = userInfo[0].Nombre + " " + userInfo[0].primer_apellido;
        document.querySelector("#tablaUser tr:nth-child(1) td:nth-child(4)").innerText = userInfo[0].telefono;
        document.querySelector("#tablaUser tr:nth-child(1) td:nth-child(6)").innerText = fecha_formateada;
        document.querySelector("#tablaUser tr:nth-child(2) td:nth-child(2)").innerText = userInfo[0].email;
        document.querySelector("#tablaUser tr:nth-child(2) td:nth-child(4)").innerText = userInfo[0].direccion;


        //Tabla header gastos
        document.querySelector("#headTablaGastos tr:nth-child(1) td:nth-child(4)").innerText = añoInf;

        //Tabla gastos
        document.querySelector("#tablaInformeAn tbody tr:nth-child(1) td:nth-child(2)").innerText = gastos[0].cantidad + "€";
        document.querySelector("#tablaInformeAn tbody tr:nth-child(2) td:nth-child(2)").innerText = gastos[1].cantidad + "€";;
        document.querySelector("#tablaInformeAn tbody tr:nth-child(3) td:nth-child(2)").innerText = gastos[2].cantidad + "€";;
        document.querySelector("#tablaInformeAn tbody tr:nth-child(4) td:nth-child(2)").innerText = gastos[3].cantidad + "€";;
        document.querySelector("#tablaInformeAn tbody tr:nth-child(5) td:nth-child(2)").innerText = gastos[4].cantidad + "€";;
        document.querySelector("#tablaInformeAn tbody tr:nth-child(6) td:nth-child(2)").innerText = gastos[5].cantidad + "€";;
        document.querySelector("#tablaInformeAn tbody tr:nth-child(7) td:nth-child(2)").innerText = gastos[6].cantidad + "€";;
        document.querySelector("#tablaInformeAn tbody tr:nth-child(8) td:nth-child(2)").innerText = gastos[7].cantidad + "€";;
        document.querySelector("#tablaInformeAn tbody tr:nth-child(9) td:nth-child(2)").innerText = parseFloat(parseFloat(gastos[0].cantidad) + parseFloat(gastos[1].cantidad) + parseFloat(gastos[2].cantidad) + parseFloat(gastos[3].cantidad) + parseFloat(gastos[4].cantidad) + parseFloat(gastos[5].cantidad) + parseFloat(gastos[6].cantidad) + parseFloat(gastos[7].cantidad)).toFixed(2) + "€";;


      })
      .catch(error => {
        console.log("ERROR:", error)
      })


    generaCanvasyPDF();

  } else if (periodo_temp === "Mensual") {//Petición y rellenado del informe Mensual
    let mesInf = document.getElementById("mesInf").value;
    let urlMes = `php.php?añoInformeMes=${añoInf}&mesInforme=${mesInf}`;

    fetch('/Portafolio/Gestor%20gastos/plantillaInformeMensual.html', { //Primero: inserto la plantilla vacía en el HTML
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

      .then(response => response.text())
      .then(data => {
        document.getElementById("plantilla").innerHTML = data;

      })
      .catch(error => {
        console.log("ERROR:", error)
      })

    fetch(urlMes, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

      .then(response => response.json())
      .then(data => {

        let userInfo = data.UserInfo;
        let gastos = data.Gastos;
        let fecha = new Date();
        let fecha_formateada = String(fecha.getDate()).padStart(2, '0') + "-" + String(fecha.getMonth() + 1).padStart(2, '0') + "-" + fecha.getFullYear();



        //Tabla info usuario
        document.querySelector("#tablaUser tr:nth-child(1) td:nth-child(2)").innerText = userInfo[0].Nombre + " " + userInfo[0].primer_apellido;
        document.querySelector("#tablaUser tr:nth-child(1) td:nth-child(4)").innerText = userInfo[0].telefono;
        document.querySelector("#tablaUser tr:nth-child(1) td:nth-child(6)").innerText = fecha_formateada;
        document.querySelector("#tablaUser tr:nth-child(2) td:nth-child(2)").innerText = userInfo[0].email;
        document.querySelector("#tablaUser tr:nth-child(2) td:nth-child(4)").innerText = userInfo[0].direccion;

        //Tabla header gastos
        document.querySelector("#headTablaGastos tr:nth-child(1) td:nth-child(4)").innerText = añoInf + ".";
        document.querySelector("#headTablaGastos tr:nth-child(1) td:nth-child(6)").innerText = mesInf;

        document.querySelector("#tablaInformeMes tbody tr:nth-child(1) td:nth-child(2)").innerText = gastos[0].cantidad + "€";
        document.querySelector("#tablaInformeMes tbody tr:nth-child(2) td:nth-child(2)").innerText = gastos[1].cantidad + "€";;
        document.querySelector("#tablaInformeMes tbody tr:nth-child(3) td:nth-child(2)").innerText = gastos[2].cantidad + "€";;
        document.querySelector("#tablaInformeMes tbody tr:nth-child(4) td:nth-child(2)").innerText = gastos[3].cantidad + "€";;
        document.querySelector("#tablaInformeMes tbody tr:nth-child(5) td:nth-child(2)").innerText = gastos[4].cantidad + "€";;
        document.querySelector("#tablaInformeMes tbody tr:nth-child(6) td:nth-child(2)").innerText = gastos[5].cantidad + "€";;
        document.querySelector("#tablaInformeMes tbody tr:nth-child(7) td:nth-child(2)").innerText = gastos[6].cantidad + "€";;
        document.querySelector("#tablaInformeMes tbody tr:nth-child(8) td:nth-child(2)").innerText = gastos[7].cantidad + "€";;
        document.querySelector("#tablaInformeMes tbody tr:nth-child(9) td:nth-child(2)").innerText = parseFloat(parseFloat(gastos[0].cantidad) + parseFloat(gastos[1].cantidad) + parseFloat(gastos[2].cantidad) + parseFloat(gastos[3].cantidad) + parseFloat(gastos[4].cantidad) + parseFloat(gastos[5].cantidad) + parseFloat(gastos[6].cantidad) + parseFloat(gastos[7].cantidad)).toFixed(2) + "€";;



      })
      .catch(error => {
        console.log("ERROR:", error)
      })

    generaCanvasyPDF();

  }
}

//Aquí genero el PDF a partir de la imagen canvas de mi plantilla de informe rellena
function generaCanvasyPDF() {
  let divPlantilla = document.getElementById("plantilla");
  setTimeout(function () {
    let desc = confirm("¿Desea descargar el informe?");
    if (desc === true) {
      html2pdf(divPlantilla);
    }
  }, 500);
}

function ocultarPrev(){
  let informe=document.getElementById("plantilla");
  informe.innerHTML="";
}