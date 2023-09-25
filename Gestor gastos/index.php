<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.0/dist/chart.umd.min.js"></script> <!--Chart.js-->
    <script src="https://kit.fontawesome.com/903082a171.js" crossorigin="anonymous"></script> <!--Font Awesome Free -->
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="js.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> <!--html2pdf-->
    <title>GESGAS - Gestiona Tus Gastos</title>
</head>

<body>


    <aside>
        <nav id="navigation_bar">
            <ul>
                <li id="main_tab" class="tab selected" onclick="pestañas('main_tab')">Página Principal</li>
                <li id="add_tab" class="tab" onclick="pestañas('add_tab')">Añadir Gasto</li>
                <li id="cat_tab" class="tab" onclick="pestañas('cat_tab')">Categorías</li>
                <li id="inf_tab" class="tab" onclick="pestañas('inf_tab')">Generar Informe</li>
            </ul>
        </nav>



    </aside>

    <div id="main_cont" class="cont selected">
        <?php require 'php.php'; ?>

        <div id="selector">
            <select id="select_tiempo">
                <option value="Anual">Anual</option>
                <option value="Mensual" selected>Mensual</option>
                <option value="Semanal">Semanal</option>
            </select>
        </div>

        <div id="tiempo">
            <button id="prevBtn" onclick="prevBoton()">&#8249;</button>
            <span id="span_fecha"></span>
            <button id="nextBtn" onclick="nextBoton()">&#8250;</button>
        </div>

        <canvas id="MainGraph"></canvas>

    </div>

    <div id="add_cont" class="cont">
        <h1>Añadir Gasto</h1>
        <div id="divForm">
            <form action="" id="add_form" method="POST">

                <label for="asun">Asunto: (máx. 20 carácteres)</label>
                <input type="text" id="asun" name="Asunto" maxlength="20">

                <label for="fech">Fecha:</label>
                <input type="date" id="fech" name="Fecha">

                <label for="cant">Cantidad:</label>
                <input type="number" id="cant" name="Cantidad">

                <label for="categ">Seleccione una categoría:</label>
                <select name="Categoria" id="categ">
                    <option value="Alimentación">Alimentación</option>
                    <option value="Hogar">Hogar</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Otras compras">Otras compras</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Salud">Salud</option>
                    <option value="Trabajo">Trabajo</option>
                    <option value="Transporte">Transporte</option>
                </select>


                <input type="submit" value="Añadir Gasto">
            </form>

        </div>

        <div id="div_tabla_gastos">
            <table id="tablaGastos">
                <thead>
                    <tr>
                        <th>Asunto</th>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        <th>Categoria</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tbodyTablaGastos">
                </tbody>
            </table>
            <div class="botones">
                <button id="btnAnterior" onclick="btnPrev_tabla()"><i class="fa-solid fa-arrow-left"></i></button>
                <button id="btnSiguiente" onclick="btnNext_tabla()"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    </div>

    <div id="cat_cont" class="cont">
        <div id="selectorCat">
            <select id="select_tiempoCat">
                <option value="Anual">Anual</option>
                <option value="Mensual" selected>Mensual</option>
            </select>
        </div>

        <div id="tiempoCat">
            <button id="prevBtnCat" onclick="prevBotonCat()">&#8249;</button>
            <span id="span_fechaCat"></span>
            <button id="nextBtnCat" onclick="nextBotonCat()">&#8250;</button>
        </div>

        <div id="divGraphCat">

            <canvas id="categoryGraph"></canvas>

        </div>

    </div>

    <div id="inf_cont" class="cont">
        <div id="form_informe">
            <h1>Informe pdf</h1>
            <form id="formularioInforme">
                <label for="periInf">Seleccione un período de tiempo:</label>
                <select id="periInf" name="Periodo" onchange="distInforme()">
                    <option value="Anual" selected>Anual</option>
                    <option value="Mensual">Mensual</option>
                </select>

                <label for="añoInf">Seleccione un año:</label>
                <select id="añoInf" name="Año">

                </select>


                <label for="mesInf" id="mesInfLabel">Seleccione un mes:</label>
                <select id="mesInf" name="Mes">
                    <option value="Enero">Enero</option>
                    <option value="Febrero">Febrero</option>
                    <option value="Marzo">Marzo</option>
                    <option value="Abril">Abril</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Junio">Junio</option>
                    <option value="Julio">Julio</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Septiembre">Septiembre</option>
                    <option value="Octubre">Octubre</option>
                    <option value="Noviembre">Noviembre</option>
                    <option value="Diciembre">Diciembre</option>
                </select>

                <input type="button" value="Previsualización y descarga PDF" onclick="obtenerDatosInforme()">
            </form>
            <input type="button" value="Ocultar previsualización" onclick="ocultarPrev()">
        </div>
        <div id="plantilla"></div>
    </div>

    <footer>
        <div id="footer-content">
            <div id="footer-logo">
                <img src="logo.png" alt="Logo de la empresa">
            </div>
            <div id="footer-links">
                <div class="footer-column">
                <p>Productos y servicios</p>
                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Servicios</a></li>
                        <li><a href="#">Productos</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <p>Sobre la empresa</p>
                    <ul>
                        <li><a href="#">Acerca de nosotros</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Testimonios</a></li>
                        <li><a href="#">Preguntas frecuentes</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                <p>Términos y privacidad</p>
                    <ul>
                        <li><a href="#">Política de privacidad</a></li>
                        <li><a href="#">Términos y condiciones</a></li>
                        <li><a href="#">Envíos y devoluciones</a></li>
                        <li><a href="#">Mapa del sitio</a></li>
                    </ul>
                </div>
            </div>
            <hr>
            <div id="footer-social">
                <a href="#"><i class="fa-brands fa-square-facebook"></i></a>
                <a href="#"><i class="fa-brands fa-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>


            </div>
        </div>
        <div id="footer-disclaimer">
            <p>Todos los derechos reservados &copy; 2023 | GESGAS</p>
        </div>
    </footer>




</body>

</html>