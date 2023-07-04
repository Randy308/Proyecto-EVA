<!DOCTYPE html>
<html lang="en" id="pagina">

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
    <link rel="stylesheet" type="text/css" href="{{ asset('css/styleSimulador.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style-visualizador.css') }}">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.6.0/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>

    <script src="{{ asset('js/jszip.umd.min.js') }}"></script>
    <title>Document</title>
</head>

<body>
    <ul>
        <li><a href="{{ route('index') }}">Inicio</a></li>
        <li><a class="active" href="{{ route('plantillas') }}">Crear Curso</a></li>
    </ul>

    @if ($curso->count())
        <center>
            <p class="h2" id="mititles">{{ $curso->nombre_curso }}</p>
        </center>
        <div class="descripcion" id="descripcion">
            <div>
                <p class="h5">Descripcion</p>
                <p>{{ $curso->descripcion }}</p>
                <button onclick="saveFilesAndIframesAsZip()" class="btn btn-primary">Generar Comprimido</button>
            </div>

            <p class="h4" id="demo"></p>
        </div>
    @else
        <p class="h6">No existe roles asignados a este usuario</p>
        <small>Este usuario no podra iniciar sesion a menos que se le asigne un rol</small>
    @endif
    <center>
        <p class="h4">Contenido</p>
    </center>

    <div class="myContaineres">
        <div id="myBar" class="progress-bar"></div>
        <div class="containeres" onscroll="myFunction()">
            @foreach ($curso_paginas as $curso_pagina)
                <div class="contenedor">
                    <iframe width="900px" height="900px" id="{{ $curso_pagina->nombre_pagina }}" frameborder="0"
                        srcdoc='    
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
                            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">



                    <link rel="stylesheet" type="text/css" href="{{ asset('css/styleSimulador.css') }}">
                    <link rel="stylesheet" href="{{ asset('css/style-visualizador.css') }}">
                    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
                        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
                    </head>
                    <body>
                        <div class="container">
                        <div class="subcontedor c2">
                            <div id="hoja" class="hoja">
                                {{ urldecode($curso_pagina->contenido) }}
                            </div>
                        </div>
                    </div>
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
                    
                    <script src="{{ asset('js/visualizador.js') }}"></script>
                    <script>
                        $(document).ready(function() {
                            $(document).on("click", "#BotonIniciar", function() {
                                // Código para el evento click del contenido dinámico
                                console.log("¡Haz hecho clic en el botón!");
                                cargarScriptDinamico();

                            });
                        });
                    </script>
                    </body>
                    </html>'></iframe>

                </div>
            @endforeach
        </div>
        <button onclick="extraerSRC()">extraer</button>
    </div>
    <script>
        function extraerSRC() {
            var iframes = document.getElementsByTagName("iframe");
            for (var i = 0; i < iframes.length; i++) {
                var iframe = iframes[i];
                var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                var iframeId = iframe.id;

                // Obtener el contenido del iframe
                var htmlContent = iframeDocument.documentElement.outerHTML;

                // Eliminar todas las instancias de la URL
                var cleanedContent = htmlContent.replace(/http:\/\/127\.0\.0\.1:8000\//g, '');
                var regex = /src=["']([^"']+)["']/g;
                var matches;
                var srcList = [];

                while ((matches = regex.exec(cleanedContent)) !== null) {
                    var src = matches[1];
                    if (!src.endsWith('.js')) {
                        srcList.push(src);
                    }
                }

                console.log(srcList[0]);
            }
        }
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.6.0/jszip.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/FileSaver.js"></script>
    <script>
        function saveFilesAndIframesAsZip() {
            var zip = new JSZip();

            // Guardar archivos CSS y JS
            var files = [{
                    path: '/css/styleSimulador.css',
                    folder: 'Curso/css',
                    filename: 'styleSimulador.css'
                },
                {
                    path: '/css/style-visualizador.css',
                    folder: 'Curso/css',
                    filename: 'style-visualizador.css'
                },
                {
                    path: '/js/visualizador.js',
                    folder: 'Curso/js',
                    filename: 'visualizador.js'
                },
                {
                    path: '/css/style.css',
                    folder: 'Curso/css',
                    filename: 'style.css'
                }
            ];
            var images = [{
                    path: '/img/alfil.jpg',
                    folder: 'Curso/img',
                    filename: 'alfil.jpg'
                }
            ];



            // Guardar contenido de los iframes
            var iframes = document.getElementsByTagName("iframe");

            for (var i = 0; i < iframes.length; i++) {
                var iframe = iframes[i];
                var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                var iframeId = iframe.id;

                // Obtener el contenido del iframe
                var htmlContent = iframeDocument.documentElement.outerHTML;

                // Eliminar todas las instancias de la URL
                var cleanedContent = htmlContent.replace(/http:\/\/127\.0\.0\.1:8000\//g, '');
                var regex = /src=["']([^"']+)["']/g;
                var matches;
                var srcList = [];

                while ((matches = regex.exec(cleanedContent)) !== null) {
                    var src = matches[1];
                    if (!src.endsWith('.js')) {
                        srcList.push(src);
                    }
                }
                srcList.forEach(element => {
                    var nombreArchivo = element.substring(element.lastIndexOf('/') + 1);
                    images.push({
                        path: '/' + element,
                        folder: 'Curso/img',
                        filename: nombreArchivo
                    });
                });
                console.log(srcList[0]);

                console.log(srcList);
                // Guardar el contenido modificado del iframe en el zip
                zip.file("Curso/" + iframeId + ".html", cleanedContent);
            }
            var imagePromises = images.map(file => {
                return fetch(file.path)
                    .then(response => response.arrayBuffer())
                    .then(content => {
                        var uint8Array = new Uint8Array(content);
                        zip.folder(file.folder).file(file.filename, uint8Array);
                    });
            });

            var filePromises = files.map(file => {
                return fetch(file.path)
                    .then(response => response.text())
                    .then(content => {
                        zip.folder(file.folder).file(file.filename, content);
                    });
            });

            zip.file('Curso/index.html', generarIndex());
            zip.file('Curso/imsmanifest.xml', generarXml(srcList));

            Promise.all(filePromises)
                .then(() => {
                    return zip.generateAsync({
                        type: 'blob'
                    });
                })
                .then(content => {
                    saveAs(content, 'scorm_file.zip');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    </script>
    <script src="{{ asset('js/scorm.js') }}"></script>
    <script>
        function saveIframesContentAsZip() {
            var iframes = document.getElementsByTagName("iframe");
            var zip = new JSZip();

            for (var i = 0; i < iframes.length; i++) {
                var iframe = iframes[i];
                var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                var iframeId = iframe.id;

                // Obtener el contenido del iframe
                var htmlContent = iframeDocument.documentElement.outerHTML;

                // Eliminar todas las instancias de la URL
                var cleanedContent = htmlContent.replace(/http:\/\/127\.0\.0\.1:8000\//g, '');

                // Guardar el contenido modificado del iframe en el zip
                zip.file(iframeId + ".html", cleanedContent);
            }

            zip.generateAsync({
                type: "blob"
            }).then(function(content) {
                saveAs(content, "iframes_content.zip");
            });
        }
    </script>


    <script>
        function myFunction() {
            var container = document.querySelector(".myContaineres");
            var content = document.querySelector(".containeres");
            var scrollPosition = content.scrollTop;
            var height = content.scrollHeight - content.clientHeight;
            var scrolled = (scrollPosition / height) * 100;
            document.getElementById("myBar").style.width = scrolled + "%";
        }

        var content = document.querySelector(".containeres");
        content.addEventListener('scroll', myFunction);
        myFunction(); // Llamada inicial a la función

        function getIframeHtml(iframe) {
            const s = new XMLSerializer();
            let html = '';
            let e = iframe.contentDocument.firstChild;
            do {
                html += 'outerHTML' in e ? e.outerHTML : s.serializeToString(e);
                e = e.nextSibling;
            } while (e);
            return html;
        }
    </script>

    <script>
        // Set the date we're counting down to
        var titulos = document.getElementById('mititles');
        let text = titulos.innerHTML;
        titulos.innerHTML = (text.toUpperCase());

        var tiempo = "{{ $curso->duracion }}";
        console.log(tiempo);
        // Convierte el tiempo a segundos
        var segundosTotales = obtenerSegundos(tiempo);

        // Función para obtener los segundos totales a partir de una duración en formato hh:mm:ss
        function obtenerSegundos(tiempo) {
            var partesTiempo = tiempo.split(":");
            var horas = parseInt(partesTiempo[0]);
            var minutos = parseInt(partesTiempo[1]);
            var segundos = parseInt(partesTiempo[2]);
            return horas * 3600 + minutos * 60 + segundos;
        }

        // Función para mostrar el tiempo en formato hh:mm:ss
        function mostrarTiempo(segundos) {
            var horas = Math.floor(segundos / 3600);
            var minutos = Math.floor((segundos % 3600) / 60);
            var segundosRestantes = segundos % 60;
            return (
                ("0" + horas).slice(-2) +
                ":" +
                ("0" + minutos).slice(-2) +
                ":" +
                ("0" + segundosRestantes).slice(-2)
            );
        }

        // Función para realizar la cuenta regresiva
        function cuentaRegresiva() {
            var intervalo = setInterval(function() {
                segundosTotales--;

                // Muestra el tiempo restante
                //console.log(mostrarTiempo(segundosTotales));
                document.getElementById("demo").innerHTML = mostrarTiempo(segundosTotales);
                if (segundosTotales <= 0) {
                    // Se ha alcanzado el final de la cuenta regresiva
                    clearInterval(intervalo);
                    console.log("¡Tiempo agotado!");
                }
            }, 1000);
        }

        // Inicia la cuenta regresiva
        cuentaRegresiva();
    </script>
</body>

</html>
