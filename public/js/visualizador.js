const container = document.querySelector(".c1");
const cont_hoja = document.querySelector(".hoja");
var autoIncrement = 1;
var numeroDiapositivas = 0;
var numeroMovimientosAlfil = 0;

  
  
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
function mensajeExito() {
    var alfilElement = document.querySelector(".bg-success .alfil");

    // Verificar si el elemento existe
    if (alfilElement) {
        // Mostrar el modal de éxito
        var mensaje = document.getElementById("textoNumeroDePasos");
        mensaje.textContent = `El alfil ha llegado a su objetivo en el tablero después de ${numeroMovimientosAlfil} movimientos.`;
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

var fila = 1;
var columna = 5;

function cargarScriptDinamico() {
    const element1 = document.getElementById("BotonIniciar");
    element1.remove();
    //AGREGAR BOTONES
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

    const divColumna2 = document.querySelector("#columna-1");

    const botonMejorCamino = document.createElement("button");
    botonMejorCamino.textContent = "Habilitar Camino";
    botonMejorCamino.id = "btnCamino";
    botonMejorCamino.classList.add("btn", "btn-primary", "botonTablero");
    divColumna2.appendChild(botonMejorCamino);

    

    // Asignar evento de clic al botón
    botonMejorCamino.addEventListener("click", function () {

        const targetCell = document.querySelector(".bg-success");
        const row = parseInt(targetCell.dataset.row);
        const col = parseInt(targetCell.dataset.col);
        console.log("fila"+row);
        console.log("columna"+col);
        const path = findBestPath(row, col);
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

    

    

    function eliminarCamino() {
        const cells = document.querySelectorAll(".bg-warning");
        cells.forEach((cell) => {
            cell.classList.remove("bg-warning");
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
