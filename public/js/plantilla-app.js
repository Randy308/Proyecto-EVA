const container = document.querySelector(".c1");
const cont_hoja = document.querySelector(".hoja");
var autoIncrement = 1;

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

    if (typeof imagenRuta === "undefined") {
        

        switch (expr) {
            case "Titulo":
                console.log("add Titulo.");
                var mi = document.createElement("span");
                mi.classList.add("miniaturaTitulo");
                //mi.type = "text";
                mi.textContent  = "Titulo";
                div.appendChild(mi);
                //addtitulo();
                break;
            case "Titulo y subtitulo":
                console.log("Titulo y subtitulo");
            case "Subtitulo y texto":
                console.log("add Subtitulo y texto");
                // Expected output: "Mangoes and papayas are $2.79 a pound."
                break;
            case "Texto":
                console.log("add Texto");
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
function limpiarBotonesAuxiliares(){
    document.querySelector('.Cambiar')?.remove();
    document.querySelector('.CambiarTexto')?.remove();
    document.querySelector('.CambiarSubtitulo')?.remove();
}
function addTexto() {
    //var hojaTexto = document.createElement('div');
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
    //var hojaTexto = document.createElement('div');
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
    var botonSubtitulo = document.createElement("input");
    botonSubtitulo.classList.add("CambiarSubtitulo");
    botonSubtitulo.type = "button";
    botonSubtitulo.value = "Cambiar Subtitulo";
    
    containerc3.appendChild(botonSubtitulo);
    cont_hoja.appendChild(div);
}

function addtituloSubtitulo() {
    //var hojaTexto = document.createElement('div');
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
    var miSubTitulo = document.createElement("textarea");
    miSubTitulo.classList.add("miSubTitulo", "subtituloDiapositiva");
    miSubTitulo.id = "miSubTitulo";
    miSubTitulo.type = "text";
    miSubTitulo.textContent = "Subtítulo";
    
    div.appendChild(mi);
    div.appendChild(miSubTitulo);
    const containerc3 = document.querySelector(".c3");
    var boton = document.createElement("input");
    boton.classList.add("Cambiar");
    boton.type = "button";
    boton.value = "Cambiar Titulo";
    var botonSubtitulo = document.createElement("input");
    botonSubtitulo.classList.add("CambiarSubtitulo");
    botonSubtitulo.type = "button";
    botonSubtitulo.value = "Cambiar Subtitulo";
    containerc3.appendChild(boton);
    containerc3.appendChild(botonSubtitulo);
    cont_hoja.appendChild(div);
}
function addtitulo() {
    //var hojaTexto = document.createElement('div');
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
    var boton = document.createElement("input");
    boton.classList.add("Cambiar");
    boton.type = "button";
    boton.value = "Cambiar Titulo";
    containerc3.appendChild(boton);
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
                //const divHijo = document.querySelectorAll('.peon'); // Obtén una referencia al div hijo

                if (verificarCeldaOcupada(divPadre, ".peon")) {
                    console.log(
                        "El div hijo está contenido dentro del div padre."
                    );
                } else {
                    console.log(
                        "El div hijo no está contenido dentro del div padre."
                    );
                    clickedCell.appendChild(alfil);
                }
            } else {
                console.log("Hay un obstáculo en el camino del alfil.");
            }
        }
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
                //const divHijo = document.querySelectorAll('.peon'); // Obtén una referencia al div hijo

                if (verificarCeldaOcupada(divPadre, ".peon")) {
                    console.log(
                        "El div hijo está contenido dentro del div padre."
                    );
                } else {
                    console.log(
                        "El div hijo no está contenido dentro del div padre."
                    );
                    clickedCell.appendChild(alfil);
                }
            } else {
                console.log("Hay un obstáculo en el camino del alfil.");
            }
        }
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
