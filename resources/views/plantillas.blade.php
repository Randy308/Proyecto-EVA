<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="{{ asset('css/styleSimulador.css') }}">
    <link rel="stylesheet" href={{ asset('css/style-plantilla.css') }}>

    <title>Document</title>
</head>

<body>
    <ul>
        <li><a href="{{ route('index') }}">Inicio</a></li>
        <li><a class="active" href="{{ route('plantillas') }}">Crear Plantillas</a></li>
    </ul>
    <center>
        <h4>Diseño</h4>
    </center>
    <div class="container">
        <div id="c1" class="subcontedor c1">




        </div>
        <div class="subcontedor c2">
            <div id="hoja" class="hoja">

            </div>
        </div>
        <div class="subcontedor c3">
            <input id="button" onclick="addPlantilla()" type="button" class="btn btn-primary"
                value="Agregar Diapostiva">

            <button type="button" id="AgregarMovAlfil" class="btn btn-primary">Agregar Movimiento Alfil</button>
            <button type="button" id="GuardarHoja" disabled class="btn btn-primary">Guardar</button>
            <button type="button" id="BorrarHoja" disabled class="btn btn-primary">Borrar</button>


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
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
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
                const element1 = document.getElementById("Obstaculo");
                element1.remove();
                const element2 = document.getElementById("Movimiento");
                element2.remove();
                const contenedorDiv = document.querySelector(".hoja");
                const botonObstaculo = document.createElement("button");
                botonObstaculo.textContent = "Iniciar";
                botonObstaculo.id = "BotonIniciar";
                botonObstaculo.classList.add("btn", "btn-primary", "botonTablero");
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

            $(document).on('click', '#GuardarHoja', function() {
                const element1 = document.getElementById("Obstaculo");
                element1.remove();
                const element2 = document.getElementById("Movimiento");
                element2.remove();
                const contenedorDiv = document.querySelector(".hoja");
                const botonObstaculo = document.createElement("button");
                botonObstaculo.textContent = "Iniciar";
                botonObstaculo.id = "BotonIniciar";
                botonObstaculo.classList.add("btn", "btn-primary", "botonTablero");
                contenedorDiv.appendChild(botonObstaculo);

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
