<?php
$preguntas = array();

// Verificar si se ha enviado el formulario para agregar una pregunta
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['agregar_pregunta'])) {
    $pregunta = $_GET['pregunta'];
    $opciones = array($_GET['opcion1'], $_GET['opcion2'], $_GET['opcion3']);
    $preguntas[] = array('pregunta' => $pregunta, 'opciones' => $opciones);

    // Guardar las preguntas en un archivo
    guardarPreguntas($preguntas);
}

// Verificar si se ha enviado el formulario para eliminar todas las preguntas
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['eliminar_preguntas'])) {
    // Eliminar todas las preguntas
    eliminarTodasLasPreguntas();
}

// Función para generar el formulario del cuestionario
function generarCuestionario($preguntas)
{
    $form = '<form method="get" action="">';

    foreach ($preguntas as $index => $datosPregunta) {
        $pregunta = $datosPregunta['pregunta'];
        $opciones = $datosPregunta['opciones'];

        $form .= '<div style="display: inline-block; width: 200px; margin-right: 20px;">';
        $form .= '<h3>Pregunta ' . ($index + 1) . '</h3>';
        $form .= '<p>' . $pregunta . '</p>';

        foreach ($opciones as $opcionIndex => $opcion) {
            $opcionNumero = $opcionIndex + 1;
            $form .= '<input type="radio" name="respuesta' . $index . '" value="' . $opcion . '"> ' . $opcion . '<br>';
        }

        $form .= '</div>';
    }

    $form .= '<input type="submit" name="enviar_respuestas" value="Enviar Respuestas">';
    $form .= '</form>';

    return $form;
}

// Función para mostrar la lista de preguntas
function mostrarListaPreguntas($preguntas)
{
    $lista = '<h2>Lista de Preguntas</h2>';
    $lista .= '<ul>';

    foreach ($preguntas as $index => $datosPregunta) {
        $pregunta = $datosPregunta['pregunta'];
        $opciones = $datosPregunta['opciones'];

        $lista .= '<li>';
        $lista .= '<h3>Pregunta ' . ($index + 1) . '</h3>';
        $lista .= '<p>' . $pregunta . '</p>';
        $lista .= '<ul>';

        foreach ($opciones as $opcionIndex => $opcion) {
            $opcionNumero = $opcionIndex + 1;
            $lista .= '<li>Opción ' . $opcionNumero . ': ' . $opcion . '</li>';
        }

        $lista .= '</ul>';
        $lista .= '</li>';
    }

    $lista .= '</ul>';

    return $lista;
}

// Función para guardar las preguntas en un archivo
function guardarPreguntas($preguntas)
{
    $archivo = 'preguntas.json';

    // Obtener las preguntas existentes
    $preguntasAnteriores = obtenerPreguntas();

    // Agregar las nuevas preguntas
    $preguntasNuevas = array_merge($preguntasAnteriores, $preguntas);

    // Guardar las preguntas en el archivo
    $preguntasJSON = json_encode($preguntasNuevas);

    // Guardar las preguntas en el archivo
    file_put_contents($archivo, $preguntasJSON);
}

// Función para obtener las preguntas desde el archivo
function obtenerPreguntas()
{
    $archivo = 'preguntas.json';

    // Verificar si el archivo existe
    if (file_exists($archivo)) {
        // Leer el contenido del archivo
        $contenido = file_get_contents($archivo);

        // Convertir el contenido a un array de preguntas
        $preguntas = json_decode($contenido, true);

        // Verificar si se pudo decodificar el contenido correctamente
        if ($preguntas !== null) {
            return $preguntas;
        }
    }

    return array(); // Devolver un array vacío si no hay preguntas o si hay algún error
}

// Función para eliminar todas las preguntas
function eliminarTodasLasPreguntas()
{
    $archivo = 'preguntas.json';

    // Eliminar el archivo de preguntas
    if (file_exists($archivo)) {
        unlink($archivo);
    }

    // Limpiar el array de preguntas
    $preguntas = array();
}

