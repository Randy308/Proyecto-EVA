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
    <link rel="stylesheet" href="{{ asset('css/style-plantilla.css') }}">

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
            <button type="button" id="btnScorm" class="btn btn-primary ">Generar SCORM</button>
            
        </div>
    </center>


    <script src="{{ asset('js/plantilla-app.js') }}"></script>
    <script src="{{ asset('js/jszip.umd.min.js') }}"></script>

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
                //botonObstaculoDinamico();
            });

            $("#downloadInput").click(function() {
                if (document.getElementById('chessboard')) {
                    document.getElementById('BotonIniciar')?.remove();
                    document.getElementById('btnObstaculo')?.remove();
                    document.getElementById('btnMovimiento')?.remove();
                    document.getElementById('btnOcultarCamino')?.remove();
                    document.getElementById('btnCamino')?.remove();
                    document.getElementById('btnPosicionAlfil')?.remove();
                    document.getElementById('btnPosicionFinal')?.remove();


                    const contenedorDiv = document.querySelector(".hoja");
                    const botonObstaculo = document.createElement("button");
                    botonObstaculo.textContent = "Iniciar";
                    botonObstaculo.id = "BotonIniciar";
                    botonObstaculo.classList.add("btn", "btn-info", "botonTableroIniciar");
                    contenedorDiv.appendChild(botonObstaculo);

                }

                var element = document.createElement('a');

                filecontents = $('#hoja').html();
                // do scrubbing here
                //

                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(
                    filecontents));
                element.setAttribute('download', 'output.html');

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);


                //var element = document.createElement('a');

                //filecontents = $('#hoja').html();
                // do scrubbing here
                //
                //var inputs = document.createElement('input');
                //inputs.se
                //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(filecontents));
                //element.setAttribute('href', encodeURIComponent(filecontents));
                //element.setAttribute('download', 'output.html');

                //element.style.display = 'none';
                //document.body.appendChild(element);
                //
                //var hrefValueInput = document.getElementById('hrefValueInput');
                //var hrefValue = element.getAttribute('href');
                //hrefValueInput.value = hrefValue;

                // Submit the form programmatically
                //var form = document.querySelector('form');
                //form.submit();
                //element.click();

                //document.body.removeChild(element);

            });
            $(document).on('click', '#BotonIniciar', function() {
                // Código para el evento click del contenido dinámico
                console.log("¡Haz hecho clic en el botón!");
                cargarScriptDinamico();

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

                var diapositivaInput = document.getElementById("diapositivaInput");
                diapositivaInput.value = 'Titulo';
                addTablero();
                var element1 = document.getElementById("GuardarHoja");
                element1.disabled = false;
                //var element2 = document.getElementById("BorrarHoja");
                //element2.disabled = false;

            });
            $(document).on('click', '.CambiarTexto', function() {

                var x = document.getElementById('miTitulo');
                var y = document.getElementById('miTexto');
                var z = document.getElementById('miSubTitulo');
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

            /*
                        $(document).on('click', '.CambiarTexto', function() {
                            var y = document.getElementById('miTexto');
                            if(y){
                                y.innerHTML = y.value;}
                                if(z){
                                z.innerHTML = z.value;}
                            

                        });
                        $(document).on('click', '.CambiarSubtitulo', function() {
                            var z = document.getElementById('miSubTitulo');
                            if(z){
                                z.innerHTML = z.value;}
                            //document.querySelector('#miSubTitulo')?.remove();
                            

                        });*/
            $(document).on('click', '#GuardarHoja', function() {

                if (document.querySelector('#chessboard')) {
                    console.log('El elemento con la clase "tablero" existe.');
                    document.querySelector('#btnObstaculo')?.remove();
                    document.querySelector('#btnMovimiento')?.remove();
                    document.querySelector('#btnOcultarCamino')?.remove();
                    document.querySelector('#btnCamino')?.remove();
                    document.querySelector('#btnPosicionAlfil')?.remove();
                    document.querySelector('#btnPosicionFinal')?.remove();



                    const celdas = document.querySelectorAll('.cell');
                    celdas.forEach(celda => {
                        celda.classList.remove(
                            'movimientoPosible'); // Remover clase CSS de movimientos previos
                    });

                    const contenedorDiv = document.querySelector(".hoja");
                    const botonObstaculo = document.createElement("button");
                    botonObstaculo.textContent = "Iniciar";
                    botonObstaculo.id = "BotonIniciar";
                    botonObstaculo.classList.add("btn", "btn-info", "botonTableroIniciar");
                    if (!document.getElementById('BotonIniciar')) {
                        contenedorDiv.appendChild(botonObstaculo);
                    }
                    var rutaImagen = "{{ asset('img/alfil.jpg') }}";


                }
                document.querySelector('.Cambiar')?.remove();
                document.querySelector('.CambiarSubtitulo')?.remove();
                //document.querySelector('.CambiarTexto')?.remove();
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
                var diapositivaInput = document.getElementById("diapositivaInput");
                var expr = diapositivaInput.value;

                agregarImagen();

                function agregarImagen() {
                    addPlantilla(rutaImagen, contenido, expr);
                }

            });

            $(document).on('click', '#BorrarHoja', function() {

                alert('borradno');
                document.getElementById('hoja').innerHTML = '';
                var contadorInput = document.getElementById('contadorInput');
                contadorInput.value = contadorInput.value - 1;

                var diapoActual = document.querySelector('.onfocus');
                if (diapoActual) {
                    diapoActual.parentNode.removeChild(diapoActual);
                }
                var element2 = document.getElementById("BorrarHoja");
                element2.disabled = true;
            });


        });
    </script>
    <script>
        var outputDiv = document.getElementById('hoja');
        var iterador = 1;
        var contenedor = document.getElementById('c1');

        contenedor.addEventListener('click', function(event) {
            var miniatura = event.target.closest('.miniatura');
            if (miniatura) {
                var element2 = document.getElementById("BorrarHoja");
                element2.disabled = false;
                var divItems = document.getElementsByClassName('miniatura');
                Array.from(divItems).forEach((divItem) => {
                    divItem.classList.remove('onfocus');
                });
                miniatura.classList.toggle("onfocus");
                var diapoActual = document.getElementById('actualInput');

                diapoActual.value = miniatura.querySelector('input.indiceDiapositiva[type="hidden"]').value;
                console.log(diapoActual.value);
                var hiddenInput = miniatura.querySelector('input#oculto[type="hidden"]');
                var hiddenInputValue = hiddenInput.value;
                outputDiv.innerHTML = decodeURIComponent(hiddenInputValue);
                console.log('Valor del hidden input:', decodeURIComponent(hiddenInputValue));
            }
        });
    </script>

</body>

</html>
