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
    <link rel="stylesheet" type="text/css" href="{{ asset('css/styleSimulador.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style-plantilla.css') }}">

    <title>Document</title>
</head>

<body>
    <ul>
        <li><a href="{{ route('index') }}">Inicio</a></li>
        <li><a class="active" href="{{ route('plantillas') }}">Crear Plantillas</a></li>
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
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownButton" data-bs-toggle="dropdown"
                  aria-expanded="false">
                 Agregar Diapostiva
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownButton">
                    <button id="item1" onclick="addtitulo()" class="dropdown-item" type="button">Titulo</button>
                    <button id="item2" class="dropdown-item" type="button">Titulo y subtitulo</button>
                    <button id="item3" class="dropdown-item" type="button">Subtitulo y texto</button>
                    <button id="item4" class="dropdown-item" type="button">Texto</button>
                </ul>
            </div>

            

            <button type="button" id="AgregarMovAlfil" class="btn btn-primary">Agregar Movimiento Alfil</button>
            <button type="button" id="GuardarHoja" disabled class="btn btn-success">Guardar</button>
            <button type="button" id="BorrarHoja" disabled class="btn btn-danger">Borrar</button>


        </div>
    </div>
    <div>
        <input type="hidden" name="href_value" id="hrefValueInput">

    </div>

    <!--
    <center>
        <div class="subcontainer">
            <input type="file" id="fileInput" class="btn">

            <button type="button" id="downloadInput" class="btn btn-primary ">Guardar Documento</button>
        </div>
    </center>-->


    <script src="{{ asset('js/scriptSimulador.js') }}"></script>

    <script src="{{ asset('js/plantilla-app.js') }}"></script>

    <script>
        function checkFileAPI() { //check if api is supported (req HTML5)
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                return true;
            } else {
                alert('The File APIs are not fully supported by your browser. Use a better browser.');
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
                botonObstaculoDinamico();
            });

            $("#downloadInput").click(function() {
                const element1 = document.getElementById("btnObstaculo");
                element1.remove();
                const element2 = document.getElementById("btnMovimiento");
                element2.remove();
                const element3 = document.getElementById("btnOcultarCamino");
                element3.remove();
                const element4 = document.getElementById("btnCamino");
                element4.remove();
                const element5 = document.getElementById("btnPosicionAlfil");
                element5.remove();
                const element6 = document.getElementById("btnPosicionFinal");
                element6.remove();

                const contenedorDiv = document.querySelector(".hoja");
                const botonObstaculo = document.createElement("button");
                botonObstaculo.textContent = "Iniciar";
                botonObstaculo.id = "BotonIniciar";
                botonObstaculo.classList.add("btn", "btn-info", "botonTablero");
                contenedorDiv.appendChild(botonObstaculo);
                var element = document.createElement('a');

                filecontents = $('#hoja').html();
                // do scrubbing here
                //
                var inputs = document.createElement('input');
                //inputs.se
                //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(filecontents));
                element.setAttribute('href', encodeURIComponent(filecontents));
                element.setAttribute('download', 'output.html');

                element.style.display = 'none';
                document.body.appendChild(element);
                //
                var hrefValueInput = document.getElementById('hrefValueInput');
                var hrefValue = element.getAttribute('href');
                hrefValueInput.value = hrefValue;

                // Submit the form programmatically
                //var form = document.querySelector('form');
                //form.submit();
                //element.click();

                document.body.removeChild(element);








            });
            $(document).on('click', '#BotonIniciar', function() {
                // Código para el evento click del contenido dinámico
                console.log("¡Haz hecho clic en el botón!");
                botonObstaculoDinamico();

            });
            $(document).on('click', '#AgregarMovAlfil', function() {
                var rutaImagen = "{{ asset('img/alfil.jpg') }}";
                var element = document.createElement('a');

                filecontents = $('#hoja').html();
                element.setAttribute('href', encodeURIComponent(filecontents));


                element.style.display = 'none';
                document.body.appendChild(element);
                //
                var hrefValueInput = document.getElementById('hrefValueInput');
                var hrefValue = element.getAttribute('href');
                hrefValueInput.value = hrefValue;
                document.body.removeChild(element);
                var contenido = hrefValueInput.value;
                addTablero();
                var element1 = document.getElementById("GuardarHoja");
                element1.disabled = false;
                var element2 = document.getElementById("BorrarHoja");
                element2.disabled = false;

            });
            $(document).on('click', '.Cambiar', function() {
                var y = document.getElementById('miTitulo');
                y.innerHTML = y.value ;

            });


            $(document).on('click', '#GuardarHoja', function() {

                if (document.querySelector('#chessboard')) {
                console.log('El elemento con la clase "tablero" existe.');
                const element1 = document.getElementById("btnObstaculo");
                element1.remove();
                const element2 = document.getElementById("btnMovimiento");
                element2.remove();
                const element3 = document.getElementById("btnOcultarCamino");
                element3.remove();
                const element4 = document.getElementById("btnCamino");
                element4.remove();
                const element5 = document.getElementById("btnPosicionAlfil");
                element5.remove();
                const element6 = document.getElementById("btnPosicionFinal");
                element6.remove();

                const contenedorDiv = document.querySelector(".hoja");
                const botonObstaculo = document.createElement("button");
                botonObstaculo.textContent = "Iniciar";
                botonObstaculo.id = "BotonIniciar";
                botonObstaculo.classList.add("btn", "btn-info", "botonTableroIniciar");
                contenedorDiv.appendChild(botonObstaculo);

                var rutaImagen = "{{ asset('img/alfil.jpg') }}";
            
            
            }
                
                var element = document.createElement('a');

                filecontents = $('#hoja').html();
                element.setAttribute('href', encodeURIComponent(filecontents));


                element.style.display = 'none';
                document.body.appendChild(element);
                //
                var hrefValueInput = document.getElementById('hrefValueInput');
                var hrefValue = element.getAttribute('href');
                hrefValueInput.value = hrefValue;
                document.body.removeChild(element);
                var contenido = hrefValueInput.value;

                agregarImagen();

                function agregarImagen() {
                    addPlantilla(rutaImagen, contenido);
                }

            });

        });
    </script>
    <script>
        var outputDiv = document.getElementById('hoja');
        var contenedor = document.getElementById('c1');
        contenedor.addEventListener('click', function(event) {
            var miniatura = event.target.closest('.miniatura');
            if (miniatura) {
                var hiddenInput = miniatura.querySelector('input[type="hidden"]');
                var hiddenInputValue = hiddenInput.value;
                outputDiv.innerHTML = decodeURIComponent(hiddenInputValue);
                console.log('Valor del hidden input:', decodeURIComponent(hiddenInputValue));
            }
        });
    </script>

</body>

</html>
