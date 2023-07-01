function createSCORMZip() {
    var zip = new JSZip();

    // Nombre del archivo ZIP
    var zipFileName = 'contenido_scorm.zip';

    // Agrega el archivo imsmanifest.xml al ZIP
    var imsmanifestContent = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<manifest xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" identifier="MANIFEST-01" version="1" xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 http://www.imsglobal.org/xsd/imsccv1p2/imsmanifest_v1p2.xsd http://www.adlnet.org/xsd/adlcp_v1p3 http://www.imsglobal.org/xsd/imsccv1p2/imsmanifest_v1p2.xsd">\n' +
        '  <metadata>\n' +
        '    <schema>IMS Content</schema>\n' +
        '    <schemaversion>1.2.0</schemaversion>\n' +
        '  </metadata>\n' +
        '  <organizations default="ORG-01">\n' +
        '    <organization identifier="ORG-01">\n' +
        '      <title>Organization 1</title>\n' +
        '      <item identifier="ITEM-01" identifierref="RESOURCE-01">\n' +
        '        <title>Item 1</title>\n' +
        '      </item>\n' +
        '    </organization>\n' +
        '  </organizations>\n' +
        '  <resources>\n' +
        '    <resource identifier="RESOURCE-01" type="webcontent" adlcp:scormType="sco" href="index.html">\n' +
        '      <file href="index.html" />\n' +
        '    </resource>\n' +
        '    <resource identifier="imagen" type="webcontent" adlcp:scormType="asset">\n' +
        '      <file href="img/alfil.jpg" />\n' +
        '    </resource>\n' +
        '  </resources>\n' +
        '</manifest>';

    zip.file('imsmanifest.xml', imsmanifestContent);

    var script = '\n<script>\n' +
        '    function checkFileAPI() { //check if api is supported (req HTML5)\n' +
        '        if (window.File && window.FileReader && window.FileList && window.Blob) {\n' +
        '            return true;\n' +
        '        } else {\n' +
        '            alert(\'The File APIs are not fully supported by your browser. Use a better browser.\');\n' +
        '            return false;\n' +
        '        };\n' +
        '    };\n' +
    
        '    $(document).ready(function() {\n' +
        '        checkFileAPI();\n' +
    
        '        $("#fileInput").change(function() {\n' +
        '            if (this.files && this.files[0]) {\n' +
        '                reader = new FileReader();\n' +
        '                reader.onload = function(e) {\n' +
        '                    // do parsing here. e.target.result is file contents\n' +
    
        '                    $("#hoja").html(e.target.result);\n' +
        '                };\n' +
    
        '                reader.readAsText(this.files[0]);\n' +
    
        '            };\n' +
        '            //botonObstaculoDinamico();\n' +
        '        });\n' +
    
        '        $("#downloadInput").click(function() {\n' +
        '            if (document.getElementById(\'chessboard\')) {\n' +
        '                document.getElementById(\'BotonIniciar\')?.remove();\n' +
        '                document.getElementById(\'btnObstaculo\')?.remove();\n' +
        '                document.getElementById(\'btnMovimiento\')?.remove();\n' +
        '                document.getElementById(\'btnOcultarCamino\')?.remove();\n' +
        '                document.getElementById(\'btnCamino\')?.remove();\n' +
        '                document.getElementById(\'btnPosicionAlfil\')?.remove();\n' +
        '                document.getElementById(\'btnPosicionFinal\')?.remove();\n' +
    
    
        '                const contenedorDiv = document.querySelector(".hoja");\n' +
        '                const botonObstaculo = document.createElement("button");\n' +
        '                botonObstaculo.textContent = "Iniciar";\n' +
        '                botonObstaculo.id = "BotonIniciar";\n' +
        '                botonObstaculo.classList.add("btn", "btn-info", "botonTableroIniciar");\n' +
        '                contenedorDiv.appendChild(botonObstaculo);\n' +
    
        '            }\n' +
        '            var element = document.createElement(\'a\');\n' +
    
        '            filecontents = $(\'#hoja\').html();\n' +
        '            // do scrubbing here\n' +
        '            //\n' +
    
        '            element.setAttribute(\'href\', \'data:text/plain;charset=utf-8,\' + encodeURIComponent(\n' +
        '                filecontents));\n' +
        '            element.setAttribute(\'download\', \'output.html\');\n' +
    
        '            element.style.display = \'none\';\n' +
        '            document.body.appendChild(element);\n' +
    
        '            element.click();\n' +
    
        '            document.body.removeChild(element);\n' +
    
        '        });\n' +
        '        $(document).on(\'click\', \'#BotonIniciar\', function() {\n' +
        '            // Código para el evento click del contenido dinámico\n' +
        '            console.log("¡Haz hecho clic en el botón!");\n' +
        '            cargarScriptDinamico();\n' +
    
        '        });\n' +
        '        $(document).on(\'click\', \'#AgregarMovAlfil\', function() {\n' +
        '            var rutaImagen = "img/alfil.jpg";\n' +
        '            var element = document.createElement(\'a\');\n' +
    
        '            filecontents = $(\'#hoja\').html();\n' +
        '            element.setAttribute(\'href\', encodeURIComponent(filecontents));\n' +
    
    
        '            element.style.display = \'none\';\n' +
        '            document.body.appendChild(element);\n' +
        '            //\n' +
        '            var hrefValueInput = document.getElementById(\'hrefValueInput\');\n' +
        '            var hrefValue = element.getAttribute(\'href\');\n' +
        '            hrefValueInput.value = hrefValue;\n' +
        '            document.body.removeChild(element);\n' +
        '            var contenido = hrefValueInput.value;\n' +
    
        '            var diapositivaInput = document.getElementById("diapositivaInput");\n' +
        '            diapositivaInput.value = \'Titulo\';\n' +
        '            addTablero();\n' +
        '            var element1 = document.getElementById("GuardarHoja");\n' +
        '            element1.disabled = false;\n' +
        '            //var element2 = document.getElementById("BorrarHoja");\n' +
        '            //element2.disabled = false;\n' +
    
        '        });\n' +
        '        $(document).on(\'click\', \'.CambiarTexto\', function() {\n' +
    
        '            var x = document.getElementById(\'miTitulo\');\n' +
        '            var y = document.getElementById(\'miTexto\');\n' +
        '            var z = document.getElementById(\'miSubTitulo\');\n' +
        '            if (x) {\n' +
        '                x.innerHTML = x.value;\n' +
        '            }\n' +
        '            if (y) {\n' +
        '                y.innerHTML = y.value;\n' +
        '            }\n' +
        '            if (z) {\n' +
        '                z.innerHTML = z.value;\n' +
        '            }\n' +
    
        '        });\n' +
    

        '        $(document).on(\'click\', \'#GuardarHoja\', function() {\n' +
    
        '            if (document.querySelector(\'#chessboard\')) {\n' +
        '                console.log(\'El elemento con la clase "tablero" existe.\');\n' +
        '                document.querySelector(\'#btnObstaculo\')?.remove();\n' +
        '                document.querySelector(\'#btnMovimiento\')?.remove();\n' +
        '                document.querySelector(\'#btnOcultarCamino\')?.remove();\n' +
        '                document.querySelector(\'#btnCamino\')?.remove();\n' +
        '                document.querySelector(\'#btnPosicionAlfil\')?.remove();\n' +
        '                document.querySelector(\'#btnPosicionFinal\')?.remove();\n' +
    
    
    
        '                const celdas = document.querySelectorAll(\'.cell\');\n' +
        '                celdas.forEach(celda => {\n' +
        '                    celda.classList.remove(\n' +
        '                        \'movimientoPosible\'); // Remover clase CSS de movimientos previos\n' +
        '                });\n' +
    
        '                const contenedorDiv = document.querySelector(".hoja");\n' +
        '                const botonObstaculo = document.createElement("button");\n' +
        '                botonObstaculo.textContent = "Iniciar";\n' +
        '                botonObstaculo.id = "BotonIniciar";\n' +
        '                botonObstaculo.classList.add("btn", "btn-info", "botonTableroIniciar");\n' +
        '                if (!document.getElementById(\'BotonIniciar\')) {\n' +
        '                    contenedorDiv.appendChild(botonObstaculo);\n' +
        '                }\n' +
        '                var rutaImagen = "img/alfil.jpg";\n' +
    
    
        '            }\n' +
        '            document.querySelector(\'.Cambiar\')?.remove();\n' +
        '            document.querySelector(\'.CambiarSubtitulo\')?.remove();\n' +
        '            //document.querySelector(\'.CambiarTexto\')?.remove();\n' +
        '            var element = document.createElement(\'a\');\n' +
    
        '            filecontents = $(\'#hoja\').html();\n' +
        '            element.setAttribute(\'href\', encodeURIComponent(filecontents));\n' +
    
    
        '            element.style.display = \'none\';\n' +
        '            document.body.appendChild(element);\n' +
        '            //\n' +
        '            var hrefValueInput = document.getElementById(\'hrefValueInput\');\n' +
        '            var hrefValue = element.getAttribute(\'href\');\n' +
        '            hrefValueInput.value = hrefValue;\n' +
        '            document.body.removeChild(element);\n' +
        '            var diapositivaInput = document.getElementById("diapositivaInput");\n' +
        '            var expr = diapositivaInput.value;\n' +
    
        '            agregarImagen();\n' +
    
        '            function agregarImagen() {\n' +
        '                addPlantilla(rutaImagen, contenido, expr);\n' +
        '            }\n' +
    
        '        });\n' +
    
        '        $(document).on(\'click\', \'#BorrarHoja\', function() {\n' +
    
        '            alert(\'borradno\');\n' +
        '            document.getElementById(\'hoja\').innerHTML = \'\';\n' +
        '            var contadorInput = document.getElementById(\'contadorInput\');\n' +
        '            contadorInput.value = contadorInput.value - 1;\n' +
    
        '            var diapoActual = document.querySelector(\'.onfocus\');\n' +
        '            if (diapoActual) {\n' +
        '                diapoActual.parentNode.removeChild(diapoActual);\n' +
        '            }\n' +
        '            var element2 = document.getElementById("BorrarHoja");\n' +
        '            element2.disabled = true;\n' +
        '        });\n' +
    
    
        '    });\n' +
        '</script>\n' +
        '<script>\n' +
        '    var outputDiv = document.getElementById(\'hoja\');\n' +
        '    var iterador = 1;\n' +
        '    var contenedor = document.getElementById(\'c1\');\n' +
    
        '    contenedor.addEventListener(\'click\', function(event) {\n' +
        '        var miniatura = event.target.closest(\'.miniatura\');\n' +
        '        if (miniatura) {\n' +
        '            var element2 = document.getElementById("BorrarHoja");\n' +
        '            element2.disabled = false;\n' +
        '            var divItems = document.getElementsByClassName(\'miniatura\');\n' +
        '            Array.from(divItems).forEach((divItem) => {\n' +
        '                divItem.classList.remove(\'onfocus\');\n' +
        '            });\n' +
        '            miniatura.classList.toggle("onfocus");\n' +
        '            var diapoActual = document.getElementById(\'actualInput\');\n' +
    
        '            diapoActual.value = miniatura.querySelector(\'input.indiceDiapositiva[type="hidden"]\').value;\n' +
        '            var hiddenInput = miniatura.querySelector(\'input#oculto[type="hidden"]\');\n' +
        '            var hiddenInputValue = hiddenInput.value;\n' +
        '            outputDiv.innerHTML = decodeURIComponent(hiddenInputValue);\n' +
        '            console.log(\'Valor del hidden input:\', decodeURIComponent(hiddenInputValue));\n' +
        '        }\n' +
        '    });\n' +
        '</script>';

    var indexPlanilla = generarIndexPlanilla() + script;
    zip.file('index.html', generarIndex());
    zip.file('plantillas.html', indexPlanilla);

    zip.file('css/style-index.css', generarEstiloIndex());
    zip.file('css/style-plantilla.css', generarEstiloPlantilla());
    zip.file('css/style-vista.css', generarEstiloVista());
    zip.file('css/styleSimulador.css', generarEstiloSimulador());

    zip.file('js/plantilla-app.js', generarJSPlantilla());

    // Agrega la imagen al ZIP
    var rutaImagen = 'img/alfil.jpg';
    var imagenData = obtenerContenidoImagen(rutaImagen);
    zip.file('img/alfil.jpg', imagenData, { base64: true });

    // Genera el archivo ZIP
    zip.generateAsync({ type: 'blob' }).then(function (content) {
        // Descargar el archivo ZIP
        saveAs(content, zipFileName);
    });
}