// Función para generar el archivo ZIP con el cuestionario SCORM
function createSCORMZip()
{
    $preguntas = obtenerPreguntas();

    // Verificar si hay preguntas para generar el cuestionario
    if (count($preguntas) === 0) {
        echo 'No hay preguntas para generar el cuestionario.';
        return;
    }

    $zip = new ZipArchive();

    // Nombre del archivo ZIP
    $zipFileName = 'contenido_scorm.zip';

    // Abre el archivo ZIP para escritura
    if ($zip->open($zipFileName, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
        // Agrega el archivo imsmanifest.xml al ZIP
        $imsmanifestContent = '<?xml version="1.0" encoding="UTF-8"?>
        <manifest xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" identifier="MANIFEST-01" version="1" xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 http://www.imsglobal.org/xsd/imsccv1p2/imsmanifest_v1p2.xsd http://www.adlnet.org/xsd/adlcp_v1p3 http://www.imsglobal.org/xsd/imsccv1p2/imsmanifest_v1p2.xsd">
          <metadata>
            <schema>IMS Content</schema>
            <schemaversion>1.2.0</schemaversion>
          </metadata>
          <organizations default="ORG-01">
            <organization identifier="ORG-01">
              <title>Organization 1</title>
              <item identifier="ITEM-01" identifierref="RESOURCE-01">
                <title>Item 1</title>
              </item>
            </organization>
          </organizations>
          <resources>
            <resource identifier="RESOURCE-01" type="webcontent" adlcp:scormType="sco" href="index.html">
              <file href="index.html" />
            </resource>
            <resource identifier="imagen" type="webcontent" adlcp:scormType="asset">
                <file href="img/alfil.jpg" />
            </resource>
          </resources>
        </manifest>';

        $zip->addFromString('imsmanifest.xml', $imsmanifestContent);
        
        $script = '
            <script>
                function checkFileAPI() { //check if api is supported (req HTML5)
                    if (window.File && window.FileReader && window.FileList && window.Blob) {
                        return true;
                    } else {
                        alert(\'The File APIs are not fully supported by your browser. Use a better browser.\');
                        return false;
                    };
                };
        
                $(document).ready(function() {
                    checkFileAPI();
        
                    $("#fileInput").change(function() {
                        if (this.files && this.files[0]) {
                            reader = new FileReader();
                            reader.onload = function(e) {
                                // do parsing here. e.target.result is file contents
        
                                $("#hoja").html(e.target.result);
                            };
        
                            reader.readAsText(this.files[0]);
        
                        };
                        //botonObstaculoDinamico();
                    });
        
                    $("#downloadInput").click(function() {
                        if (document.getElementById(\'chessboard\')) {
                            document.getElementById(\'BotonIniciar\')?.remove();
                            document.getElementById(\'btnObstaculo\')?.remove();
                            document.getElementById(\'btnMovimiento\')?.remove();
                            document.getElementById(\'btnOcultarCamino\')?.remove();
                            document.getElementById(\'btnCamino\')?.remove();
                            document.getElementById(\'btnPosicionAlfil\')?.remove();
                            document.getElementById(\'btnPosicionFinal\')?.remove();
        
        
                            const contenedorDiv = document.querySelector(".hoja");
                            const botonObstaculo = document.createElement("button");
                            botonObstaculo.textContent = "Iniciar";
                            botonObstaculo.id = "BotonIniciar";
                            botonObstaculo.classList.add("btn", "btn-info", "botonTableroIniciar");
                            contenedorDiv.appendChild(botonObstaculo);
        
                        }
                        var element = document.createElement(\'a\');
        
                        filecontents = $(\'#hoja\').html();
                        // do scrubbing here
                        //
        
                        element.setAttribute(\'href\', \'data:text/plain;charset=utf-8,\' + encodeURIComponent(
                            filecontents));
                        element.setAttribute(\'download\', \'output.html\');
        
                        element.style.display = \'none\';
                        document.body.appendChild(element);
        
                        element.click();
        
                        document.body.removeChild(element);
        
                    });
                    $(document).on(\'click\', \'#BotonIniciar\', function() {
                        // Código para el evento click del contenido dinámico
                        console.log("¡Haz hecho clic en el botón!");
                        cargarScriptDinamico();
        
                    });
                    $(document).on(\'click\', \'#AgregarMovAlfil\', function() {
                        var rutaImagen = "img/alfil.jpg";
                        var element = document.createElement(\'a\');
        
                        filecontents = $(\'#hoja\').html();
                        element.setAttribute(\'href\', encodeURIComponent(filecontents));
        
        
                        element.style.display = \'none\';
                        document.body.appendChild(element);
                        //
                        var hrefValueInput = document.getElementById(\'hrefValueInput\');
                        var hrefValue = element.getAttribute(\'href\');
                        hrefValueInput.value = hrefValue;
                        document.body.removeChild(element);
                        var contenido = hrefValueInput.value;
        
                        var diapositivaInput = document.getElementById("diapositivaInput");
                        diapositivaInput.value = \'Titulo\';
                        addTablero();
                        var element1 = document.getElementById("GuardarHoja");
                        element1.disabled = false;
                        //var element2 = document.getElementById("BorrarHoja");
                        //element2.disabled = false;
        
                    });
                    $(document).on(\'click\', \'.CambiarTexto\', function() {
        
                        var x = document.getElementById(\'miTitulo\');
                        var y = document.getElementById(\'miTexto\');
                        var z = document.getElementById(\'miSubTitulo\');
                        if (x) {
                            x.innerHTML = x.value;
                        }
                        if (y) {
                            y.innerHTML = y.value;
                        }
                        if (z) {
                            z.innerHTML = z.value;
                        }
        
                    });
        

                    $(document).on(\'click\', \'#GuardarHoja\', function() {
        
                        if (document.querySelector(\'#chessboard\')) {
                            console.log(\'El elemento con la clase "tablero" existe.\');
                            document.querySelector(\'#btnObstaculo\')?.remove();
                            document.querySelector(\'#btnMovimiento\')?.remove();
                            document.querySelector(\'#btnOcultarCamino\')?.remove();
                            document.querySelector(\'#btnCamino\')?.remove();
                            document.querySelector(\'#btnPosicionAlfil\')?.remove();
                            document.querySelector(\'#btnPosicionFinal\')?.remove();
        
        
        
                            const celdas = document.querySelectorAll(\'.cell\');
                            celdas.forEach(celda => {
                                celda.classList.remove(
                                    \'movimientoPosible\'); // Remover clase CSS de movimientos previos
                            });
        
                            const contenedorDiv = document.querySelector(".hoja");
                            const botonObstaculo = document.createElement("button");
                            botonObstaculo.textContent = "Iniciar";
                            botonObstaculo.id = "BotonIniciar";
                            botonObstaculo.classList.add("btn", "btn-info", "botonTableroIniciar");
                            if (!document.getElementById(\'BotonIniciar\')) {
                                contenedorDiv.appendChild(botonObstaculo);
                            }
                            var rutaImagen = "img/alfil.jpg";
        
        
                        }
                        document.querySelector(\'.Cambiar\')?.remove();
                        document.querySelector(\'.CambiarSubtitulo\')?.remove();
                        //document.querySelector(\'.CambiarTexto\')?.remove();
                        var element = document.createElement(\'a\');
        
                        filecontents = $(\'#hoja\').html();
                        element.setAttribute(\'href\', encodeURIComponent(filecontents));
        
        
                        element.style.display = \'none\';
                        document.body.appendChild(element);
                        //
                        var hrefValueInput = document.getElementById(\'hrefValueInput\');
                        var hrefValue = element.getAttribute(\'href\');
                        hrefValueInput.value = hrefValue;
                        document.body.removeChild(element);
                        var contenido = hrefValueInput.value;
                        var diapositivaInput = document.getElementById("diapositivaInput");
                        var expr = diapositivaInput.value;
        
                        agregarImagen();
        
                        function agregarImagen() {
                            addPlantilla(rutaImagen, contenido, expr);
                        }
        
                    });
        
                    $(document).on(\'click\', \'#BorrarHoja\', function() {
        
                        alert(\'borradno\');
                        document.getElementById(\'hoja\').innerHTML = \'\';
                        var contadorInput = document.getElementById(\'contadorInput\');
                        contadorInput.value = contadorInput.value - 1;
        
                        var diapoActual = document.querySelector(\'.onfocus\');
                        if (diapoActual) {
                            diapoActual.parentNode.removeChild(diapoActual);
                        }
                        var element2 = document.getElementById("BorrarHoja");
                        element2.disabled = true;
                    });
        
        
                });
            </script>
            <script>
                var outputDiv = document.getElementById(\'hoja\');
                var iterador = 1;
                var contenedor = document.getElementById(\'c1\');
        
                contenedor.addEventListener(\'click\', function(event) {
                    var miniatura = event.target.closest(\'.miniatura\');
                    if (miniatura) {
                        var element2 = document.getElementById("BorrarHoja");
                        element2.disabled = false;
                        var divItems = document.getElementsByClassName(\'miniatura\');
                        Array.from(divItems).forEach((divItem) => {
                            divItem.classList.remove(\'onfocus\');
                        });
                        miniatura.classList.toggle("onfocus");
                        var diapoActual = document.getElementById(\'actualInput\');
        
                        diapoActual.value = miniatura.querySelector(\'input.indiceDiapositiva[type="hidden"]\').value;
                        console.log(diapoActual.value);
                        var hiddenInput = miniatura.querySelector(\'input#oculto[type="hidden"]\');
                        var hiddenInputValue = hiddenInput.value;
                        outputDiv.innerHTML = decodeURIComponent(hiddenInputValue);
                        console.log(\'Valor del hidden input:\', decodeURIComponent(hiddenInputValue));
                    }
                });
            </script>';
            
        // Agrega el archivo index.html al ZIP
        $indexContent = '<html>
        <head>
            <title>Cuestionario SCORM</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous">
            </script>
            <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
            <link rel="stylesheet" type="text/css" href="css/styleSimulador.css">
            <link rel="stylesheet" href="css/style-plantilla.css">
        </head>
        <body>
            <h1>Cuestionario SCORM</h1>
            <form method="post" action="procesar_respuestas.php">
                ' . generarCuestionario($preguntas) . '
                <input type="submit" name="enviar_respuestas" value="Enviar Respuestas">
            </form> 
        </body>
        </html>';

        $indexPlanilla = generarIndexPlanilla(). $script;        
        $zip->addFromString('index.html', generarIndex());
        $zip->addFromString('plantillas.html', $indexPlanilla);

        $zip->addFromString('css/style-index.css',generarEstiloIndex());
        $zip->addFromString('css/style-plantilla.css',generarEstiloPlantilla());
        $zip->addFromString('css/style-vista.css',generarEstiloVista());
        $zip->addFromString('css/styleSimulador.css',generarEstiloSimulador());

        $zip->addFromString('js/plantilla-app.js',generarJSPlantilla());

        $rutaImagen = public_path('img/alfil.jpg');
        $zip->addFile($rutaImagen, 'img/alfil.jpg');

        // Cierra el archivo ZIP
        $zip->close();

        // Descargar el archivo ZIP
        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . $zipFileName . '"');
        header('Content-Length: ' . filesize($zipFileName));
        readfile($zipFileName);

        // Eliminar el archivo ZIP
        unlink($zipFileName);
    } else {
        echo 'No se pudo crear el archivo ZIP.';
    }
}

function generarIndex(){
    return '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
            
            <link rel="stylesheet" href="css/style-index.css">
            <title>Document</title>
        </head>
        <body>
            <ul>
                <li><a class="active.html" href="index">Inicio</a></li>
                <li><a href="plantillas.html">Crear Curso</a></li>
                <li><a class="active" href="cuestionario.html">Crear Cuestionario</a></li>
            </ul>
            <div class="contenedor">
                <h1 class="cursos">Mis cursos</h1> 
            </div>
            
        </body>
        </html>    
    ';
}

function generarIndexPlanilla(){
    return '
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous">
        </script>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="css/styleSimulador.css">
        <link rel="stylesheet" href="css/style-plantilla.css">
    
        <title>Document</title>
    </head>
    
    <body>
        <ul>
            <li><a href="index.html">Inicio</a></li>
            <li><a class="active" href="plantillas.html">Crear Curso</a></li>
        </ul>
        <center>
            <h5>Diseño</h5>
        </center>
        <div class="container">
            <div id="c1" class="subcontedor c1">
    
    
    
    
            </div>
            <div class="subcontedor c2">
                <div id="hoja" class="hoja">
    
                </div>
            </div>
            <div class="subcontedor c3">
    
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownButton"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Agregar Diapostiva
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownButton">
                        <button id="item1" onclick="addtitulo()" class="dropdown-item" type="button">Titulo</button>
                        <button id="item2" onclick="addtituloSubtitulo()" class="dropdown-item" type="button">Titulo y
                            subtitulo</button>
                        <button id="item3" onclick="addSubtituloTexto()" class="dropdown-item" type="button">Subtitulo
                            y texto</button>
                        <button id="item4" onclick="addTexto()" class="dropdown-item" type="button">Texto</button>
                    </ul>
                </div>
    
    
    
                <button type="button" id="AgregarMovAlfil" class="btn btn-primary">Agregar Movimiento Alfil</button>
                <button type="button" id="GuardarHoja" disabled class="btn btn-success">Guardar</button>
                <button type="button" id="BorrarHoja" disabled class="btn btn-danger">Borrar</button>
    
    
            </div>
        </div>
        <div>
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div class="modal-header">
    
                        <h2>¡Objetivo alcanzado!</h2>
                    </div>
                    <div class="modal-body">
                        <p class="textoNumeroDePasos" id="textoNumeroDePasos"></p>
                    </div>
                </div>
            </div>
    
            <input type="hidden" name="href_value" id="hrefValueInput">
            <input type="hidden" name="contador_value" id="contadorInput">
            <input type="hidden" name="actual_value" id="actualInput">
            <input type="hidden" name="href_value" id="diapositivaInput">
        </div>
    
    
        <center>
            <div class="subcontainer">
                <input type="file" id="fileInput" class="btn">
    
                <button type="button" id="downloadInput" class="btn btn-primary ">Guardar Documento</button>
            </div>
        </center>
    
    
        <script src="js/plantilla-app.js"></script>
    
    </body>
    
    </html>
    
    ';
}

function generarEstiloIndex(){
    return '
    body {
        background-color: white;
        padding-bottom: 10px;
        justify-content: space-between;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #161B22;
    }
    .cursos{
        border-bottom: 5px solid black;
    }
    .contenedor{
        display: flex;
        width: 100%;
        flex-direction: column;
        padding: 50px;
        gap: 20px;
        justify-content: space-around;
    }
    li {
        float: left;
    }
    
    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
    
    li a:hover {
        background-color: #0D1117;
    }
    
    .container {
        display: grid;
        height: 520px;
        width: auto;
        grid-template-columns: 2fr 5fr 1fr;
        gap: 20px;
    }
    
    .subcontedor {
        height: 100%;
        border: 1px solid black;
    }
    
    .c1 {
        background-color: whitesmoke;
    }
    .c2 {
        background-color: lightgray;
    }
    .c3 {
        background-color: whitesmoke;
    }
    
    ';
}

function generarEstiloPlantilla(){
    return '
    body {
        background-color: white;
        padding-bottom: 20px;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #161b22;
    }
    
    li {
        float: left;
    }
    #alfil {
        cursor: crosshair;
        
    }
    
    .notacion-letras {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        font-weight: bold;
    }
    
    .notacion-numeros {
        width: auto;
        height: auto;
        display: grid;
        padding: 10px;
        font-weight: bold;
      }
      
    .movimientoPosible {
        background-color: yellow; /* Puedes ajustar el color según tus preferencias */
    }
    
    .onfocus{
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
      }
    .movimientoPosible:hover {
        background-color: lightgray;
    }
    textarea{
        border: 1px solid black;
    }
    .diapositiva {
        position: absolute; /* Position child div relative to parent */
        top: 0; /* Position child div at the top */
        left: 0; /* Position child div at the left */
        max-width: 100%;
        width: 100%;
        align-items: center;
        align-self: center;
        height: auto;
    }
    .tituloDiapositiva {
        font-size: 68px;
    }
    .miTitulo {
        max-width: 100%;
        width: 100%;
        text-align: center;
        height: 250px;
        max-height: 100%;
    }
    .imagen {
        max-width: 100%;
        max-height: 100%;
        margin-left: auto;
    
        margin-right: auto;
        display: block;
        width: 90%;
    }
    
    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
    
    li a:hover {
        background-color: #0d1117;
    }
    
    .container {
        display: grid;
        height: 850px;
        width: auto;
        grid-template-columns: 2fr 7fr 1fr;
        gap: 5px;
    }
    
    .subcontedor {
        height: 100%;
        border: 1px solid black;
    }
    .hoja {
    
        background-color: white;
        padding: 30px;
        border: 1px solid black;
        align-items: center;
        gap: 10px;
        
    }
    .miSubTitulo{
        width: 100%;
        text-align: center;
        font-size: 28px;
    }
    .miTexto{
        width: 100%;
        padding: 10px;
        height: 100%;
    }
    #diapositiva{
        flex: 0 0 auto;
        background-color: white;
        padding: 20px;
        width: auto;
        height: 100%;
        cursor: pointer;
        gap: 10px;
        display: flex;
        flex-direction: column;
        vertical-align:middle;
        justify-content: center;
        align-items: center;
    }
    .miniaturaTitulo{
        text-align: center;
        font-size: 30px;
        background-color: lightgray;
        width:  100%;
    }
    .miniaturaSubTitulo{
        text-align: center;
        font-size: 20px;
        background-color: lightgray;
        width:  100%;
    }
    .miniaturaTexto{
        text-align: start;
        font-size: 12px;
        background-color: lightgray;
        width:  100%;
    }
    .miniatura {
        flex: 0 0 auto;
        background-color: white;
        padding: 20px;
        width: auto;
        height: 215px;
        cursor: pointer;
        display: flex;
        gap: 10px;
        justify-content: space-around;
        flex-direction: column;
        border: 1px solid black;
        align-items: center;
       
    }
    .miniatura:hover,
    .miniatura:hover * {
      background-color: gray;
    }
    .c1 {
        background-color: whitesmoke;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        padding: 10px;
        gap: 10px;
        overflow: auto;
    }
    .c2 {
        background-color: lightgray;
        display: grid;
        padding: 20px;
        gap: 20px;
        overflow: auto;
    }
    .c3 {
        background-color: whitesmoke;
        gap: 20px;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }
    
    ';
}

function generarEstiloVista(){
    return '
    body{
        gap: 20px;
        padding: 10px;
        align-items: flex-start;
        display: grid;
        grid-template-columns: auto;
        align-content: space-around;
        background-color: gray;
    }
    ';
}

function generarEstiloSimulador(){
    return '
    #chessboard {
        width: auto;
        height: 90%;
        display: grid;
        
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
    }
    
    .cell {
        border: 1px solid black;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .white {
        background-color: #F0D9B5;
        cursor: pointer;
    }
    
    .black {
        background-color: #B58863;
    }
    
    .piece {
    
        transform: scale(3.5);
        text-align: center;
    }
    
    .botonTablero {
        width: 100%;
        height: 100%;
    }
    
    .col-3 {
        padding: 1%;
    }
    
    .botonTableroIniciar {
        width: 100%;
        height: auto;
    }
    
        /* Estilos para el modal */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5);
          }
          
          .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
          }
          
          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          
          .close:hover,
          .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
    ';
}

function generarJSPlantilla(){
    return '
    const container = document.querySelector(".c1");
    const cont_hoja = document.querySelector(".hoja");
    var autoIncrement = 1;
    var numeroDiapositivas = 0;
    var numeroMovimientosAlfil = 0;
    function addPlantilla(imagenRuta, contenido, expr) {
        const div = document.createElement("div");
        div.classList.add("miniatura");
        div.id = "miniatura";
        var mihidden = document.createElement("input");
        mihidden.classList.add("contenido");
        mihidden.type = "hidden";
        mihidden.id = "oculto";
        mihidden.value = contenido;
        div.appendChild(mihidden);
        container.appendChild(div);
        var contadorInput = document.getElementById("contadorInput");
        numeroDiapositivas++;
        contadorInput.value = numeroDiapositivas;
        var indiceDiapositiva = document.createElement("input");
        indiceDiapositiva.type = "hidden";
        indiceDiapositiva.value = numeroDiapositivas;
        indiceDiapositiva.classList.add("indiceDiapositiva");
        div.appendChild(indiceDiapositiva);
        if (typeof imagenRuta === "undefined") {
            switch (expr) {
                case "Titulo":
                    console.log("add Titulo.");
                    var mi = document.createElement("span");
                    mi.classList.add("miniaturaTitulo");
                    //mi.type = "text";
                    mi.textContent = "Titulo";
                    div.appendChild(mi);
                    //addtitulo();
                    break;
                case "Titulo y subtitulo":
                    var mi = document.createElement("span");
                    mi.classList.add("miniaturaTitulo");
                    //mi.type = "text";
                    mi.textContent = "Titulo";
                    div.appendChild(mi);
    
                    var Subtitulo = document.createElement("span");
                    Subtitulo.classList.add("miniaturaSubTitulo");
                    Subtitulo.id = "miSubTitulo";
                    Subtitulo.textContent = "Subtitulo";
                    div.appendChild(Subtitulo);
    
                    console.log("Titulo y subtitulo");
                    break;
                case "Subtitulo y texto":
                    console.log("add Subtitulo y texto");
                    var Subtitulo = document.createElement("span");
                    Subtitulo.classList.add("miniaturaSubTitulo");
                    Subtitulo.classList.add("miSubTitulo");
                    Subtitulo.id = "miSubTitulo";
                    Subtitulo.textContent = "Subtitulo";
                    div.appendChild(Subtitulo);
                    var texto = document.createElement("span");
                    texto.classList.add("miniaturaTexto");
                    texto.classList.add("miTexto");
                    texto.id = "miTexto";
                    texto.textContent = "Texto";
                    div.appendChild(texto);
                    // Expected output: "Mangoes and papayas are $2.79 a pound."
                    break;
                case "Texto":
                    console.log("add Texto");
                    var mi = document.createElement("span");
                    mi.classList.add("miniaturaTexto");
                    //mi.type = "text";
                    mi.classList.add("miTexto");
                    mi.id = "miTexto";
                    mi.textContent = "Texto";
                    div.appendChild(mi);
                    // Expected output: "Mangoes and papayas are $2.79 a pound."
                    break;
                default:
                    console.log(`Sorry, we are out of ${expr}.`);
            }
        } else {
            var imagen = document.createElement("img");
            imagen.classList.add("imagen");
            // Paso 2: Establecer la ruta de la imagen
            imagen.src = imagenRuta;
            div.appendChild(imagen);
            container.appendChild(div);
        }
    }
    function limpiarBotonesAuxiliares() {
        document.querySelector(".Cambiar")?.remove();
        document.querySelector(".CambiarTexto")?.remove();
        document.querySelector(".CambiarSubtitulo")?.remove();
    }
    function addTexto() {
        limpiarBotonesAuxiliares();
    
        var diapositivaInput = document.getElementById("diapositivaInput");
        diapositivaInput.value = "Texto";
        var element1 = document.getElementById("GuardarHoja");
        element1.disabled = false;
        cont_hoja.innerHTML = "";
        const div = document.createElement("div");
        div.id = "diapositiva";
        var mi = document.createElement("textarea");
        mi.classList.add("miTexto");
        mi.id = "miTexto";
        mi.type = "text";
        mi.textContent = "texto";
    
        div.appendChild(mi);
        const containerc3 = document.querySelector(".c3");
        var botonTexto = document.createElement("input");
        botonTexto.classList.add("CambiarTexto");
        botonTexto.type = "button";
        botonTexto.value = "Cambiar Texto";
    
        containerc3.appendChild(botonTexto);
        cont_hoja.appendChild(div);
    }
    
    function addSubtituloTexto() {
        //var hojaTexto = document.createElement("div");
        //hojaTexto.classList.add("hojaTexto");
        limpiarBotonesAuxiliares();
    
        var diapositivaInput = document.getElementById("diapositivaInput");
        diapositivaInput.value = "Subtitulo y texto";
        var element1 = document.getElementById("GuardarHoja");
        element1.disabled = false;
        cont_hoja.innerHTML = "";
        const div = document.createElement("div");
        div.id = "diapositiva";
        var mi = document.createElement("textarea");
        mi.classList.add("miTexto");
        mi.id = "miTexto";
        mi.type = "text";
        mi.textContent = "texto";
        var miSubTitulo = document.createElement("textarea");
        miSubTitulo.classList.add("miSubTitulo", "subtituloDiapositiva");
        miSubTitulo.id = "miSubTitulo";
        miSubTitulo.type = "text";
        miSubTitulo.textContent = "Subtítulo";
    
        div.appendChild(miSubTitulo);
        div.appendChild(mi);
        const containerc3 = document.querySelector(".c3");
        var botonTexto = document.createElement("input");
        botonTexto.classList.add("CambiarTexto");
        botonTexto.type = "button";
        botonTexto.value = "Cambiar Texto";
    
        containerc3.appendChild(botonTexto);
        cont_hoja.appendChild(div);
    }
    
    function addtituloSubtitulo() {
        //var hojaTexto = document.createElement("div");
        //hojaTexto.classList.add("hojaTexto");
        limpiarBotonesAuxiliares();
    
        var diapositivaInput = document.getElementById("diapositivaInput");
        diapositivaInput.value = "Titulo y subtitulo";
        var element1 = document.getElementById("GuardarHoja");
        element1.disabled = false;
        cont_hoja.innerHTML = "";
        const div = document.createElement("div");
        div.id = "diapositiva";
        var mi = document.createElement("textarea");
        mi.classList.add("miTitulo", "tituloDiapositiva");
        mi.id = "miTitulo";
        mi.type = "text";
        mi.textContent = "Titulo";
        var miSubTitulo = document.createElement("textarea");
        miSubTitulo.classList.add("miSubTitulo", "subtituloDiapositiva");
        miSubTitulo.id = "miSubTitulo";
        miSubTitulo.type = "text";
        miSubTitulo.textContent = "Subtítulo";
    
        div.appendChild(mi);
        div.appendChild(miSubTitulo);
        const containerc3 = document.querySelector(".c3");
        var botonTexto = document.createElement("input");
        botonTexto.classList.add("CambiarTexto");
        botonTexto.type = "button";
        botonTexto.value = "Cambiar Texto";
    
        containerc3.appendChild(botonTexto);
        cont_hoja.appendChild(div);
    }
    function addtitulo() {
        //var hojaTexto = document.createElement("div");
        //hojaTexto.classList.add("hojaTexto");
        limpiarBotonesAuxiliares();
        var diapositivaInput = document.getElementById("diapositivaInput");
        diapositivaInput.value = "Titulo";
        var element1 = document.getElementById("GuardarHoja");
        element1.disabled = false;
        cont_hoja.innerHTML = "";
        const div = document.createElement("div");
        div.id = "diapositiva";
        var mi = document.createElement("textarea");
        mi.classList.add("miTitulo", "tituloDiapositiva");
        mi.id = "miTitulo";
        mi.type = "text";
        mi.textContent = "Titulo";
        div.appendChild(mi);
        const containerc3 = document.querySelector(".c3");
        var botonTexto = document.createElement("input");
        botonTexto.classList.add("CambiarTexto");
        botonTexto.type = "button";
        botonTexto.value = "Cambiar Texto";
    
        containerc3.appendChild(botonTexto);
        cont_hoja.appendChild(div);
    }
    function addTablero() {
        cont_hoja.innerHTML = "";
        const div = document.createElement("div");
        div.id = "chessboard";
        cont_hoja.appendChild(div);
        prueba();
    }
    var bandera = false;
    
    function agregarEventoAlfil() {
        const alfil = document.getElementById("alfil");
        alfil.addEventListener("click", function () {
            console.log("¡Has hecho clic sobre el alfil");
            if (bandera) {
                console.log("eliminando los movientos del alfil");
                const celdas = document.querySelectorAll(".cell");
                celdas.forEach((celda) => {
                    celda.classList.remove("movimientoPosible"); // Remover clase CSS de movimientos previos
                });
                bandera = false;
            } else {
                console.log("creando los movientos del alfil");
                mostrarMovimientosAlfil();
                bandera = true;
            }
        });
    }
    
    function eliminarPosiblesMovimientos() {
        const celdas = document.querySelectorAll(".cell");
        // Recorrer todas las celdas y verificar si son posibles movimientos del alfil
        celdas.forEach((celda) => {
            celda.classList.remove("movimientoPosible"); // Remover clase CSS de movimientos previos
        });
    }
    function mostrarMovimientosAlfil() {
        const alfilCell = alfil.parentElement;
    
        // Obtener la posición del alfil
        const filaAlfil = parseInt(alfilCell.dataset.row);
        const columnaAlfil = parseInt(alfilCell.dataset.col);
    
        // Obtener todas las celdas del tablero
        const celdas = document.querySelectorAll(".cell");
    
        // Recorrer todas las celdas y verificar si son posibles movimientos del alfil
        celdas.forEach((celda) => {
            const filaCelda = parseInt(celda.dataset.row);
            const columnaCelda = parseInt(celda.dataset.col);
    
            const filaDiff = Math.abs(filaCelda - filaAlfil);
            const columnaDiff = Math.abs(columnaCelda - columnaAlfil);
    
            // Verificar si la celda es una diagonal válida para el alfil
            if (filaDiff === columnaDiff && filaDiff !== 0) {
                // Verificar si hay obstáculos en el camino
                if (!hasObstacleInPath(celda)) {
                    // Agregar clase CSS para resaltar el movimiento posible
                    var contenido = celda.innerHTML.trim();
                    if (contenido === "") {
                        //console.log("El div está vacío");
                        celda.classList.add("movimientoPosible");
                    } else {
                        console.log("El div no está vacío");
                    }
                } else {
                    celda.classList.remove("movimientoPosible"); // Remover clase CSS de movimientos previos
                }
            } else {
                celda.classList.remove("movimientoPosible"); // Remover clase CSS de movimientos previos
            }
        });
    }
    
    function hasObstacleInPath(clickedCell) {
        const alfilCell = alfil.parentElement;
        const rowDiff =
            parseInt(clickedCell.dataset.row) - parseInt(alfilCell.dataset.row);
        const colDiff =
            parseInt(clickedCell.dataset.col) - parseInt(alfilCell.dataset.col);
        const rowDirection = rowDiff > 0 ? 1 : -1;
        const colDirection = colDiff > 0 ? 1 : -1;
    
        let currentRow = parseInt(alfilCell.dataset.row) + rowDirection;
        let currentCol = parseInt(alfilCell.dataset.col) + colDirection;
    
        while (
            currentRow !== parseInt(clickedCell.dataset.row) &&
            currentCol !== parseInt(clickedCell.dataset.col)
        ) {
            const cell = document.querySelector(
                `[data-row="${currentRow}"][data-col="${currentCol}"]`
            );
            if (cell.hasChildNodes()) {
                return true; // Hay un obstáculo en el camino
            }
            currentRow += rowDirection;
            currentCol += colDirection;
        }
    
        return false; // No hay obstáculos en el camino
    }
    function dibujarTablero() {
        const chessboard = document.getElementById("chessboard");
    
        // Crear las celdas del tablero
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.classList.add((row + col) % 2 === 0 ? "white" : "black");
                cell.dataset.row = row;
                cell.dataset.col = col;
                chessboard.appendChild(cell);
            }
        }
    }
    function agregarNotacionAlgebraica() {
        const chessboard = document.getElementById("hoja");
        const letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const numeros = ["8", "7", "6", "5", "4", "3", "2", "1"];
    
        // Agregar letras en la parte superior
        const letrasContainer = document.createElement("div");
        letrasContainer.classList.add("notacion-letras");
        letras.forEach((letra) => {
            const letraElement = document.createElement("div");
            letraElement.textContent = letra;
            letrasContainer.appendChild(letraElement);
        });
        chessboard.appendChild(letrasContainer);
    
        // Agregar números en el lateral derecho
        const numerosContainer = document.createElement("div");
        numerosContainer.classList.add("notacion-numeros");
        numeros.forEach((numero) => {
            const numeroElement = document.createElement("div");
            numeroElement.textContent = numero;
            numerosContainer.appendChild(numeroElement);
        });
        chessboard.appendChild(numerosContainer);
    }
    function mensajeExito() {
        var alfilElement = document.querySelector(".bg-success .alfil");
    
        // Verificar si el elemento existe
        if (alfilElement) {
            // Mostrar el modal de éxito
            var mensaje =document.getElementById("textoNumeroDePasos");
            mensaje.textContent  = `El alfil ha llegado a su objetivo en el tablero después de ${numeroMovimientosAlfil} movimientos.`;
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            console.log(numeroMovimientosAlfil);
            numeroMovimientosAlfil = 0;
            modal.style.display = "block";
    
            // Cerrar el modal al hacer clic en la "x"
            span.onclick = function () {
                modal.style.display = "none";
            };
    
            // Cerrar el modal al hacer clic fuera de él
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        }
    }
    function prueba() {
        dibujarTablero();
    
        const meta = document.querySelector(`[data-row="0"][data-col="6"]`);
        meta.classList.add("bg-success");
    
        //Contenedor para botones del tablero
        const contenedorBtn = document.createElement("div");
        contenedorBtn.id = "contenedorBtn";
        contenedorBtn.classList.add("row");
        cont_hoja.appendChild(contenedorBtn);
    
        const contenedorBtnes = document.getElementById("contenedorBtn");
        for (let i = 0; i < 4; i++) {
            const contenedorCol = document.createElement("div");
            contenedorCol.id = "columna-" + (i + 1);
            contenedorCol.classList.add("col-3");
            contenedorBtnes.appendChild(contenedorCol);
        }
    
        //AGREGAR BOTONES
        const divColumna1 = document.getElementById("columna-1");
        const botonObstaculo = document.createElement("button");
        botonObstaculo.textContent = "Agregar Obstaculo";
        botonObstaculo.id = "btnObstaculo";
        botonObstaculo.classList.add("btn", "btn-primary", "botonTablero");
        divColumna1.appendChild(botonObstaculo);
    
        // Asignar evento de clic al botón
        botonObstaculo.addEventListener("click", function () {
            eliminarMovimiento();
            agregarEventoPieza();
            const boton = document.getElementById("btnMovimiento");
            boton.style.display = "";
            divColumna1.appendChild(boton);
            botonObstaculo.style.display = "none";
            divColumna1.appendChild(botonObstaculo);
        });
    
        const botonMovimiento = document.createElement("button");
        botonMovimiento.textContent = "Habilitar Movimiento";
        botonMovimiento.id = "btnMovimiento";
        botonMovimiento.classList.add("btn", "btn-primary", "botonTablero");
        botonMovimiento.style.display = "none";
        divColumna1.appendChild(botonMovimiento);
    
        // Asignar evento de clic al botón
        botonMovimiento.addEventListener("click", function () {
            eliminarEventoPieza();
            agregarMovimiento();
            const boton = document.getElementById("btnObstaculo");
            boton.style.display = "";
            divColumna1.appendChild(boton);
            botonMovimiento.style.display = "none";
            divColumna1.appendChild(botonMovimiento);
        });
    
        const divColumna2 = document.getElementById("columna-2");
    
        const botonMejorCamino = document.createElement("button");
        botonMejorCamino.textContent = "Habilitar Camino";
        botonMejorCamino.id = "btnCamino";
        botonMejorCamino.classList.add("btn", "btn-primary", "botonTablero");
        divColumna2.appendChild(botonMejorCamino);
    
        var fila = 0;
        var columna = 6;
    
        // Asignar evento de clic al botón
        botonMejorCamino.addEventListener("click", function () {
            console.log(fila);
            console.log(columna);
    
            const path = findBestPath(fila, columna);
            console.log(path);
    
            if (path !== null) {
                // Resaltar el camino en el tablero
                highlightPath(path);
                const boton = document.getElementById("btnOcultarCamino");
                boton.style.display = "";
                divColumna2.appendChild(boton);
                botonMejorCamino.style.display = "none";
                divColumna2.appendChild(botonMejorCamino);
            } else {
                console.log("No se encontró un camino válido.");
            }
        });
    
        const botonOcultarCamino = document.createElement("button");
        botonOcultarCamino.textContent = "Ocultar Camino";
        botonOcultarCamino.id = "btnOcultarCamino";
        botonOcultarCamino.classList.add("btn", "btn-primary", "botonTablero");
        botonOcultarCamino.style.display = "none";
        divColumna2.appendChild(botonOcultarCamino);
    
        // Asignar evento de clic al botón
        botonOcultarCamino.addEventListener("click", function () {
            eliminarCamino();
            const boton = document.getElementById("btnCamino");
            boton.style.display = "";
            divColumna2.appendChild(boton);
            botonOcultarCamino.style.display = "none";
            divColumna2.appendChild(botonOcultarCamino);
        });
    
        const divColumna3 = document.getElementById("columna-3");
    
        const botonPosicionAlfil = document.createElement("button");
        botonPosicionAlfil.textContent = "Cambiar Posicion Alfil";
        botonPosicionAlfil.id = "btnPosicionAlfil";
        botonPosicionAlfil.classList.add("btn", "btn-primary", "botonTablero");
        divColumna3.appendChild(botonPosicionAlfil);
    
        // Asignar evento de clic al botón
        botonPosicionAlfil.addEventListener("click", function () {
            eliminarEventoPieza();
            agregarMovimiento();
            const boton = document.getElementById("btnObstaculo");
            boton.style.display = "";
            divColumna1.appendChild(boton);
            botonMovimiento.style.display = "none";
            divColumna1.appendChild(botonMovimiento);
    
            //const contenedorAlfil = buscarCeldaAlfil();
            const divAlfil = document.getElementById("alfil");
            divAlfil.remove();
            cambiarPosicionAlfil();
        });
    
        const divColumna4 = document.getElementById("columna-4");
    
        const botonPosicionFinal = document.createElement("button");
        botonPosicionFinal.textContent = "Cambiar Posicion Final";
        botonPosicionFinal.id = "btnPosicionFinal";
        botonPosicionFinal.classList.add("btn", "btn-primary", "botonTablero");
        divColumna4.appendChild(botonPosicionFinal);
    
        // Asignar evento de clic al botón
        botonPosicionFinal.addEventListener("click", function () {
            eliminarEventoPieza();
            eliminarMovimiento();
    
            const puntoFinal = document.querySelector(".bg-success");
            puntoFinal.classList.remove("bg-success");
    
            cambiarPosicionFinal();
        });
    
        // Crear el alfil en la posición inicial
        agregarPieza(7, 1, "♗", "alfil");
    
        function agregarPieza(row, col, symbol, nombre) {
            const cell = document.querySelector(
                `[data-row="${row}"][data-col="${col}"]`
            );
            const piece = document.createElement("div");
            if (nombre == "alfil") {
                piece.id = nombre;
            }
            piece.classList.add("piece", nombre);
            piece.textContent = symbol;
            cell.appendChild(piece);
            agregarEventoAlfil();
        }
    
        function agregarMovimiento() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.addEventListener("click", moveAlfil);
            });
        }
    
        function eliminarMovimiento() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.removeEventListener("click", moveAlfil);
            });
        }
    
        function agregarEventoPieza() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.addEventListener("click", agregarCelda);
            });
        }
    
        function eliminarEventoPieza() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.removeEventListener("click", agregarCelda);
            });
        }
    
        function agregarCelda() {
            const clickedCell = this;
            const div = clickedCell;
            div.classList.add("obstaculo");
            console.log(clickedCell);
            // Obtener los atributos del div
            const atributos = div.attributes;
            var contenido = div.innerHTML.trim();
            if (contenido === "") {
                //console.log("El div está vacío");
                agregarPieza(atributos[1].value, atributos[2].value, "♙", "peon");
            } else {
                console.log("El div no está vacío");
            }
        }
    
        function eliminarCamino() {
            const cells = document.querySelectorAll(".bg-warning");
            cells.forEach((cell) => {
                cell.classList.remove("bg-warning");
            });
        }
    
        function cambiarPosicionAlfil() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.addEventListener("click", agregarAlfil);
            });
        }
    
        function eliminarEventoPosicionAlfil() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.removeEventListener("click", agregarAlfil);
            });
        }
    
        function agregarAlfil() {
            const clickedCell = this;
            const div = clickedCell;
            const atributos = div.attributes;
            if (buscarCeldaAlfil() == null) {
                agregarPieza(atributos[1].value, atributos[2].value, "♗", "alfil");
            } else {
                eliminarEventoPosicionAlfil();
            }
        }
    
        function cambiarPosicionFinal() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.addEventListener("click", agregarMeta);
            });
        }
    
        function eliminarEventoPosicionFinal() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.removeEventListener("click", agregarMeta);
            });
        }
    
        function agregarMeta() {
            const clickedCell = this;
            const divPadre = clickedCell;
            const puntoFinal = document.querySelector(".bg-success");
            if (puntoFinal == null) {
                console.log(verificarCeldaOcupada(divPadre, ".alfil"));
                console.log(verificarCeldaOcupada(divPadre, ".peon"));
                if (!verificarCeldaOcupada(divPadre, ".alfil")) {
                    if (!verificarCeldaOcupada(divPadre, ".peon")) {
                        divPadre.classList.add("bg-success");
                        eliminarEventoPosicionFinal();
                        agregarMovimiento();
    
                        const atributos = divPadre.attributes;
                        fila = atributos[1].value;
                        columna = atributos[2].value;
                        console.log(
                            "atributo" +
                                atributos[1].value +
                                " " +
                                atributos[2].value
                        );
                        console.log("cambio de valor" + fila + " " + columna);
                    }
                }
            }
        }
    
        agregarMovimiento();
    
        function moveAlfil() {
            const clickedCell = this;
            const alfilCell = alfil.parentElement;
    
            // Verificar si el movimiento es válido
            const rowDiff = Math.abs(
                clickedCell.dataset.row - alfilCell.dataset.row
            );
            const colDiff = Math.abs(
                clickedCell.dataset.col - alfilCell.dataset.col
            );
    
            if (rowDiff === colDiff && rowDiff !== 0) {
                // Verificar si hay obstáculos en el camino
                if (!hasObstacleInPath(clickedCell)) {
                    // Remover el alfil de la celda actual y agregarlo a la celda seleccionada
                    const divPadre = clickedCell; // Obtén una referencia al div padre
                    //const divHijo = document.querySelectorAll(".peon"); // Obtén una referencia al div hijo
    
                    if (verificarCeldaOcupada(divPadre, ".peon")) {
                        console.log(
                            "El div hijo está contenido dentro del div padre."
                        );
                    } else {
                        console.log(
                            "El div hijo no está contenido dentro del div padre."
                        );
                        clickedCell.appendChild(alfil);
                        numeroMovimientosAlfil++;
                    }
                } else {
                    console.log("Hay un obstáculo en el camino del alfil.");
                }
            }
            mensajeExito();
            //eliminarPosiblesMovimientos();
            //mostrarMovimientosAlfil();
        }
    
        function hasObstacleInPath(clickedCell) {
            const alfilCell = alfil.parentElement;
            const rowDiff =
                parseInt(clickedCell.dataset.row) - parseInt(alfilCell.dataset.row);
            const colDiff =
                parseInt(clickedCell.dataset.col) - parseInt(alfilCell.dataset.col);
            const rowDirection = rowDiff > 0 ? 1 : -1;
            const colDirection = colDiff > 0 ? 1 : -1;
    
            let currentRow = parseInt(alfilCell.dataset.row) + rowDirection;
            let currentCol = parseInt(alfilCell.dataset.col) + colDirection;
    
            while (
                currentRow !== parseInt(clickedCell.dataset.row) &&
                currentCol !== parseInt(clickedCell.dataset.col)
            ) {
                const cell = document.querySelector(
                    `[data-row="${currentRow}"][data-col="${currentCol}"]`
                );
                if (cell.hasChildNodes()) {
                    return true;
                }
                currentRow += rowDirection;
                currentCol += colDirection;
            }
    
            return false;
        }
    
        function verificarCeldaOcupada(contenedorPadre, nombreClass) {
            const contenedorHijo = document.querySelectorAll(nombreClass);
            resultado = false;
            contenedorHijo.forEach((contenedor) => {
                if (contenedorPadre.contains(contenedor)) {
                    resultado = true;
                }
            });
    
            return resultado;
        }
    
        function buscarCeldaAlfil() {
            var resultado = null;
            const cells = document.querySelectorAll(".cell");
            const contenedorAlfil = document.getElementById("alfil");
            cells.forEach((cell) => {
                if (cell.contains(contenedorAlfil)) {
                    resultado = cell;
                }
            });
    
            return resultado;
        }
    
        //mejor camino
        function findBestPath(targetRow, targetCol) {
            console.log("fila " + targetRow + "columna " + targetCol);
            const startCell = alfil.parentElement;
            const queue = [];
            const visited = new Set();
            const paths = new Map();
    
            const startNode = {
                row: parseInt(startCell.dataset.row),
                col: parseInt(startCell.dataset.col),
            };
            queue.push(startNode);
            visited.add(`${startNode.row},${startNode.col}`);
            paths.set(`${startNode.row},${startNode.col}`, []);
    
            while (queue.length > 0) {
                console.log("entro");
                const currentNode = queue.shift();
                const { row, col } = currentNode;
    
                if (row === targetRow && col === targetCol) {
                    return paths.get(`${row},${col}`);
                }
    
                const neighbors = getValidNeighbors(row, col);
    
                for (const neighbor of neighbors) {
                    const { neighborRow, neighborCol } = neighbor;
                    const key = `${neighborRow},${neighborCol}`;
    
                    if (!visited.has(key)) {
                        queue.push({ row: neighborRow, col: neighborCol });
                        visited.add(key);
                        paths.set(key, [...paths.get(`${row},${col}`), neighbor]);
                    }
                }
            }
    
            return null;
        }
    
        function getValidNeighbors(row, col) {
            const directions = [
                { row: -1, col: -1 }, // Top-left
                { row: -1, col: 1 }, // Top-right
                { row: 1, col: -1 }, // Bottom-left
                { row: 1, col: 1 }, // Bottom-right
            ];
    
            const neighbors = [];
    
            for (const direction of directions) {
                const neighborRow = row + direction.row;
                const neighborCol = col + direction.col;
    
                if (
                    isValidCell(neighborRow, neighborCol) &&
                    !hasObstacle(neighborRow, neighborCol)
                ) {
                    neighbors.push({ neighborRow, neighborCol });
                }
            }
    
            return neighbors;
        }
    
        function isValidCell(row, col) {
            return row >= 0 && row < 8 && col >= 0 && col < 8;
        }
    
        function hasObstacle(row, col) {
            const cell = document.querySelector(
                `[data-row="${row}"][data-col="${col}"]`
            );
            return cell.classList.contains("obstaculo");
        }
    
        function highlightPath(path) {
            // Restaurar el color original de todas las celdas
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.classList.remove("bg-warning");
            });
    
            console.log("--------------");
            console.log(path);
    
            // Resaltar el camino en el tablero
            var contador = 0;
            path.forEach((step) => {
                const row = step.neighborRow;
                const col = step.neighborCol;
                const cell = document.querySelector(
                    `[data-row="${row}"][data-col="${col}"]`
                );
                if (path.length - 1 != contador) {
                    cell.classList.add("bg-warning");
                }
                contador++;
            });
        }
    }
    
    function cargarScriptDinamico() {
        const element1 = document.getElementById("BotonIniciar");
        element1.remove();
        //AGREGAR BOTONES
        const divColumna1 = document.getElementById("columna-1");
        const botonObstaculo = document.createElement("button");
        botonObstaculo.textContent = "Agregar Obstaculo";
        botonObstaculo.id = "btnObstaculo";
        botonObstaculo.classList.add("btn", "btn-primary", "botonTablero");
        divColumna1.appendChild(botonObstaculo);
    
        // Asignar evento de clic al botón
        botonObstaculo.addEventListener("click", function () {
            eliminarMovimiento();
            agregarEventoPieza();
            const boton = document.getElementById("btnMovimiento");
            boton.style.display = "";
            divColumna1.appendChild(boton);
            botonObstaculo.style.display = "none";
            divColumna1.appendChild(botonObstaculo);
        });
    
        const botonMovimiento = document.createElement("button");
        botonMovimiento.textContent = "Habilitar Movimiento";
        botonMovimiento.id = "btnMovimiento";
        botonMovimiento.classList.add("btn", "btn-primary", "botonTablero");
        botonMovimiento.style.display = "none";
        divColumna1.appendChild(botonMovimiento);
    
        // Asignar evento de clic al botón
        botonMovimiento.addEventListener("click", function () {
            eliminarEventoPieza();
            agregarMovimiento();
            const boton = document.getElementById("btnObstaculo");
            boton.style.display = "";
            divColumna1.appendChild(boton);
            botonMovimiento.style.display = "none";
            divColumna1.appendChild(botonMovimiento);
        });
    
        const divColumna2 = document.getElementById("columna-2");
    
        const botonMejorCamino = document.createElement("button");
        botonMejorCamino.textContent = "Habilitar Camino";
        botonMejorCamino.id = "btnCamino";
        botonMejorCamino.classList.add("btn", "btn-primary", "botonTablero");
        divColumna2.appendChild(botonMejorCamino);
    
        var fila = 0;
        var columna = 6;
    
        // Asignar evento de clic al botón
        botonMejorCamino.addEventListener("click", function () {
            console.log(fila);
            console.log(columna);
    
            const path = findBestPath(fila, columna);
            console.log(path);
    
            if (path !== null) {
                // Resaltar el camino en el tablero
                highlightPath(path);
                const boton = document.getElementById("btnOcultarCamino");
                boton.style.display = "";
                divColumna2.appendChild(boton);
                botonMejorCamino.style.display = "none";
                divColumna2.appendChild(botonMejorCamino);
            } else {
                console.log("No se encontró un camino válido.");
            }
        });
    
        const botonOcultarCamino = document.createElement("button");
        botonOcultarCamino.textContent = "Ocultar Camino";
        botonOcultarCamino.id = "btnOcultarCamino";
        botonOcultarCamino.classList.add("btn", "btn-primary", "botonTablero");
        botonOcultarCamino.style.display = "none";
        divColumna2.appendChild(botonOcultarCamino);
    
        // Asignar evento de clic al botón
        botonOcultarCamino.addEventListener("click", function () {
            eliminarCamino();
            const boton = document.getElementById("btnCamino");
            boton.style.display = "";
            divColumna2.appendChild(boton);
            botonOcultarCamino.style.display = "none";
            divColumna2.appendChild(botonOcultarCamino);
        });
    
        const divColumna3 = document.getElementById("columna-3");
    
        const botonPosicionAlfil = document.createElement("button");
        botonPosicionAlfil.textContent = "Cambiar Posicion Alfil";
        botonPosicionAlfil.id = "btnPosicionAlfil";
        botonPosicionAlfil.classList.add("btn", "btn-primary", "botonTablero");
        divColumna3.appendChild(botonPosicionAlfil);
    
        // Asignar evento de clic al botón
        botonPosicionAlfil.addEventListener("click", function () {
            eliminarEventoPieza();
            agregarMovimiento();
            const boton = document.getElementById("btnObstaculo");
            boton.style.display = "";
            divColumna1.appendChild(boton);
            botonMovimiento.style.display = "none";
            divColumna1.appendChild(botonMovimiento);
    
            //const contenedorAlfil = buscarCeldaAlfil();
            const divAlfil = document.getElementById("alfil");
            divAlfil.remove();
            cambiarPosicionAlfil();
        });
    
        const divColumna4 = document.getElementById("columna-4");
    
        const botonPosicionFinal = document.createElement("button");
        botonPosicionFinal.textContent = "Cambiar Posicion Final";
        botonPosicionFinal.id = "btnPosicionFinal";
        botonPosicionFinal.classList.add("btn", "btn-primary", "botonTablero");
        divColumna4.appendChild(botonPosicionFinal);
    
        // Asignar evento de clic al botón
        botonPosicionFinal.addEventListener("click", function () {
            eliminarEventoPieza();
            eliminarMovimiento();
    
            const puntoFinal = document.querySelector(".bg-success");
            puntoFinal.classList.remove("bg-success");
    
            cambiarPosicionFinal();
        });
        agregarEventoAlfil();
        function agregarPieza(row, col, symbol, nombre) {
            const cell = document.querySelector(
                `[data-row="${row}"][data-col="${col}"]`
            );
            const piece = document.createElement("div");
            if (nombre == "alfil") {
                piece.id = nombre;
            }
            piece.classList.add("piece", nombre);
            piece.textContent = symbol;
            cell.appendChild(piece);
        }
    
        function agregarMovimiento() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.addEventListener("click", moveAlfil);
            });
        }
    
        function eliminarMovimiento() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.removeEventListener("click", moveAlfil);
            });
        }
    
        function agregarEventoPieza() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.addEventListener("click", agregarCelda);
            });
        }
    
        function eliminarEventoPieza() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.removeEventListener("click", agregarCelda);
            });
        }
    
        function agregarCelda() {
            const clickedCell = this;
            const div = clickedCell;
            div.classList.add("obstaculo");
            console.log(clickedCell);
            // Obtener los atributos del div
            const atributos = div.attributes;
            var contenido = div.innerHTML.trim();
            if (contenido === "") {
                //console.log("El div está vacío");
                agregarPieza(atributos[1].value, atributos[2].value, "♙", "peon");
            } else {
                console.log("El div no está vacío");
            }
        }
    
        function eliminarCamino() {
            const cells = document.querySelectorAll(".bg-warning");
            cells.forEach((cell) => {
                cell.classList.remove("bg-warning");
            });
        }
    
        function cambiarPosicionAlfil() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.addEventListener("click", agregarAlfil);
            });
        }
    
        function eliminarEventoPosicionAlfil() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.removeEventListener("click", agregarAlfil);
            });
        }
    
        function agregarAlfil() {
            const clickedCell = this;
            const div = clickedCell;
            const atributos = div.attributes;
            if (buscarCeldaAlfil() == null) {
                agregarPieza(atributos[1].value, atributos[2].value, "♗", "alfil");
            } else {
                eliminarEventoPosicionAlfil();
            }
        }
        function agregarPieza(row, col, symbol, nombre) {
            const cell = document.querySelector(
                `[data-row="${row}"][data-col="${col}"]`
            );
            const piece = document.createElement("div");
            if (nombre == "alfil") {
                piece.id = nombre;
            }
            piece.classList.add("piece", nombre);
            piece.textContent = symbol;
            cell.appendChild(piece);
            agregarEventoAlfil();
        }
    
        function cambiarPosicionFinal() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.addEventListener("click", agregarMeta);
            });
        }
    
        function eliminarEventoPosicionFinal() {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.removeEventListener("click", agregarMeta);
            });
        }
    
        function agregarMeta() {
            const clickedCell = this;
            const divPadre = clickedCell;
            const puntoFinal = document.querySelector(".bg-success");
            if (puntoFinal == null) {
                console.log(verificarCeldaOcupada(divPadre, ".alfil"));
                console.log(verificarCeldaOcupada(divPadre, ".peon"));
                if (!verificarCeldaOcupada(divPadre, ".alfil")) {
                    if (!verificarCeldaOcupada(divPadre, ".peon")) {
                        divPadre.classList.add("bg-success");
                        eliminarEventoPosicionFinal();
                        agregarMovimiento();
    
                        const atributos = divPadre.attributes;
                        fila = atributos[1].value;
                        columna = atributos[2].value;
                        console.log(
                            "atributo" +
                                atributos[1].value +
                                " " +
                                atributos[2].value
                        );
                        console.log("cambio de valor" + fila + " " + columna);
                    }
                }
            }
        }
    
        agregarMovimiento();
    
        function moveAlfil() {
            const clickedCell = this;
            const alfilCell = alfil.parentElement;
    
            // Verificar si el movimiento es válido
            const rowDiff = Math.abs(
                clickedCell.dataset.row - alfilCell.dataset.row
            );
            const colDiff = Math.abs(
                clickedCell.dataset.col - alfilCell.dataset.col
            );
    
            if (rowDiff === colDiff && rowDiff !== 0) {
                // Verificar si hay obstáculos en el camino
                if (!hasObstacleInPath(clickedCell)) {
                    // Remover el alfil de la celda actual y agregarlo a la celda seleccionada
                    const divPadre = clickedCell; // Obtén una referencia al div padre
                    //const divHijo = document.querySelectorAll(".peon"); // Obtén una referencia al div hijo
    
                    if (verificarCeldaOcupada(divPadre, ".peon")) {
                        console.log(
                            "El div hijo está contenido dentro del div padre."
                        );
                    } else {
                        console.log(
                            "El div hijo no está contenido dentro del div padre."
                        );
                        numeroMovimientosAlfil++;
                        clickedCell.appendChild(alfil);
                    }
                } else {
                    console.log("Hay un obstáculo en el camino del alfil.");
                }
            }
            mensajeExito();
    
            //mostrarMovimientosAlfil();
        }
    
        function hasObstacleInPath(clickedCell) {
            const alfilCell = alfil.parentElement;
            const rowDiff =
                parseInt(clickedCell.dataset.row) - parseInt(alfilCell.dataset.row);
            const colDiff =
                parseInt(clickedCell.dataset.col) - parseInt(alfilCell.dataset.col);
            const rowDirection = rowDiff > 0 ? 1 : -1;
            const colDirection = colDiff > 0 ? 1 : -1;
    
            let currentRow = parseInt(alfilCell.dataset.row) + rowDirection;
            let currentCol = parseInt(alfilCell.dataset.col) + colDirection;
    
            while (
                currentRow !== parseInt(clickedCell.dataset.row) &&
                currentCol !== parseInt(clickedCell.dataset.col)
            ) {
                const cell = document.querySelector(
                    `[data-row="${currentRow}"][data-col="${currentCol}"]`
                );
                if (cell.hasChildNodes()) {
                    return true;
                }
                currentRow += rowDirection;
                currentCol += colDirection;
            }
    
            return false;
        }
    
        function verificarCeldaOcupada(contenedorPadre, nombreClass) {
            const contenedorHijo = document.querySelectorAll(nombreClass);
            resultado = false;
            contenedorHijo.forEach((contenedor) => {
                if (contenedorPadre.contains(contenedor)) {
                    resultado = true;
                }
            });
    
            return resultado;
        }
    
        function buscarCeldaAlfil() {
            var resultado = null;
            const cells = document.querySelectorAll(".cell");
            const contenedorAlfil = document.getElementById("alfil");
            cells.forEach((cell) => {
                if (cell.contains(contenedorAlfil)) {
                    resultado = cell;
                }
            });
    
            return resultado;
        }
    
        //mejor camino
        function findBestPath(targetRow, targetCol) {
            console.log("fila " + targetRow + "columna " + targetCol);
            const startCell = alfil.parentElement;
            const queue = [];
            const visited = new Set();
            const paths = new Map();
    
            const startNode = {
                row: parseInt(startCell.dataset.row),
                col: parseInt(startCell.dataset.col),
            };
            queue.push(startNode);
            visited.add(`${startNode.row},${startNode.col}`);
            paths.set(`${startNode.row},${startNode.col}`, []);
    
            while (queue.length > 0) {
                console.log("entro");
                const currentNode = queue.shift();
                const { row, col } = currentNode;
    
                if (row === targetRow && col === targetCol) {
                    return paths.get(`${row},${col}`);
                }
    
                const neighbors = getValidNeighbors(row, col);
    
                for (const neighbor of neighbors) {
                    const { neighborRow, neighborCol } = neighbor;
                    const key = `${neighborRow},${neighborCol}`;
    
                    if (!visited.has(key)) {
                        queue.push({ row: neighborRow, col: neighborCol });
                        visited.add(key);
                        paths.set(key, [...paths.get(`${row},${col}`), neighbor]);
                    }
                }
            }
    
            return null;
        }
    
        function getValidNeighbors(row, col) {
            const directions = [
                { row: -1, col: -1 }, // Top-left
                { row: -1, col: 1 }, // Top-right
                { row: 1, col: -1 }, // Bottom-left
                { row: 1, col: 1 }, // Bottom-right
            ];
    
            const neighbors = [];
    
            for (const direction of directions) {
                const neighborRow = row + direction.row;
                const neighborCol = col + direction.col;
    
                if (
                    isValidCell(neighborRow, neighborCol) &&
                    !hasObstacle(neighborRow, neighborCol)
                ) {
                    neighbors.push({ neighborRow, neighborCol });
                }
            }
    
            return neighbors;
        }
    
        function isValidCell(row, col) {
            return row >= 0 && row < 8 && col >= 0 && col < 8;
        }
    
        function hasObstacle(row, col) {
            const cell = document.querySelector(
                `[data-row="${row}"][data-col="${col}"]`
            );
            return cell.classList.contains("obstaculo");
        }
    
        function highlightPath(path) {
            // Restaurar el color original de todas las celdas
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.classList.remove("bg-warning");
            });
    
            console.log("--------------");
            console.log(path);
    
            // Resaltar el camino en el tablero
            var contador = 0;
            path.forEach((step) => {
                const row = step.neighborRow;
                const col = step.neighborCol;
                const cell = document.querySelector(
                    `[data-row="${row}"][data-col="${col}"]`
                );
                if (path.length - 1 != contador) {
                    cell.classList.add("bg-warning");
                }
                contador++;
            });
        }
    }
    
    ';
}

