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
        <p>{{ $curso }}</p>
    @else
        <p class="h6">No existe roles asignados a este usuario</p>
        <small>Este usuario no podra iniciar sesion a menos que se le asigne un rol</small>
    @endif
    <br>
    <div class="card">
        <button onclick="cargarScriptDinamico()">cargar</button>

        <div class="card-body">
            <p class="h4">Paginas del curso.-</p>

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


</body>

</html>