function generarIndex(){
    return '\n<!DOCTYPE html>\n' +
    '    <html lang="en">\n' +
    '   <head>\n' +
    '        <meta charset="UTF-8">\n' +
    '        <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
    '        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">\n' +
        
    '        <link rel="stylesheet" href="css/style-index.css">\n' +
    '       <title>Document</title>\n' +
    '    </head>\n' +
    '    <body>\n' +
    '        <ul>\n' +
    '            <li><a class="active.html" href="index">Inicio</a></li>\n' +
    '            <li><a href="plantillas.html">Crear Curso</a></li>\n' +
    '            <li><a class="active" href="cuestionario.html">Crear Cuestionario</a></li>\n' +
    '        </ul>\n' +
    '        <div class="contenedor">\n' +
    '            <h1 class="cursos">Mis cursos</h1> \n' +
    '        </div>\n' +

    '    </body>\n' +
    '    </html>';  
}

function generarIndexPlanilla(){
    const pagina = document.getElementById("pagina");
    return pagina;
}

/*function generarIndexPlanilla(){
    return '\n<!DOCTYPE html>\n'+
    '<html lang="en">\n' +
    
    '<head>\n' +
    '    <meta charset="UTF-8">\n' +
    '    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    
    '    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"\n' +
    '        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">\n' +
    '    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"\n' +
    '        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous">\n' +
    '    </script>\n' +
    '    <script src="https://code.jquery.com/jquery-3.3.1.min.js"\n' +
    '        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>\n' +
    '    <link rel="stylesheet" type="text/css" href="css/styleSimulador.css">\n' +
    '    <link rel="stylesheet" href="css/style-plantilla.css">\n' +
    
    '    <title>Document</title>\n' +
    '</head>\n' +
    
    '<body>\n' +
    '    <ul>\n' +
    '        <li><a href="index.html">Inicio</a></li>\n' +
    '        <li><a class="active" href="plantillas.html">Crear Curso</a></li>\n' +
    '    </ul>\n' +
    '    <center>\n' +
    '        <h5>Diseño</h5>\n' +
    '    </center>\n' +
    '    <div class="container">\n' +
    '        <div id="c1" class="subcontedor c1">\n' +
    
    
    
    
    '        </div>\n' +
    '        <div class="subcontedor c2">\n' +
    '            <div id="hoja" class="hoja">\n' +
    
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="subcontedor c3">\n' +
    
    '            <div class="dropdown">\n' +
    '                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownButton"\n' +
    '                    data-bs-toggle="dropdown" aria-expanded="false">\n' +
    '                    Agregar Diapostiva\n' +
    '                </button>\n' +
    '                <ul class="dropdown-menu" aria-labelledby="dropdownButton">\n' +
    '                    <button id="item1" onclick="addtitulo()" class="dropdown-item" type="button">Titulo</button>\n' +
    '                    <button id="item2" onclick="addtituloSubtitulo()" class="dropdown-item" type="button">Titulo y\n' +
    '                        subtitulo</button>\n' +
    '                    <button id="item3" onclick="addSubtituloTexto()" class="dropdown-item" type="button">Subtitulo\n' +
    '                        y texto</button>\n' +
    '                    <button id="item4" onclick="addTexto()" class="dropdown-item" type="button">Texto</button>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    
    
    
    '            <button type="button" id="AgregarMovAlfil" class="btn btn-primary">Agregar Movimiento Alfil</button>\n' +
    '            <button type="button" id="GuardarHoja" disabled class="btn btn-success">Guardar</button>\n' +
    '            <button type="button" id="BorrarHoja" disabled class="btn btn-danger">Borrar</button>\n' +
    
    
    '        </div>\n' +
    '    </div>\n' +
    '    <div>\n' +
    '        <div id="myModal" class="modal">\n' +
    '            <div class="modal-content">\n' +
    '                <span class="close">&times;</span>\n' +
    '                <div class="modal-header">\n' +
    
    '                    <h2>¡Objetivo alcanzado!</h2>\n' +
    '                </div>\n' +
    '                <div class="modal-body">\n' +
    '                    <p class="textoNumeroDePasos" id="textoNumeroDePasos"></p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    
    '        <input type="hidden" name="href_value" id="hrefValueInput">\n' +
    '        <input type="hidden" name="contador_value" id="contadorInput">\n' +
    '        <input type="hidden" name="actual_value" id="actualInput">\n' +
    '        <input type="hidden" name="href_value" id="diapositivaInput">\n' +
    '    </div>\n' +
    
    
    '    <center>\n' +
    '        <div class="subcontainer">\n' +
    '            <input type="file" id="fileInput" class="btn">\n' +
    
    '            <button type="button" id="downloadInput" class="btn btn-primary ">Guardar Documento</button>\n' +
    '        </div>\n' +
    '    </center>\n' +
    
    
    '    <script src="js/plantilla-app.js"></script>\n' +
    
    '</body>\n' +
    
    '</html>';
}*/

function generarEstiloIndex(){
    return '\n body {\n' +
    '    background-color: white;\n' +
    '    padding-bottom: 10px;\n' +
    '    justify-content: space-between;\n' +
    '}\n' +
    'ul {\n' +
    '    list-style-type: none;\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '    overflow: hidden;\n' +
    '    background-color: #161B22;\n' +
    '}\n' +
    '.cursos{\n' +
    '    border-bottom: 5px solid black;\n' +
    '}\n' +
    '.contenedor{\n' +
    '    display: flex;\n' +
    '    width: 100%;\n' +
    '    flex-direction: column;\n' +
    '    padding: 50px;\n' +
    '    gap: 20px;\n' +
    '    justify-content: space-around;\n' +
    '}\n' +
    'li {\n' +
    '    float: left;\n' +
    '}\n' +
    
    'li a {\n' +
    '    display: block;\n' +
    '    color: white;\n' +
    '    text-align: center;\n' +
    '    padding: 14px 16px;\n' +
    '    text-decoration: none;\n' +
    '}\n' +
    
    'li a:hover {\n' +
    '    background-color: #0D1117;\n' +
    '}\n' +
    
    '.container {\n' +
    '    display: grid;\n' +
    '    height: 520px;\n' +
    '    width: auto;\n' +
    '    grid-template-columns: 2fr 5fr 1fr;\n' +
    '    gap: 20px;\n' +
    '}\n' +
    
    '.subcontedor {\n' +
    '    height: 100%;\n' +
    '    border: 1px solid black;\n' +
    '}\n' +
    
    '.c1 {\n' +
    '    background-color: whitesmoke;\n' +
    '}\n' +
    '.c2 {\n' +
    '    background-color: lightgray;\n' +
    '}\n' +
    '.c3 {\n' +
    '    background-color: whitesmoke;\n' +
    '}';
}

