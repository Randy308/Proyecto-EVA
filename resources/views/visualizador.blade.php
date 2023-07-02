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
            </div>

            <p class="h4" id="demo"></p>
        </div>
    @else
        <p class="h6">No existe roles asignados a este usuario</p>
        <small>Este usuario no podra iniciar sesion a menos que se le asigne un rol</small>
    @endif
            <center><p class="h4">Contenido</p></center>
            <div class="container">
                @foreach ($curso_paginas as $curso_pagina)
                    <div class="contenedor">
                        <iframe width="900px" height="900px" frameborder="0"
                            srcdoc='    
                    <html>
                    <head>
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