// Obtener la lista de preguntas
$preguntas = obtenerPreguntas();

// Verificar si se ha enviado el formulario para descargar el cuestionario SCORM
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['generar_scorm'])) {
    createSCORMZip();
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Cuestionario</title>
</head>

<body>
    <h1>Cuestionario</h1>

    <?php echo mostrarListaPreguntas($preguntas); ?>

    <h2>Agregar Pregunta</h2>
    <form method="get" action="">
        <label for="pregunta">Pregunta:</label>
        <input type="text" name="pregunta" id="pregunta" required><br>

        <label for="opcion1">Opción 1:</label>
        <input type="text" name="opcion1" id="opcion1" required><br>

        <label for="opcion2">Opción 2:</label>
        <input type="text" name="opcion2" id="opcion2" required><br>

        <label for="opcion3">Opción 3:</label>
        <input type="text" name="opcion3" id="opcion3" required><br>

        <input type="submit" name="agregar_pregunta" value="Agregar Pregunta">
    </form>

    <h2>Opciones</h2>
    <form method="get" action="">
        <input type="submit" name="eliminar_preguntas" value="Eliminar todas las preguntas">
    </form>

    <h2>Generar Cuestionario SCORM</h2>
    <form method="get" action="">
        <input type="submit" name="generar_scorm" value="Generar Cuestionario SCORM">
    </form>
</body>

</html>