function generarEstiloPlantilla(){
    return '\body {\n' +
    '    background-color: white;\n' +
    '    padding-bottom: 20px;\n' +
    '}\n' +
    'ul {\n' +
    '    list-style-type: none;\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '    overflow: hidden;\n' +
    '    background-color: #161b22;\n' +
    '}\n' +
    
    'li {\n' +
    '    float: left;\n' +
    '}\n' +
    '#alfil {\n' +
    '    cursor: crosshair;\n' +
        
    '}\n' +
    
    '.notacion-letras {\n' +
    '    display: flex;\n' +
    '    justify-content: space-between;\n' +
    '    padding: 0 10px;\n' +
    '    font-weight: bold;\n' +
    '}\n' +
    
    '.notacion-numeros {\n' +
    '    width: auto;\n' +
    '    height: auto;\n' +
    '    display: grid;\n' +
    '    padding: 10px;\n' +
    '    font-weight: bold;\n' +
    '  }\n' +
      
    '.movimientoPosible {\n' +
    '    background-color: yellow; /* Puedes ajustar el color según tus preferencias */\n' +
    '}\n' +
    
    '.onfocus{\n' +
    '    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);\n' +
    '  }\n' +
    '.movimientoPosible:hover {\n' +
    '    background-color: lightgray;\n' +
    '}\n' +
    'textarea{\n' +
    '    border: 1px solid black;\n' +
    '}\n' +
    '.diapositiva {\n' +
    '    position: absolute; /* Position child div relative to parent */\n' +
    '    top: 0; /* Position child div at the top */\n' +
    '    left: 0; /* Position child div at the left */\n' +
    '    max-width: 100%;\n' +
    '    width: 100%;\n' +
    '    align-items: center;\n' +
    '    align-self: center;\n' +
    '    height: auto;\n' +
    '}\n' +
    '.tituloDiapositiva {\n' +
    '    font-size: 68px;\n' +
    '}\n' +
    '.miTitulo {\n' +
    '    max-width: 100%;\n' +
    '    width: 100%;\n' +
    '    text-align: center;\n' +
    '    height: 250px;\n' +
    '    max-height: 100%;\n' +
    '}\n' +
    '.imagen {\n' +
    '    max-width: 100%;\n' +
    '    max-height: 100%;\n' +
    '    margin-left: auto;\n' +
    
    '    margin-right: auto;\n' +
    '    display: block;\n' +
    '    width: 90%;\n' +
    '}\n' +
    
    'li a {\n' +
    '    display: block;\n' +
    '    color: white;\n' +
    '    text-align: center;\n' +
    '    padding: 14px 16px;\n' +
    '    text-decoration: none;\n' +
    '}\n' +
    
    'li a:hover {\n' +
    '    background-color: #0d1117;\n' +
    '}\n' +
    
    '.container {\n' +
    '    display: grid;\n' +
    '    height: 850px;\n' +
    '    width: auto;\n' +
    '    grid-template-columns: 2fr 7fr 1fr;\n' +
    '    gap: 5px;\n' +
    '}\n' +
    
    '.subcontedor {\n' +
    '    height: 100%;\n' +
    '    border: 1px solid black;\n' +
    '}\n' +
    '.hoja {\n' +
    
    '    background-color: white;\n' +
    '    padding: 30px;\n' +
    '    border: 1px solid black;\n' +
    '    align-items: center;\n' +
    '    gap: 10px;\n' +
        
    '}\n' +
    '.miSubTitulo{\n' +
    '    width: 100%;\n' +
    '    text-align: center;\n' +
    '    font-size: 28px;\n' +
    '}\n' +
    '.miTexto{\n' +
    '    width: 100%;\n' +
    '    padding: 10px;\n' +
    '    height: 100%;\n' +
    '}\n' +
    '#diapositiva{\n' +
    '    flex: 0 0 auto;\n' +
    '    background-color: white;\n' +
    '    padding: 20px;\n' +
    '    width: auto;\n' +
    '    height: 100%;\n' +
    '    cursor: pointer;\n' +
    '    gap: 10px;\n' +
    '    display: flex;\n' +
    '    flex-direction: column;\n' +
    '    vertical-align:middle;\n' +
    '    justify-content: center;\n' +
    '    align-items: center;\n' +
    '}\n' +
    '.miniaturaTitulo{\n' +
    '    text-align: center;\n' +
    '    font-size: 30px;\n' +
    '    background-color: lightgray;\n' +
    '    width:  100%;\n' +
    '}\n' +
    '.miniaturaSubTitulo{\n' +
    '    text-align: center;\n' +
    '    font-size: 20px;\n' +
    '    background-color: lightgray;\n' +
    '    width:  100%;\n' +
    '}\n' +
    '.miniaturaTexto{\n' +
    '    text-align: start;\n' +
    '    font-size: 12px;\n' +
    '    background-color: lightgray;\n' +
    '    width:  100%;\n' +
    '}\n' +
    '.miniatura {\n' +
    '    flex: 0 0 auto;\n' +
    '    background-color: white;\n' +
    '    padding: 20px;\n' +
    '    width: auto;\n' +
    '    height: 215px;\n' +
    '    cursor: pointer;\n' +
    '    display: flex;\n' +
    '    gap: 10px;\n' +
    '    justify-content: space-around;\n' +
    '    flex-direction: column;\n' +
    '    border: 1px solid black;\n' +
    '    align-items: center;\n' +
       
    '}\n' +
    '.miniatura:hover,\n' +
    '.miniatura:hover * {\n' +
    '  background-color: gray;\n' +
    '}\n' +
    '.c1 {\n' +
    '    background-color: whitesmoke;\n' +
    '    display: flex;\n' +
    '    flex-direction: column;\n' +
    '    flex-wrap: nowrap;\n' +
    '    padding: 10px;\n' +
    '    gap: 10px;\n' +
    '    overflow: auto;\n' +
    '}\n' +
    '.c2 {\n' +
    '    background-color: lightgray;\n' +
    '    display: grid;\n' +
    '    padding: 20px;\n' +
    '    gap: 20px;\n' +
    '    overflow: auto;\n' +
    '}\n' +
    '.c3 {\n' +
    '    background-color: whitesmoke;\n' +
    '    gap: 20px;\n' +
    '    display: flex;\n' +
    '    flex-direction: column;\n' +
    '    padding: 10px;\n' +
    '}';
}

function generarEstiloVista(){
    return '\nbody{\n' +
        'gap: 20px;\n' +
        'padding: 10px;\n' +
        'align-items: flex-start;\n' +
        'display: grid;\n' +
        'grid-template-columns: auto;\n' +
        'align-content: space-around;\n' +
        'background-color: gray;\n' +
    '}';
}

function generarEstiloSimulador(){
    return '\n#chessboard {\n' +
        'width: auto;\n' +
        'height: 90%;\n' +
        'display: grid;\n' +
        
        'grid-template-columns: repeat(8, 1fr);\n' +
        'grid-template-rows: repeat(8, 1fr);\n' +
    '}\n' +
    
    '.cell {\n' +
    '    border: 1px solid black;\n' +
    '    box-sizing: border-box;\n' +
    '    display: flex;\n' +
    '    justify-content: center;\n' +
    '    align-items: center;\n' +
    '}\n' +
    
    '.white {\n' +
    '    background-color: #F0D9B5;\n' +
    '    cursor: pointer;\n' +
    '}\n' +
    
    '.black {\n' +
    '    background-color: #B58863;\n' +
    '}\n' +
    
    '.piece {\n' +
    
    '    transform: scale(3.5);\n' +
    '    text-align: center;\n' +
    '}\n' +
    
    '.botonTablero {\n' +
    '    width: 100%;\n' +
    '    height: 100%;\n' +
    '}\n' +
    
    '.col-3 {\n' +
    '    padding: 1%;\n' +
    '}\n' +
    
    '.botonTableroIniciar {\n' +
    '    width: 100%;\n' +
    '    height: auto;\n' +
    '}\n' +
    
    '    /* Estilos para el modal */\n' +
    '    .modal {\n' +
    '        display: none;\n' +
    '        position: fixed;\n' +
    '        z-index: 1;\n' +
    '        left: 0;\n' +
    '        top: 0;\n' +
    '        width: 100%;\n' +
    '        height: 100%;\n' +
    '        overflow: auto;\n' +
    '        background-color: rgba(0, 0, 0, 0.5);\n' +
    '      }\n' +
          
    '      .modal-content {\n' +
    '        background-color: #fefefe;\n' +
    '        margin: 15% auto;\n' +
    '        padding: 20px;\n' +
    '        border: 1px solid #888;\n' +
    '        width: 80%;\n' +
    '      }\n' +
          
    '      .close {\n' +
    '        color: #aaa;\n' +
    '        float: right;\n' +
    '        font-size: 28px;\n' +
    '        font-weight: bold;\n' +
    '      }\n' +
          
    '      .close:hover,\n' +
    '      .close:focus {\n' +
    '        color: black;\n' +
    '        text-decoration: none;\n' +
    '        cursor: pointer;\n' +
    '      }';
}

function generarJSPlantilla(){
    return '\nconst container = document.querySelector(".c1");\n' +
    'const cont_hoja = document.querySelector(".hoja");\n' +
    'var autoIncrement = 1;\n' +
    'var numeroDiapositivas = 0;\n' +
    'var numeroMovimientosAlfil = 0;\n' +
    'function addPlantilla(imagenRuta, contenido, expr) {\n' +
    '    const div = document.createElement("div");\n' +
    '    div.classList.add("miniatura");\n' +
    '    div.id = "miniatura";\n' +
    '    var mihidden = document.createElement("input");\n' +
    '    mihidden.classList.add("contenido");\n' +
    '    mihidden.type = "hidden";\n' +
    '    mihidden.id = "oculto";\n' +
    '    mihidden.value = contenido;\n' +
    '    div.appendChild(mihidden);\n' +
    '    container.appendChild(div);\n' +
    '    var contadorInput = document.getElementById("contadorInput");\n' +
    '    numeroDiapositivas++;\n' +
    '    contadorInput.value = numeroDiapositivas;\n' +
    '    var indiceDiapositiva = document.createElement("input");\n' +
    '    indiceDiapositiva.type = "hidden";\n' +
    '    indiceDiapositiva.value = numeroDiapositivas;\n' +
    '    indiceDiapositiva.classList.add("indiceDiapositiva");\n' +
    '    div.appendChild(indiceDiapositiva);\n' +
    '    if (typeof imagenRuta === "undefined") {\n' +
    '        switch (expr) {\n' +
    '            case "Titulo":\n' +
    '                console.log("add Titulo.");\n' +
    '                var mi = document.createElement("span");\n' +
    '                mi.classList.add("miniaturaTitulo");\n' +
    '                //mi.type = "text";\n' +
    '                mi.textContent = "Titulo";\n' +
    '                div.appendChild(mi);\n' +
    '                //addtitulo();\n' +
    '                break;\n' +
    '            case "Titulo y subtitulo":\n' +
    '                var mi = document.createElement("span");\n' +
    '                mi.classList.add("miniaturaTitulo");\n' +
    '                //mi.type = "text";\n' +
    '                mi.textContent = "Titulo";\n' +
    '                div.appendChild(mi);\n' +
    
    '                var Subtitulo = document.createElement("span");\n' +
    '                Subtitulo.classList.add("miniaturaSubTitulo");\n' +
    '                Subtitulo.id = "miSubTitulo";\n' +
    '                Subtitulo.textContent = "Subtitulo";\n' +
    '                div.appendChild(Subtitulo);\n' +
    
    '                console.log("Titulo y subtitulo");\n' +
    '                break;\n' +
    '            case "Subtitulo y texto":\n' +
    '                console.log("add Subtitulo y texto");\n' +
    '                var Subtitulo = document.createElement("span");\n' +
    '                Subtitulo.classList.add("miniaturaSubTitulo");\n' +
    '                Subtitulo.classList.add("miSubTitulo");\n' +
    '                Subtitulo.id = "miSubTitulo";\n' +
    '                Subtitulo.textContent = "Subtitulo";\n' +
    '                div.appendChild(Subtitulo);\n' +
    '                var texto = document.createElement("span");\n' +
    '                texto.classList.add("miniaturaTexto");\n' +
    '                texto.classList.add("miTexto");\n' +
    '                texto.id = "miTexto";\n' +
    '                texto.textContent = "Texto";\n' +
    '                div.appendChild(texto);\n' +
    '                // Expected output: "Mangoes and papayas are $2.79 a pound."\n' +
    '                break;\n' +
    '            case "Texto":\n' +
    '                console.log("add Texto");\n' +
    '                var mi = document.createElement("span");\n' +
    '                mi.classList.add("miniaturaTexto");\n' +
    '                //mi.type = "text";\n' +
    '                mi.classList.add("miTexto");\n' +
    '                mi.id = "miTexto";\n' +
    '                mi.textContent = "Texto";\n' +
    '                div.appendChild(mi);\n' +
    '                // Expected output: "Mangoes and papayas are $2.79 a pound."\n' +
    '                break;\n' +
    '            default:\n' +
    '                console.log(`Sorry, we are out of ${expr}.`);\n' +
    '        }\n' +
    '    } else {\n' +
    '        var imagen = document.createElement("img");\n' +
    '        imagen.classList.add("imagen");\n' +
    '        // Paso 2: Establecer la ruta de la imagen\n' +
    '        imagen.src = imagenRuta;\n' +
    '        div.appendChild(imagen);\n' +
    '        container.appendChild(div);\n' +
    '    }\n' +
    '}\n' +
    'function limpiarBotonesAuxiliares() {\n' +
    '    document.querySelector(".Cambiar")?.remove();\n' +
    '    document.querySelector(".CambiarTexto")?.remove();\n' +
    '    document.querySelector(".CambiarSubtitulo")?.remove();\n' +
    '}\n' +
    'function addTexto() {\n' +
    '    limpiarBotonesAuxiliares();\n' +
    
    '    var diapositivaInput = document.getElementById("diapositivaInput");\n' +
    '    diapositivaInput.value = "Texto";\n' +
    '    var element1 = document.getElementById("GuardarHoja");\n' +
    '    element1.disabled = false;\n' +
    '    cont_hoja.innerHTML = "";\n' +
    '    const div = document.createElement("div");\n' +
    '    div.id = "diapositiva";\n' +
    '    var mi = document.createElement("textarea");\n' +
    '    mi.classList.add("miTexto");\n' +
    '    mi.id = "miTexto";\n' +
    '    mi.type = "text";\n' +
    '    mi.textContent = "texto";\n' +
    
    '    div.appendChild(mi);\n' +
    '    const containerc3 = document.querySelector(".c3");\n' +
    '    var botonTexto = document.createElement("input");\n' +
    '    botonTexto.classList.add("CambiarTexto");\n' +
    '    botonTexto.type = "button";\n' +
    '    botonTexto.value = "Cambiar Texto";\n' +
    
    '    containerc3.appendChild(botonTexto);\n' +
    '    cont_hoja.appendChild(div);\n' +
    '}\n' +
    
    'function addSubtituloTexto() {\n' +
    '    //var hojaTexto = document.createElement("div");\n' +
    '    //hojaTexto.classList.add("hojaTexto");\n' +
    '    limpiarBotonesAuxiliares();\n' +
    
    '    var diapositivaInput = document.getElementById("diapositivaInput");\n' +
    '    diapositivaInput.value = "Subtitulo y texto";\n' +
    '    var element1 = document.getElementById("GuardarHoja");\n' +
    '    element1.disabled = false;\n' +
    '    cont_hoja.innerHTML = "";\n' +
    '    const div = document.createElement("div");\n' +
    '    div.id = "diapositiva";\n' +
    '    var mi = document.createElement("textarea");\n' +
    '    mi.classList.add("miTexto");\n' +
    '    mi.id = "miTexto";\n' +
    '    mi.type = "text";\n' +
    '    mi.textContent = "texto";\n' +
    '    var miSubTitulo = document.createElement("textarea");\n' +
    '    miSubTitulo.classList.add("miSubTitulo", "subtituloDiapositiva");\n' +
    '    miSubTitulo.id = "miSubTitulo";\n' +
    '    miSubTitulo.type = "text";\n' +
    '    miSubTitulo.textContent = "Subtítulo";\n' +
    
    '    div.appendChild(miSubTitulo);\n' +
    '    div.appendChild(mi);\n' +
    '    const containerc3 = document.querySelector(".c3");\n' +
    '    var botonTexto = document.createElement("input");\n' +
    '    botonTexto.classList.add("CambiarTexto");\n' +
    '    botonTexto.type = "button";\n' +
    '    botonTexto.value = "Cambiar Texto";\n' +
    
    '    containerc3.appendChild(botonTexto);\n' +
    '    cont_hoja.appendChild(div);\n' +
    '}\n' +
    
    'function addtituloSubtitulo() {\n' +
    '    //var hojaTexto = document.createElement("div");\n' +
    '    //hojaTexto.classList.add("hojaTexto");\n' +
    '    limpiarBotonesAuxiliares();\n' +
    
    '    var diapositivaInput = document.getElementById("diapositivaInput");\n' +
    '    diapositivaInput.value = "Titulo y subtitulo";\n' +
    '    var element1 = document.getElementById("GuardarHoja");\n' +
    '    element1.disabled = false;\n' +
    '    cont_hoja.innerHTML = "";\n' +
    '    const div = document.createElement("div");\n' +
    '    div.id = "diapositiva";\n' +
    '    var mi = document.createElement("textarea");\n' +
    '    mi.classList.add("miTitulo", "tituloDiapositiva");\n' +
    '    mi.id = "miTitulo";\n' +
    '    mi.type = "text";\n' +
    '    mi.textContent = "Titulo";\n' +
    '    var miSubTitulo = document.createElement("textarea");\n' +
    '    miSubTitulo.classList.add("miSubTitulo", "subtituloDiapositiva");\n' +
    '    miSubTitulo.id = "miSubTitulo";\n' +
    '    miSubTitulo.type = "text";\n' +
    '    miSubTitulo.textContent = "Subtítulo";\n' +
    
    '    div.appendChild(mi);\n' +
    '    div.appendChild(miSubTitulo);\n' +
    '    const containerc3 = document.querySelector(".c3");\n' +
    '    var botonTexto = document.createElement("input");\n' +
    '    botonTexto.classList.add("CambiarTexto");\n' +
    '    botonTexto.type = "button";\n' +
    '    botonTexto.value = "Cambiar Texto";\n' +
    
    '    containerc3.appendChild(botonTexto);\n' +
    '    cont_hoja.appendChild(div);\n' +
    '}\n' +
    'function addtitulo() {\n' +
    '    //var hojaTexto = document.createElement("div");\n' +
    '    //hojaTexto.classList.add("hojaTexto");\n' +
    '    limpiarBotonesAuxiliares();\n' +
    '    var diapositivaInput = document.getElementById("diapositivaInput");\n' +
    '    diapositivaInput.value = "Titulo";\n' +
    '    var element1 = document.getElementById("GuardarHoja");\n' +
    '    element1.disabled = false;\n' +
    '    cont_hoja.innerHTML = "";\n' +
    '    const div = document.createElement("div");\n' +
    '    div.id = "diapositiva";\n' +
    '    var mi = document.createElement("textarea");\n' +
    '    mi.classList.add("miTitulo", "tituloDiapositiva");\n' +
    '    mi.id = "miTitulo";\n' +
    '    mi.type = "text";\n' +
    '    mi.textContent = "Titulo";\n' +
    '    div.appendChild(mi);\n' +
    '    const containerc3 = document.querySelector(".c3");\n' +
    '    var botonTexto = document.createElement("input");\n' +
    '    botonTexto.classList.add("CambiarTexto");\n' +
    '    botonTexto.type = "button";\n' +
    '    botonTexto.value = "Cambiar Texto";\n' +
    
    '    containerc3.appendChild(botonTexto);\n' +
    '    cont_hoja.appendChild(div);\n' +
    '}\n' +
    'function addTablero() {\n' +
    '    cont_hoja.innerHTML = "";\n' +
    '    const div = document.createElement("div");\n' +
    '    div.id = "chessboard";\n' +
    '    cont_hoja.appendChild(div);\n' +
    '    prueba();\n' +
    '}\n' +
    'var bandera = false;\n' +
    
    'function agregarEventoAlfil() {\n' +
    '    const alfil = document.getElementById("alfil");\n' +
    '    alfil.addEventListener("click", function () {\n' +
    '        console.log("¡Has hecho clic sobre el alfil");\n' +
    '        if (bandera) {\n' +
    '            console.log("eliminando los movientos del alfil");\n' +
    '            const celdas = document.querySelectorAll(".cell");\n' +
    '            celdas.forEach((celda) => {\n' +
    '                celda.classList.remove("movimientoPosible"); // Remover clase CSS de movimientos previos\n' +
    '            });\n' +
    '            bandera = false;\n' +
    '        } else {\n' +
    '            console.log("creando los movientos del alfil");\n' +
    '            mostrarMovimientosAlfil();\n' +
    '            bandera = true;\n' +
    '        }\n' +
    '    });\n' +
    '}\n' +
    
    'function eliminarPosiblesMovimientos() {\n' +
    '    const celdas = document.querySelectorAll(".cell");\n' +
    '    // Recorrer todas las celdas y verificar si son posibles movimientos del alfil\n' +
    '    celdas.forEach((celda) => {\n' +
    '        celda.classList.remove("movimientoPosible"); // Remover clase CSS de movimientos previos\n' +
    '    });\n' +
    '}\n' +
    'function mostrarMovimientosAlfil() {\n' +
    '    const alfilCell = alfil.parentElement;\n' +
    
    '    // Obtener la posición del alfil\n' +
    '    const filaAlfil = parseInt(alfilCell.dataset.row);\n' +
    '    const columnaAlfil = parseInt(alfilCell.dataset.col);\n' +
    
    '    // Obtener todas las celdas del tablero\n' +
    '    const celdas = document.querySelectorAll(".cell");\n' +
    
    '    // Recorrer todas las celdas y verificar si son posibles movimientos del alfil\n' +
    '    celdas.forEach((celda) => {\n' +
    '        const filaCelda = parseInt(celda.dataset.row);\n' +
    '        const columnaCelda = parseInt(celda.dataset.col);\n' +
    
    '        const filaDiff = Math.abs(filaCelda - filaAlfil);\n' +
    '        const columnaDiff = Math.abs(columnaCelda - columnaAlfil);\n' +
    
    '        // Verificar si la celda es una diagonal válida para el alfil\n' +
    '        if (filaDiff === columnaDiff && filaDiff !== 0) {\n' +
    '            // Verificar si hay obstáculos en el camino\n' +
    '            if (!hasObstacleInPath(celda)) {\n' +
    '                // Agregar clase CSS para resaltar el movimiento posible\n' +
    '                var contenido = celda.innerHTML.trim();\n' +
    '                if (contenido === "") {\n' +
    '                    //console.log("El div está vacío");\n' +
    '                    celda.classList.add("movimientoPosible");\n' +
    '                } else {\n' +
    '                    console.log("El div no está vacío");\n' +
    '                }\n' +
    '            } else {\n' +
    '                celda.classList.remove("movimientoPosible"); // Remover clase CSS de movimientos previos\n' +
    '            }\n' +
    '        } else {\n' +
    '            celda.classList.remove("movimientoPosible"); // Remover clase CSS de movimientos previos\n' +
    '        }\n' +
    '    });\n' +
    '}\n' +
    
    'function hasObstacleInPath(clickedCell) {\n' +
    '    const alfilCell = alfil.parentElement;\n' +
    '    const rowDiff =\n' +
    '        parseInt(clickedCell.dataset.row) - parseInt(alfilCell.dataset.row);\n' +
    '    const colDiff =\n' +
    '        parseInt(clickedCell.dataset.col) - parseInt(alfilCell.dataset.col);\n' +
    '    const rowDirection = rowDiff > 0 ? 1 : -1;\n' +
    '    const colDirection = colDiff > 0 ? 1 : -1;\n' +
    
    '    let currentRow = parseInt(alfilCell.dataset.row) + rowDirection;\n' +
    '    let currentCol = parseInt(alfilCell.dataset.col) + colDirection;\n' +
    
    '    while (\n' +
    '        currentRow !== parseInt(clickedCell.dataset.row) &&\n' +
    '        currentCol !== parseInt(clickedCell.dataset.col)\n' +
    '    ) {\n' +
    '        const cell = document.querySelector(\n' +
    '            `[data-row="${currentRow}"][data-col="${currentCol}"]`\n' +
    '        );\n' +
    '        if (cell.hasChildNodes()) {\n' +
    '            return true; // Hay un obstáculo en el camino\n' +
    '        }\n' +
    '        currentRow += rowDirection;\n' +
    '        currentCol += colDirection;\n' +
    '    }\n' +
    
    '    return false; // No hay obstáculos en el camino\n' +
    '}\n' +
    'function dibujarTablero() {\n' +
    '    const chessboard = document.getElementById("chessboard");\n' +
    
    '    // Crear las celdas del tablero\n' +
    '    for (let row = 0; row < 8; row++) {\n' +
    '        for (let col = 0; col < 8; col++) {\n' +
    '            const cell = document.createElement("div");\n' +
    '            cell.classList.add("cell");\n' +
    '            cell.classList.add((row + col) % 2 === 0 ? "white" : "black");\n' +
    '            cell.dataset.row = row;\n' +
    '            cell.dataset.col = col;\n' +
    '            chessboard.appendChild(cell);\n' +
    '        }\n' +
    '    }\n' +
    '}\n' +
    'function agregarNotacionAlgebraica() {\n' +
    '    const chessboard = document.getElementById("hoja");\n' +
    '    const letras = ["a", "b", "c", "d", "e", "f", "g", "h"];\n' +
    '    const numeros = ["8", "7", "6", "5", "4", "3", "2", "1"];\n' +
    
    '    // Agregar letras en la parte superior\n' +
    '    const letrasContainer = document.createElement("div");\n' +
    '    letrasContainer.classList.add("notacion-letras");\n' +
    '    letras.forEach((letra) => {\n' +
    '        const letraElement = document.createElement("div");\n' +
    '        letraElement.textContent = letra;\n' +
    '        letrasContainer.appendChild(letraElement);\n' +
    '    });\n' +
    '    chessboard.appendChild(letrasContainer);\n' +
    
    '    // Agregar números en el lateral derecho\n' +
    '    const numerosContainer = document.createElement("div");\n' +
    '    numerosContainer.classList.add("notacion-numeros");\n' +
    '    numeros.forEach((numero) => {\n' +
    '        const numeroElement = document.createElement("div");\n' +
    '        numeroElement.textContent = numero;\n' +
    '        numerosContainer.appendChild(numeroElement);\n' +
    '    });\n' +
    '    chessboard.appendChild(numerosContainer);\n' +
    '}\n' +
    'function mensajeExito() {\n' +
    '    var alfilElement = document.querySelector(".bg-success .alfil");\n' +
    
    '    // Verificar si el elemento existe\n' +
    '    if (alfilElement) {\n' +
    '        // Mostrar el modal de éxito\n' +
    '        var mensaje =document.getElementById("textoNumeroDePasos");\n' +
    '        mensaje.textContent  = `El alfil ha llegado a su objetivo en el tablero después de ${numeroMovimientosAlfil} movimientos.`;\n' +
    '        var modal = document.getElementById("myModal");\n' +
    '        var span = document.getElementsByClassName("close")[0];\n' +
    '        console.log(numeroMovimientosAlfil);\n' +
    '        numeroMovimientosAlfil = 0;\n' +
    '        modal.style.display = "block";\n' +
    
    '        // Cerrar el modal al hacer clic en la "x"\n' +
    '        span.onclick = function () {\n' +
    '            modal.style.display = "none";\n' +
    '        };\n' +
    
    '        // Cerrar el modal al hacer clic fuera de él\n' +
    '        window.onclick = function (event) {\n' +
    '            if (event.target == modal) {\n' +
    '                modal.style.display = "none";\n' +
    '            }\n' +
    '        };\n' +
    '    }\n' +
    '}\n' +
    'function prueba() {\n' +
        'dibujarTablero();\n' +
    
        'const meta = document.querySelector(`[data-row="0"][data-col="6"]`);\n' +
        'meta.classList.add("bg-success");\n' +
    
        '//Contenedor para botones del tablero\n' +
        'const contenedorBtn = document.createElement("div");\n' +
        'contenedorBtn.id = "contenedorBtn";\n' +
        'contenedorBtn.classList.add("row");\n' +
        'cont_hoja.appendChild(contenedorBtn);\n' +
    
        'const contenedorBtnes = document.getElementById("contenedorBtn");\n' +
        'for (let i = 0; i < 4; i++) {\n' +
        '    const contenedorCol = document.createElement("div");\n' +
        '    contenedorCol.id = "columna-" + (i + 1);\n' +
        '    contenedorCol.classList.add("col-3");\n' +
        '    contenedorBtnes.appendChild(contenedorCol);\n' +
        '}\n' +
    
        '//AGREGAR BOTONES\n' +
        'const divColumna1 = document.getElementById("columna-1");\n' +
        'const botonObstaculo = document.createElement("button");\n' +
        'botonObstaculo.textContent = "Agregar Obstaculo";\n' +
        'botonObstaculo.id = "btnObstaculo";\n' +
        'botonObstaculo.classList.add("btn", "btn-primary", "botonTablero");\n' +
        'divColumna1.appendChild(botonObstaculo);\n' +
    
        '// Asignar evento de clic al botón\n' +
        'botonObstaculo.addEventListener("click", function () {\n' +
        '    eliminarMovimiento();\n' +
        '    agregarEventoPieza();\n' +
        '    const boton = document.getElementById("btnMovimiento");\n' +
        '    boton.style.display = "";\n' +
        '    divColumna1.appendChild(boton);\n' +
        '    botonObstaculo.style.display = "none";\n' +
        '    divColumna1.appendChild(botonObstaculo);\n' +
        '});\n' +
    
        'const botonMovimiento = document.createElement("button");\n' +
        'botonMovimiento.textContent = "Habilitar Movimiento";\n' +
       'botonMovimiento.id = "btnMovimiento";\n' +
        'botonMovimiento.classList.add("btn", "btn-primary", "botonTablero");\n' +
        'botonMovimiento.style.display = "none";\n' +
        'divColumna1.appendChild(botonMovimiento);\n' +
    
        '// Asignar evento de clic al botón\n' +
        'botonMovimiento.addEventListener("click", function () {\n' +
        '    eliminarEventoPieza();\n' +
        '    agregarMovimiento();\n' +
        '    const boton = document.getElementById("btnObstaculo");\n' +
        '    boton.style.display = "";\n' +
        '    divColumna1.appendChild(boton);\n' +
        '    botonMovimiento.style.display = "none";\n' +
        '    divColumna1.appendChild(botonMovimiento);\n' +
        '});\n' +
    
        'const divColumna2 = document.getElementById("columna-2");\n' +
    
        'const botonMejorCamino = document.createElement("button");\n' +
        'botonMejorCamino.textContent = "Habilitar Camino";\n' +
        'botonMejorCamino.id = "btnCamino";\n' +
        'botonMejorCamino.classList.add("btn", "btn-primary", "botonTablero");\n' +
        'divColumna2.appendChild(botonMejorCamino);\n' +
    
        'var fila = 0;\n' +
        'var columna = 6;\n' +
    
        '// Asignar evento de clic al botón\n' +
        'botonMejorCamino.addEventListener("click", function () {\n' +
        '    console.log(fila);\n' +
        '    console.log(columna);\n' +
    
        '    const path = findBestPath(fila, columna);\n' +
        '    console.log(path);\n' +
    
        '    if (path !== null) {\n' +
        '        // Resaltar el camino en el tablero\n' +
        '        highlightPath(path);\n' +
        '        const boton = document.getElementById("btnOcultarCamino");\n' +
        '        boton.style.display = "";\n' +
        '        divColumna2.appendChild(boton);\n' +
        '        botonMejorCamino.style.display = "none";\n' +
        '        divColumna2.appendChild(botonMejorCamino);\n' +
        '    } else {\n' +
        '        console.log("No se encontró un camino válido.");\n' +
        '    }\n' +
        '});\n' +
    
        'const botonOcultarCamino = document.createElement("button");\n' +
        'botonOcultarCamino.textContent = "Ocultar Camino";\n' +
        'botonOcultarCamino.id = "btnOcultarCamino";\n' +
        'botonOcultarCamino.classList.add("btn", "btn-primary", "botonTablero");\n' +
        'botonOcultarCamino.style.display = "none";\n' +
        'divColumna2.appendChild(botonOcultarCamino);\n' +
    
        '// Asignar evento de clic al botón\n' +
        'botonOcultarCamino.addEventListener("click", function () {\n' +
        '    eliminarCamino();\n' +
        '   const boton = document.getElementById("btnCamino");\n' +
        '    boton.style.display = "";\n' +
        '    divColumna2.appendChild(boton);\n' +
        '    botonOcultarCamino.style.display = "none";\n' +
        '    divColumna2.appendChild(botonOcultarCamino);\n' +
        '});\n' +
    
        'const divColumna3 = document.getElementById("columna-3");\n' +
    
        'const botonPosicionAlfil = document.createElement("button");\n' +
        'botonPosicionAlfil.textContent = "Cambiar Posicion Alfil";\n' +
        'botonPosicionAlfil.id = "btnPosicionAlfil";\n' +
        'botonPosicionAlfil.classList.add("btn", "btn-primary", "botonTablero");\n' +
        'divColumna3.appendChild(botonPosicionAlfil);\n' +
    
        '// Asignar evento de clic al botón\n' +
        'botonPosicionAlfil.addEventListener("click", function () {\n' +
        '    eliminarEventoPieza();\n' +
        '    agregarMovimiento();\n' +
        '    const boton = document.getElementById("btnObstaculo");\n' +
        '    boton.style.display = "";\n' +
        '    divColumna1.appendChild(boton);\n' +
        '    botonMovimiento.style.display = "none";\n' +
        '    divColumna1.appendChild(botonMovimiento);\n' +
    
        '    //const contenedorAlfil = buscarCeldaAlfil();\n' +
        '    const divAlfil = document.getElementById("alfil");\n' +
        '    divAlfil.remove();\n' +
        '    cambiarPosicionAlfil();\n' +
        '});\n' +
    
        'const divColumna4 = document.getElementById("columna-4");\n' +
    
        'const botonPosicionFinal = document.createElement("button");\n' +
        'botonPosicionFinal.textContent = "Cambiar Posicion Final";\n' +
        'botonPosicionFinal.id = "btnPosicionFinal";\n' +
        'botonPosicionFinal.classList.add("btn", "btn-primary", "botonTablero");\n' +
        'divColumna4.appendChild(botonPosicionFinal);\n' +
    
        '// Asignar evento de clic al botón\n' +
       'botonPosicionFinal.addEventListener("click", function () {\n' +
        '    eliminarEventoPieza();\n' +
        '    eliminarMovimiento();\n' +
    
        '    const puntoFinal = document.querySelector(".bg-success");\n' +
        '    puntoFinal.classList.remove("bg-success");\n' +
    
        '    cambiarPosicionFinal();\n' +
        '});\n' +
    
        '// Crear el alfil en la posición inicial\n' +
        'agregarPieza(7, 1, "♗", "alfil");\n' +
    
        'function agregarPieza(row, col, symbol, nombre) {\n' +
        '    const cell = document.querySelector(\n' +
        '        `[data-row="${row}"][data-col="${col}"]`\n' +
        '    );\n' +
        '    const piece = document.createElement("div");\n' +
        '    if (nombre == "alfil") {\n' +
        '        piece.id = nombre;\n' +
        '    }\n' +
        '    piece.classList.add("piece", nombre);\n' +
        '    piece.textContent = symbol;\n' +
        '    cell.appendChild(piece);\n' +
        '    agregarEventoAlfil();\n' +
        '}\n' +
    
        'function agregarMovimiento() {\n' +
        '    const cells = document.querySelectorAll(".cell");\n' +
        '    cells.forEach((cell) => {\n' +
        '        cell.addEventListener("click", moveAlfil);\n' +
        '    });\n' +
        '}\n' +
    
        'function eliminarMovimiento() {\n' +
        '    const cells = document.querySelectorAll(".cell");\n' +
        '    cells.forEach((cell) => {\n' +
        '        cell.removeEventListener("click", moveAlfil);\n' +
        '    });\n' +
        '}\n' +
    
        'function agregarEventoPieza() {\n' +
        '    const cells = document.querySelectorAll(".cell");\n' +
        '    cells.forEach((cell) => {\n' +
        '        cell.addEventListener("click", agregarCelda);\n' +
        '    });\n' +
        '}\n' +
    
        'function eliminarEventoPieza() {\n' +
        '    const cells = document.querySelectorAll(".cell");\n' +
        '    cells.forEach((cell) => {\n' +
        '        cell.removeEventListener("click", agregarCelda);\n' +
        '    });\n' +
        '}\n' +
    
        'function agregarCelda() {\n' +
        '    const clickedCell = this;\n' +
        '    const div = clickedCell;\n' +
        '    div.classList.add("obstaculo");\n' +
        '    console.log(clickedCell);\n' +
        '    // Obtener los atributos del div\n' +
        '    const atributos = div.attributes;\n' +
        '    var contenido = div.innerHTML.trim();\n' +
        '    if (contenido === "") {\n' +
        '        //console.log("El div está vacío");\n' +
        '        agregarPieza(atributos[1].value, atributos[2].value, "♙", "peon");\n' +
        '    } else {\n' +
        '        console.log("El div no está vacío");\n' +
        '    }\n' +
        '}\n' +
    
        'function eliminarCamino() {\n' +
        '    const cells = document.querySelectorAll(".bg-warning");\n' +
        '    cells.forEach((cell) => {\n' +
        '        cell.classList.remove("bg-warning");\n' +
        '    });\n' +
        '}\n' +
    
        'function cambiarPosicionAlfil() {\n' +
        '    const cells = document.querySelectorAll(".cell");\n' +
        '    cells.forEach((cell) => {\n' +
        '        cell.addEventListener("click", agregarAlfil);\n' +
        '    });\n' +
        '}\n' +
    
        'function eliminarEventoPosicionAlfil() {\n' +
        '    const cells = document.querySelectorAll(".cell");\n' +
        '    cells.forEach((cell) => {\n' +
        '        cell.removeEventListener("click", agregarAlfil);\n' +
        '    });\n' +
        '}\n' +
    
        'function agregarAlfil() {\n' +
        '    const clickedCell = this;\n' +
        '    const div = clickedCell;\n' +
        '    const atributos = div.attributes;\n' +
        '    if (buscarCeldaAlfil() == null) {\n' +
        '        agregarPieza(atributos[1].value, atributos[2].value, "♗", "alfil");\n' +
        '    } else {\n' +
        '        eliminarEventoPosicionAlfil();\n' +
        '    }\n' +
        '}\n' +
    
        'function cambiarPosicionFinal() {\n' +
        '    const cells = document.querySelectorAll(".cell");\n' +
        '    cells.forEach((cell) => {\n' +
        '        cell.addEventListener("click", agregarMeta);\n' +
        '    });\n' +
        '}\n' +
    
        'function eliminarEventoPosicionFinal() {\n' +
        '    const cells = document.querySelectorAll(".cell");\n' +
        '    cells.forEach((cell) => {\n' +
        '        cell.removeEventListener("click", agregarMeta);\n' +
        '    });\n' +
        '}\n' +
    
        'function agregarMeta() {\n' +
        '    const clickedCell = this;\n' +
        '    const divPadre = clickedCell;\n' +
        '    const puntoFinal = document.querySelector(".bg-success");\n' +
        '    if (puntoFinal == null) {\n' +
        '        console.log(verificarCeldaOcupada(divPadre, ".alfil"));\n' +
        '        console.log(verificarCeldaOcupada(divPadre, ".peon"));\n' +
        '        if (!verificarCeldaOcupada(divPadre, ".alfil")) {\n' +
        '            if (!verificarCeldaOcupada(divPadre, ".peon")) {\n' +
        '                divPadre.classList.add("bg-success");\n' +
        '                eliminarEventoPosicionFinal();\n' +
        '                agregarMovimiento();\n' +
    
        '                const atributos = divPadre.attributes;\n' +
        '                fila = atributos[1].value;\n' +
        '                columna = atributos[2].value;\n' +
        '                console.log(\n' +
        '                    "atributo" +\n' +
        '                        atributos[1].value +\n' +
        '                        " " +\n' +
        '                        atributos[2].value\n' +
        '                );\n' +
        '                console.log("cambio de valor" + fila + " " + columna);\n' +
        '            }\n' +
        '        }\n' +
        '    }\n' +
        '}\n' +
    
        'agregarMovimiento();\n' +
    
        'function moveAlfil() {\n' +
        '    const clickedCell = this;\n' +
        '    const alfilCell = alfil.parentElement;\n' +
    
        '    // Verificar si el movimiento es válido\n' +
        '    const rowDiff = Math.abs(\n' +
        '        clickedCell.dataset.row - alfilCell.dataset.row\n' +
        '    );\n' +
        '    const colDiff = Math.abs(\n' +
        '        clickedCell.dataset.col - alfilCell.dataset.col\n' +
        '    );\n' +
    
        '    if (rowDiff === colDiff && rowDiff !== 0) {\n' +
        '        // Verificar si hay obstáculos en el camino\n' +
        '        if (!hasObstacleInPath(clickedCell)) {\n' +
        '            // Remover el alfil de la celda actual y agregarlo a la celda seleccionada\n' +
        '            const divPadre = clickedCell; // Obtén una referencia al div padre\n' +
        '            //const divHijo = document.querySelectorAll(".peon"); // Obtén una referencia al div hijo\n' +
    
        '            if (verificarCeldaOcupada(divPadre, ".peon")) {\n' +
        '                console.log(\n' +
        '                    "El div hijo está contenido dentro del div padre."\n' +
        '                );\n' +
        '            } else {\n' +
        '                console.log(\n' +
        '                    "El div hijo no está contenido dentro del div padre."\n' +
        '                );\n' +
        '                clickedCell.appendChild(alfil);\n' +
        '                numeroMovimientosAlfil++;\n' +
        '            }\n' +
        '        } else {\n' +
        '            console.log("Hay un obstáculo en el camino del alfil.");\n' +
        '        }\n' +
        '    }\n' +
        '    mensajeExito();\n' +
        '    //eliminarPosiblesMovimientos();\n' +
        '    //mostrarMovimientosAlfil();\n' +
        '}\n' +
    
        'function hasObstacleInPath(clickedCell) {\n' +
        '    const alfilCell = alfil.parentElement;\n' +
        '    const rowDiff =\n' +
        '        parseInt(clickedCell.dataset.row) - parseInt(alfilCell.dataset.row);\n' +
        '    const colDiff =\n' +
        '        parseInt(clickedCell.dataset.col) - parseInt(alfilCell.dataset.col);\n' +
        '    const rowDirection = rowDiff > 0 ? 1 : -1;\n' +
        '    const colDirection = colDiff > 0 ? 1 : -1;\n' +
    
        '    let currentRow = parseInt(alfilCell.dataset.row) + rowDirection;\n' +
        '    let currentCol = parseInt(alfilCell.dataset.col) + colDirection;\n' +
    
        '    while (\n' +
        '        currentRow !== parseInt(clickedCell.dataset.row) &&\n' +
        '        currentCol !== parseInt(clickedCell.dataset.col)\n' +
        '    ) {\n' +
        '        const cell = document.querySelector(\n' +
        '            `[data-row="${currentRow}"][data-col="${currentCol}"]`\n' +
        '        );\n' +
        '        if (cell.hasChildNodes()) {\n' +
        '            return true;\n' +
        '        }\n' +
        '        currentRow += rowDirection;\n' +
        '        currentCol += colDirection;\n' +
        '    }\n' +
    
        '    return false;\n' +
        '}\n' +
    
        'function verificarCeldaOcupada(contenedorPadre, nombreClass) {\n' +
        '    const contenedorHijo = document.querySelectorAll(nombreClass);\n' +
        '    resultado = false;\n' +
        '    contenedorHijo.forEach((contenedor) => {\n' +
        '        if (contenedorPadre.contains(contenedor)) {\n' +
        '            resultado = true;\n' +
        '        }\n' +
        '    });\n' +
    
        '    return resultado;\n' +
        '}\n' +
    
        'function buscarCeldaAlfil() {\n' +
        '    var resultado = null;\n' +
        '    const cells = document.querySelectorAll(".cell");\n' +
        '    const contenedorAlfil = document.getElementById("alfil");\n' +
        '    cells.forEach((cell) => {\n' +
        '        if (cell.contains(contenedorAlfil)) {\n' +
        '            resultado = cell;\n' +
        '        }\n' +
        '    });\n' +
    
        '    return resultado;\n' +
        '}\n' +
    
        '//mejor camino\n' +
        'function findBestPath(targetRow, targetCol) {\n' +
        '    console.log("fila " + targetRow + "columna " + targetCol);\n' +
        '    const startCell = alfil.parentElement;\n' +
        '    const queue = [];\n' +
        '    const visited = new Set();\n' +
        '    const paths = new Map();\n' +
    
        '    const startNode = {\n' +
        '        row: parseInt(startCell.dataset.row),\n' +
        '        col: parseInt(startCell.dataset.col),\n' +
        '    };\n' +
        '    queue.push(startNode);\n' +
        '    visited.add(`${startNode.row},${startNode.col}`);\n' +
        '    paths.set(`${startNode.row},${startNode.col}`, []);\n' +
    
        '    while (queue.length > 0) {\n' +
        '        console.log("entro");\n' +
        '        const currentNode = queue.shift();\n' +
        '        const { row, col } = currentNode;\n' +
    
        '        if (row === targetRow && col === targetCol) {\n' +
        '            return paths.get(`${row},${col}`);\n' +
        '        }\n' +
    
        '        const neighbors = getValidNeighbors(row, col);\n' +
    
        '        for (const neighbor of neighbors) {\n' +
        '            const { neighborRow, neighborCol } = neighbor;\n' +
        '            const key = `${neighborRow},${neighborCol}`;\n' +
    
        '            if (!visited.has(key)) {\n' +
        '                queue.push({ row: neighborRow, col: neighborCol });\n' +
        '                visited.add(key);\n' +
        '                paths.set(key, [...paths.get(`${row},${col}`), neighbor]);\n' +
        '            }\n' +
        '        }\n' +
        '    }\n' +
    
        '    return null;\n' +
        '}\n' +
    
        'function getValidNeighbors(row, col) {\n' +
        '        { row: -1, col: 1 }, // Top-right\n' +
        '        { row: 1, col: -1 }, // Bottom-left\n' +
        '        { row: 1, col: 1 }, // Bottom-right\n' +
        '    ];\n' +
    
        '    const neighbors = [];\n' +
    
        '    for (const direction of directions) {\n' +
        '        const neighborRow = row + direction.row;\n' +
        '        const neighborCol = col + direction.col;\n' +
    
        '        if (\n' +
        '            isValidCell(neighborRow, neighborCol) &&\n' +
        '            !hasObstacle(neighborRow, neighborCol)\n' +
        '        ) {\n' +
        '            neighbors.push({ neighborRow, neighborCol });\n' +
        '        }\n' +
        '    }\n' +
    
        '    return neighbors;\n' +
        '}\n' +
    
        'function isValidCell(row, col) {\n' +
        '    return row >= 0 && row < 8 && col >= 0 && col < 8;\n' +
        '}\n' +
    
        'function hasObstacle(row, col) {\n' +
        '    const cell = document.querySelector(\n' +
        '        `[data-row="${row}"][data-col="${col}"]`\n' +
        '    );\n' +
        '    return cell.classList.contains("obstaculo");\n' +
        '}\n' +
    
        'function highlightPath(path) {\n' +
        '    // Restaurar el color original de todas las celdas\n' +
        '    const cells = document.querySelectorAll(".cell");\n' +
        '    cells.forEach((cell) => {\n' +
        '        cell.classList.remove("bg-warning");\n' +
        '    });\n' +
    
        '    console.log("--------------");\n' +
        '    console.log(path);\n' +
    
        '    // Resaltar el camino en el tablero\n' +
        '    var contador = 0;\n' +
        '    path.forEach((step) => {\n' +
        '        const row = step.neighborRow;\n' +
        '        const col = step.neighborCol;\n' +
        '        const cell = document.querySelector(\n' +
        '            `[data-row="${row}"][data-col="${col}"]`\n' +
        '        );\n' +
        '        if (path.length - 1 != contador) {\n' +
        '        }\n' +
        '        contador++;\n' +
        '    });\n' +
        '}\n' +
    '}\n' +
    
    'function cargarScriptDinamico() {\n' +
    '    const element1 = document.getElementById("BotonIniciar");\n' +
    '    element1.remove();\n' +
    '    //AGREGAR BOTONES\n' +
    '    const divColumna1 = document.getElementById("columna-1");\n' +
    '    const botonObstaculo = document.createElement("button");\n' +
    '    botonObstaculo.textContent = "Agregar Obstaculo";\n' +
    '    botonObstaculo.id = "btnObstaculo";\n' +
    '    botonObstaculo.classList.add("btn", "btn-primary", "botonTablero");\n' +
    '    divColumna1.appendChild(botonObstaculo);\n' +
    
    '    // Asignar evento de clic al botón\n' +
    '    botonObstaculo.addEventListener("click", function () {\n' +
    '        eliminarMovimiento();\n' +
    '        agregarEventoPieza();\n' +
    '        const boton = document.getElementById("btnMovimiento");\n' +
    '        boton.style.display = "";\n' +
    '        divColumna1.appendChild(boton);\n' +
    '        botonObstaculo.style.display = "none";\n' +
    '        divColumna1.appendChild(botonObstaculo);\n' +
    '    });\n' +
    
    '    const botonMovimiento = document.createElement("button");\n' +
    '    botonMovimiento.textContent = "Habilitar Movimiento";\n' +
    '    botonMovimiento.id = "btnMovimiento";\n' +
    '    botonMovimiento.classList.add("btn", "btn-primary", "botonTablero");\n' +
    '    botonMovimiento.style.display = "none";\n' +
    '    divColumna1.appendChild(botonMovimiento);\n' +
    
    '    // Asignar evento de clic al botón\n' +
    '    botonMovimiento.addEventListener("click", function () {\n' +
    '        eliminarEventoPieza();\n' +
    '        agregarMovimiento();\n' +
    '        const boton = document.getElementById("btnObstaculo");\n' +
    '        boton.style.display = "";\n' +
    '        divColumna1.appendChild(boton);\n' +
    '        botonMovimiento.style.display = "none";\n' +
    '        divColumna1.appendChild(botonMovimiento);\n' +
    '    });\n' +
    
    '    const divColumna2 = document.getElementById("columna-2");\n' +
    
    '    const botonMejorCamino = document.createElement("button");\n' +
    '    botonMejorCamino.textContent = "Habilitar Camino";\n' +
    '    botonMejorCamino.id = "btnCamino";\n' +
    '    botonMejorCamino.classList.add("btn", "btn-primary", "botonTablero");\n' +
    '    divColumna2.appendChild(botonMejorCamino);\n' +
    
    '    var fila = 0;\n' +
    '    var columna = 6;\n' +
    
    '    // Asignar evento de clic al botón\n' +
    '    botonMejorCamino.addEventListener("click", function () {\n' +
    '        console.log(fila);\n' +
    '        console.log(columna);\n' +
    
    '        const path = findBestPath(fila, columna);\n' +
    '        console.log(path);\n' +
    
    '        if (path !== null) {\n' +
    '            // Resaltar el camino en el tablero\n' +
    '            highlightPath(path);\n' +
    '            const boton = document.getElementById("btnOcultarCamino");\n' +
    '            boton.style.display = "";\n' +
    '            divColumna2.appendChild(boton);\n' +
    '        } else {\n' +
    '            console.log("No se encontró un camino válido.");\n' +
    '        }\n' +
    '    });\n' +
    
    '    const botonOcultarCamino = document.createElement("button");\n' +
    '    botonOcultarCamino.textContent = "Ocultar Camino";\n' +
    '    botonOcultarCamino.id = "btnOcultarCamino";\n' +
    '    botonOcultarCamino.classList.add("btn", "btn-primary", "botonTablero");\n' +
    '    botonOcultarCamino.style.display = "none";\n' +
    '    divColumna2.appendChild(botonOcultarCamino);\n' +
    
    '    // Asignar evento de clic al botón\n' +
    '    botonOcultarCamino.addEventListener("click", function () {\n' +
    '        eliminarCamino();\n' +
    '        const boton = document.getElementById("btnCamino");\n' +
    '        boton.style.display = "";\n' +
    '        divColumna2.appendChild(boton);\n' +
    '        botonOcultarCamino.style.display = "none";\n' +
    '        divColumna2.appendChild(botonOcultarCamino);\n' +
    '    });\n' +
    
    '    const divColumna3 = document.getElementById("columna-3");\n' +
    
    '    const botonPosicionAlfil = document.createElement("button");\n' +
    '    botonPosicionAlfil.textContent = "Cambiar Posicion Alfil";\n' +
    '    botonPosicionAlfil.id = "btnPosicionAlfil";\n' +
    '    botonPosicionAlfil.classList.add("btn", "btn-primary", "botonTablero");\n' +
    '    divColumna3.appendChild(botonPosicionAlfil);\n' +
    
    '    // Asignar evento de clic al botón\n' +
    '    botonPosicionAlfil.addEventListener("click", function () {\n' +
    '        eliminarEventoPieza();\n' +
    '        agregarMovimiento();\n' +
    '        const boton = document.getElementById("btnObstaculo");\n' +
    '        boton.style.display = "";\n' +
    '        divColumna1.appendChild(boton);\n' +
    '        botonMovimiento.style.display = "none";\n' +
    '        divColumna1.appendChild(botonMovimiento);\n' +
    
    '        //const contenedorAlfil = buscarCeldaAlfil();\n' +
   '        const divAlfil = document.getElementById("alfil");\n' +
    '        divAlfil.remove();\n' +
    '        cambiarPosicionAlfil();\n' +
    '    });\n' +
    
    '    const divColumna4 = document.getElementById("columna-4");\n' +
    
    '    const botonPosicionFinal = document.createElement("button");\n' +
    '    botonPosicionFinal.textContent = "Cambiar Posicion Final";\n' +
    '    botonPosicionFinal.id = "btnPosicionFinal";\n' +
    '    botonPosicionFinal.classList.add("btn", "btn-primary", "botonTablero");\n' +
    '    divColumna4.appendChild(botonPosicionFinal);\n' +
    
    '    // Asignar evento de clic al botón\n' +
    '    botonPosicionFinal.addEventListener("click", function () {\n' +
    '        eliminarEventoPieza();\n' +
    '        eliminarMovimiento();\n' +
    
    '        const puntoFinal = document.querySelector(".bg-success");\n' +
    '        puntoFinal.classList.remove("bg-success");\n' +
    
    '        cambiarPosicionFinal();\n' +
    '    });\n' +
    '    agregarEventoAlfil();\n' +
    '    function agregarPieza(row, col, symbol, nombre) {\n' +
    '        const cell = document.querySelector(\n' +
    '            `[data-row="${row}"][data-col="${col}"]`\n' +
    '        );\n' +
    '        const piece = document.createElement("div");\n' +
    '        if (nombre == "alfil") {\n' +
    '            piece.id = nombre;\n' +
    '        }\n' +
    '        piece.classList.add("piece", nombre);\n' +
    '        piece.textContent = symbol;\n' +
    '        cell.appendChild(piece);\n' +
    '    }\n' +
    
    '    function agregarMovimiento() {\n' +
    '        const cells = document.querySelectorAll(".cell");\n' +
    '        cells.forEach((cell) => {\n' +
    '            cell.addEventListener("click", moveAlfil);\n' +
    '        });\n' +
    '    }\n' +
    
    '    function eliminarMovimiento() {\n' +
    '        const cells = document.querySelectorAll(".cell");\n' +
    '        cells.forEach((cell) => {\n' +
    '            cell.removeEventListener("click", moveAlfil);\n' +
    '        });\n' +
    '    }\n' +
    
    '    function agregarEventoPieza() {\n' +
    '        const cells = document.querySelectorAll(".cell");\n' +
    '        cells.forEach((cell) => {\n' +
    '            cell.addEventListener("click", agregarCelda);\n' +
    '        });\n' +
    '    }\n' +
    
    '    function eliminarEventoPieza() {\n' +
    '        const cells = document.querySelectorAll(".cell");\n' +
    '        cells.forEach((cell) => {\n' +
    '            cell.removeEventListener("click", agregarCelda);\n' +
    '        });\n' +
    '    }\n' +
    
    '    function agregarCelda() {\n' +
    '        const clickedCell = this;\n' +
    '        const div = clickedCell;\n' +
    '        div.classList.add("obstaculo");\n' +
    '        console.log(clickedCell);\n' +
    '        // Obtener los atributos del div\n' +
    '        const atributos = div.attributes;\n' +
    '        var contenido = div.innerHTML.trim();\n' +
    '        if (contenido === "") {\n' +
    '            //console.log("El div está vacío");\n' +
    '            agregarPieza(atributos[1].value, atributos[2].value, "♙", "peon");\n' +
    '        } else {\n' +
    '            console.log("El div no está vacío");\n' +
    '        }\n' +
    '    }\n' +
    
    '    function eliminarCamino() {\n' +
    '        const cells = document.querySelectorAll(".bg-warning");\n' +
    '        cells.forEach((cell) => {\n' +
    '            cell.classList.remove("bg-warning");\n' +
    '        });\n' +
    '    }\n' +
    
    '    function cambiarPosicionAlfil() {\n' +
    '        const cells = document.querySelectorAll(".cell");\n' +
    '        cells.forEach((cell) => {\n' +
    '            cell.addEventListener("click", agregarAlfil);\n' +
    '        });\n' +
    '    }\n' +
    
    '    function eliminarEventoPosicionAlfil() {\n' +
    '        const cells = document.querySelectorAll(".cell");\n' +
    '        cells.forEach((cell) => {\n' +
    '            cell.removeEventListener("click", agregarAlfil);\n' +
    '        });\n' +
    '    }\n' +
    
    '    function agregarAlfil() {\n' +
    '        const clickedCell = this;\n' +
    '        const div = clickedCell;\n' +
    '        const atributos = div.attributes;\n' +
    '        if (buscarCeldaAlfil() == null) {\n' +
    '            agregarPieza(atributos[1].value, atributos[2].value, "♗", "alfil");\n' +
    '        } else {\n' +
    '            eliminarEventoPosicionAlfil();\n' +
    '        }\n' +
    '    }\n' +
    '    function agregarPieza(row, col, symbol, nombre) {\n' +
    '        const cell = document.querySelector(\n' +
    '            `[data-row="${row}"][data-col="${col}"]`\n' +
    '        );\n' +
    '        const piece = document.createElement("div");\n' +
    '        if (nombre == "alfil") {\n' +
    '            piece.id = nombre;\n' +
    '        }\n' +
    '        piece.classList.add("piece", nombre);\n' +
    '        piece.textContent = symbol;\n' +
    '        cell.appendChild(piece);\n' +
    '        agregarEventoAlfil();\n' +
    '    }\n' +
    
    '    function cambiarPosicionFinal() {\n' +
    '        const cells = document.querySelectorAll(".cell");\n' +
    '        cells.forEach((cell) => {\n' +
    '            cell.addEventListener("click", agregarMeta);\n' +
    '        });\n' +
    '    }\n' +
    
    '    function eliminarEventoPosicionFinal() {\n' +
    '        const cells = document.querySelectorAll(".cell");\n' +
    '        cells.forEach((cell) => {\n' +
    '            cell.removeEventListener("click", agregarMeta);\n' +
    '        });\n' +
    '    }\n' +
    
    '    function agregarMeta() {\n' +
    '        const clickedCell = this;\n' +
    '        const divPadre = clickedCell;\n' +
    '        const puntoFinal = document.querySelector(".bg-success");\n' +
    '        if (puntoFinal == null) {\n' +
    '            console.log(verificarCeldaOcupada(divPadre, ".alfil"));\n' +
    '            console.log(verificarCeldaOcupada(divPadre, ".peon"));\n' +
    '            if (!verificarCeldaOcupada(divPadre, ".alfil")) {\n' +
    '                if (!verificarCeldaOcupada(divPadre, ".peon")) {\n' +
    '                    divPadre.classList.add("bg-success");\n' +
    '                    eliminarEventoPosicionFinal();\n' +
    '                    agregarMovimiento();\n' +
    
    '                    const atributos = divPadre.attributes;\n' +
    '                    fila = atributos[1].value;\n' +
    '                    columna = atributos[2].value;\n' +
    '                    console.log(\n' +
    '                        "atributo" +\n' +
    '                            atributos[1].value +\n' +
    '                            " " +\n' +
    '                            atributos[2].value\n' +
    '                    );\n' +
    '                    console.log("cambio de valor" + fila + " " + columna);\n' +
    '                }\n' +
    '            }\n' +
    '        }\n' +
    '    }\n' +
    
    '    agregarMovimiento();\n' +
    
    '    function moveAlfil() {\n' +
    '        const clickedCell = this;\n' +
    '        const alfilCell = alfil.parentElement;\n' +
    
    '            clickedCell.dataset.row - alfilCell.dataset.row\n' +
    '        );\n' +
    '        const colDiff = Math.abs(\n' +
    '            clickedCell.dataset.col - alfilCell.dataset.col\n' +
    '        );\n' +
    
    '        if (rowDiff === colDiff && rowDiff !== 0) {\n' +
    '            // Verificar si hay obstáculos en el camino\n' +
    '            if (!hasObstacleInPath(clickedCell)) {\n' +
    '                // Remover el alfil de la celda actual y agregarlo a la celda seleccionada\n' +
    '                const divPadre = clickedCell; // Obtén una referencia al div padre\n' +
    '                //const divHijo = document.querySelectorAll(".peon"); // Obtén una referencia al div hijo\n' +
    
    '                if (verificarCeldaOcupada(divPadre, ".peon")) {\n' +
    '                    console.log(\n' +
    '                        "El div hijo está contenido dentro del div padre."\n' +
    '                    );\n' +
    '                } else {\n' +
    '                    console.log(\n' +
    '                        "El div hijo no está contenido dentro del div padre."\n' +
    '                    );\n' +
    '                    numeroMovimientosAlfil++;\n' +
    '                    clickedCell.appendChild(alfil);\n' +
    '                }\n' +
    '            } else {\n' +
    '                console.log("Hay un obstáculo en el camino del alfil.");\n' +
    '            }\n' +
    '        }\n' +
    '        mensajeExito();\n' +
    
    '        //mostrarMovimientosAlfil();\n' +
    '    }\n' +
    
    '    function hasObstacleInPath(clickedCell) {\n' +
    '        const colDiff =\n' +
    '            parseInt(clickedCell.dataset.col) - parseInt(alfilCell.dataset.col);\n' +
    '        const rowDirection = rowDiff > 0 ? 1 : -1;\n' +
    '        const colDirection = colDiff > 0 ? 1 : -1;\n' +
    
    '        let currentRow = parseInt(alfilCell.dataset.row) + rowDirection;\n' +
    
    '        while (\n' +
    '            currentRow !== parseInt(clickedCell.dataset.row) &&\n' +
    '            currentCol !== parseInt(clickedCell.dataset.col)\n' +
    '        ) {\n' +
    '            const cell = document.querySelector(\n' +
    '                `[data-row="${currentRow}"][data-col="${currentCol}"]`\n' +
    '            );\n' +
    '            if (cell.hasChildNodes()) {\n' +
    '                return true;\n' +
    '            }\n' +
    '            currentRow += rowDirection;\n' +
    '            currentCol += colDirection;\n' +
    '        }\n' +
    
    '        return false;\n' +
    '    }\n' +
    
    '    function verificarCeldaOcupada(contenedorPadre, nombreClass) {\n' +
    '        const contenedorHijo = document.querySelectorAll(nombreClass);\n' +
    '        resultado = false;\n' +
    '        contenedorHijo.forEach((contenedor) => {\n' +
    '            if (contenedorPadre.contains(contenedor)) {\n' +
    '                resultado = true;\n' +
    '            }\n' +
    '        });\n' +
    
    '        return resultado;\n' +
    '    }\n' +
    
    '    function buscarCeldaAlfil() {\n' +
    '        var resultado = null;\n' +
    '        const contenedorAlfil = document.getElementById("alfil");\n' +
    '        cells.forEach((cell) => {\n' +
    '            if (cell.contains(contenedorAlfil)) {\n' +
    '                resultado = cell;\n' +
    '            }\n' +
    '        });\n' +
    
    '        return resultado;\n' +
    '    }\n' +
    
    '    //mejor camino\n' +
    '    function findBestPath(targetRow, targetCol) {\n' +
    '        console.log("fila " + targetRow + "columna " + targetCol);\n' +
    '        const startCell = alfil.parentElement;\n' +
    '        const queue = [];\n' +
    '        const visited = new Set();\n' +
    '        const paths = new Map();\n' +
    
    '        const startNode = {\n' +
    '            row: parseInt(startCell.dataset.row),\n' +
    '            col: parseInt(startCell.dataset.col),\n' +
    '        };\n' +
    '        queue.push(startNode);\n' +
    '        visited.add(`${startNode.row},${startNode.col}`);\n' +
    '        paths.set(`${startNode.row},${startNode.col}`, []);\n' +
    
    '        while (queue.length > 0) {\n' +
    '            console.log("entro");\n' +
    '            const currentNode = queue.shift();\n' +
    '            const { row, col } = currentNode;\n' +
    
    '            if (row === targetRow && col === targetCol) {\n' +
    '                return paths.get(`${row},${col}`);\n' +
    '            }\n' +
    
    '            const neighbors = getValidNeighbors(row, col);\n' +
    
    '            for (const neighbor of neighbors) {\n' +
    '                const { neighborRow, neighborCol } = neighbor;\n' +
    '                const key = `${neighborRow},${neighborCol}`;\n' +
    
    '                if (!visited.has(key)) {\n' +
    '                    visited.add(key);\n' +
    '                    paths.set(key, [...paths.get(`${row},${col}`), neighbor]);\n' +
    '                }\n' +
    '            }\n' +
    '        }\n' +
    
    '        return null;\n' +
    '    }\n' +
    
    '    function getValidNeighbors(row, col) {\n' +
    '        const directions = [\n' +
    '            { row: -1, col: -1 }, // Top-left\n' +
    '            { row: -1, col: 1 }, // Top-right\n' +
    '            { row: 1, col: -1 }, // Bottom-left\n' +
    '            { row: 1, col: 1 }, // Bottom-right\n' +
    '        ];\n' +
    
    '        const neighbors = [];\n' +
    
    '        for (const direction of directions) {\n' +
    '            const neighborRow = row + direction.row;\n' +
    '            const neighborCol = col + direction.col;\n' +
    
    '            if (\n' +
    '                isValidCell(neighborRow, neighborCol) &&\n' +
    '                !hasObstacle(neighborRow, neighborCol)\n' +
    '            }\n' +
    '        }\n' +
    
    '        return neighbors;\n' +
    '    }\n' +
    
    '    function isValidCell(row, col) {\n' +
    '        return row >= 0 && row < 8 && col >= 0 && col < 8;\n' +
    '    }\n' +
    
    '    function hasObstacle(row, col) {\n' +
    '        );\n' +
    '       return cell.classList.contains("obstaculo");\n' +
    '    }\n' +
    
    '    function highlightPath(path) {\n' +
    '        // Restaurar el color original de todas las celdas\n' +
    '        const cells = document.querySelectorAll(".cell");\n' +
    '        cells.forEach((cell) => {\n' +
    '            cell.classList.remove("bg-warning");\n' +
    '        });\n' +
    
    '        console.log("--------------");\n' +
    '        console.log(path);\n' +
    
    '        // Resaltar el camino en el tablero\n' +
    '        var contador = 0;\n' +
    '        path.forEach((step) => {\n' +
    '            const row = step.neighborRow;\n' +
    '            const col = step.neighborCol;\n' +
    '            const cell = document.querySelector(\n' +
    '                `[data-row="${row}"][data-col="${col}"]`\n' +
    '            );\n' +
    '            if (path.length - 1 != contador) {\n' +
    '                cell.classList.add("bg-warning");\n' +
    '            }\n' +
    '            contador++;\n' +
    '        });\n' +
    '    }\n' +
    '}';
}