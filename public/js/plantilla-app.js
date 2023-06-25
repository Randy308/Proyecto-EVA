const container = document.querySelector(".c1");
const cont_hoja = document.querySelector(".hoja");
var autoIncrement = 1;

function addPlantilla(imagenRuta, contenido) {
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
        var mi = document.createElement("input");
        mi.classList.add("miTitulo");
        mi.type = "text";
        mi.value = "Titulo";
        div.appendChild(mi);
        addtitulo();
    } else {
        var imagen = document.createElement("img");
        imagen.classList.add("imagen");
        // Paso 2: Establecer la ruta de la imagen
        imagen.src = imagenRuta;
        div.appendChild(imagen);
        container.appendChild(div);
    }
}
function addtitulo() {
    var element1 = document.getElementById("GuardarHoja");
    element1.disabled = false;
    cont_hoja.innerHTML = "";
    const div = document.createElement("div");
    div.id = "diapositiva";
    var mi = document.createElement("textarea");
    mi.classList.add("miTitulo",'tituloDiapositiva');
    mi.id = "miTitulo";
    mi.type = "text";
    mi.textContent = "Titulo";
    div.appendChild(mi);
    var boton = document.createElement("input");
    boton.classList.add("Cambiar");
    boton.type = "button";
    boton.value = "Cambiar Texto";
    div.appendChild(boton);
    cont_hoja.appendChild(div);
}
function addTablero() {
    cont_hoja.innerHTML = "";
    const div = document.createElement("div");
    div.id = "chessboard";
    cont_hoja.appendChild(div);
    prueba();
}

function prueba() {
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

    //AGREGAR BOTONES
    const botonObstaculo = document.createElement("button");
    botonObstaculo.textContent = "Agregar Obstaculo";
    botonObstaculo.id = "Obstaculo";
    botonObstaculo.classList.add("btn", "btn-primary", "botonTablero");
    cont_hoja.appendChild(botonObstaculo);

    // Asignar evento de clic al botón
    botonObstaculo.addEventListener("click", function () {
        console.log("¡Has hecho clic en el botón obstaculo!");
        botonObstaculo.disabled = true;
        botonMovimiento.disabled = false;
        eliminarMovimiento();
        agregarEventoPieza();
    });

    const botonMovimiento = document.createElement("button");
    botonMovimiento.textContent = "Habilitar Movimiento";
    botonMovimiento.id = "Movimiento";
    botonMovimiento.classList.add("btn", "btn-primary", "botonTablero");
    cont_hoja.appendChild(botonMovimiento);
    botonMovimiento.disabled = true;

    // Asignar evento de clic al botón
    botonMovimiento.addEventListener("click", function () {
        console.log("¡Has hecho clic en el botón movimiento!");
        botonMovimiento.disabled = true;
        botonObstaculo.disabled = false;
        eliminarEventoPieza();
        agregarMovimiento();
    });

    const botonMejorCamino = document.createElement("button");
    botonMejorCamino.textContent = "Habilitar Camino";
    botonMejorCamino.id = "Camino";
    botonMejorCamino.classList.add("btn", "btn-primary", "botonTablero");
    cont_hoja.appendChild(botonMejorCamino);
    //botonMejorCamino.disabled = true;

    // Asignar evento de clic al botón
    botonMejorCamino.addEventListener("click", function () {
        console.log("¡Has hecho clic en el botón movimiento!");
        console.log(findBestPath(7,7));
        const path = findBestPath(7, 7);

        if (path !== null) {
            // Resaltar el camino en el tablero
            highlightPath(path);
        } else {
            console.log("No se encontró un camino válido.");
        }

    });

    // Crear el alfil en la posición inicial
    const initialCell = document.querySelector(`[data-row="0"][data-col="2"]`);
    const alfil = document.createElement("div");
    alfil.setAttribute("id", "alfil");
    alfil.classList.add("piece");
    alfil.textContent = "♗"; // Unicode para el símbolo del alfil
    initialCell.appendChild(alfil);

    function agregarPieza(row, col, symbol, nombre) {
        const cell = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
        const piece = document.createElement("div");
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
        agregarPieza(atributos[1].value, atributos[2].value, "♙", "peon");
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

                if (verificarCeldaOcupada(divPadre)) {
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

    function verificarCeldaOcupada(contenedorPadre) {
        const contenedorHijo = document.querySelectorAll(".peon");
        resultado = false;
        contenedorHijo.forEach((contenedor) => {
            if (contenedorPadre.contains(contenedor)) {
                resultado = true;
            }
        });

        return resultado;
    }

    
    //mejor camino
    function findBestPath(destRow, destCol) {
        console.log(destRow);
        console.log(destCol);
        const queue = [];
        const visited = new Set();
        const startCell = alfil.parentElement;
        const path = {};
        path[startCell.dataset.row + "-" + startCell.dataset.col] = null;
      
        queue.push(startCell);
        visited.add(startCell);
      
        while (queue.length > 0) {
          const currentCell = queue.shift();
      
          if (
            parseInt(currentCell.dataset.row) === destRow &&
            parseInt(currentCell.dataset.col) === destCol
          ) {
            return reconstructPath(path, currentCell);
          }
      
          const neighbors = getValidNeighbors(currentCell);
      
          for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
              queue.push(neighbor);
              visited.add(neighbor);
              path[neighbor.dataset.row + "-" + neighbor.dataset.col] = currentCell;
            }
          }
        }
      
        return null;
    }
      
    function getValidNeighbors(cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const neighbors = [];
      
        // Movimientos del alfil: diagonales
        for (let i = -7; i <= 7; i++) {
          if (i !== 0) {
            const newRow = row + i;
            const newCol = col + i;
      
            if (isValidCell(newRow, newCol)) {
              const neighbor = document.querySelector(
                `[data-row="${newRow}"][data-col="${newCol}"]`
              );
              neighbors.push(neighbor);
            }
      
            const newRow2 = row + i;
            const newCol2 = col - i;
      
            if (isValidCell(newRow2, newCol2)) {
              const neighbor2 = document.querySelector(
                `[data-row="${newRow2}"][data-col="${newCol2}"]`
              );
              neighbors.push(neighbor2);
            }
          }
        }
      
        return neighbors;
    }
      
    function isValidCell(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }
      
    function reconstructPath(path, destination) {
        const pathCells = [];
        let currentCell = destination;
      
        while (currentCell !== null) {
          pathCells.push(currentCell);
          currentCell = path[currentCell.dataset.row + "-" + currentCell.dataset.col];
        }
      
        pathCells.reverse();
        highlightPath(pathCells);
        return pathCells;
    }
    
    function highlightPath(cells) {
        const highlightedClass = "highlighted";
      
        // Remover la clase de resaltado de todas las celdas
        const allCells = document.querySelectorAll(".cell");
        allCells.forEach((cell) => {
          cell.classList.remove(highlightedClass);
          cell.classList.remove("bg-danger");
        });
      
        // Agregar la clase de resaltado a las celdas en el camino
        cells.forEach((cell) => {
          cell.classList.add(highlightedClass);
          cell.classList.add("bg-danger");
        });
      
        // Agregar la clase de resaltado a las celdas intermedias en el camino
        for (let i = 0; i < cells.length - 1; i++) {
          const currentCell = cells[i];
          const nextCell = cells[i + 1];
          const rowDiff = parseInt(nextCell.dataset.row) - parseInt(currentCell.dataset.row);
          const colDiff = parseInt(nextCell.dataset.col) - parseInt(currentCell.dataset.col);
          const rowDirection = rowDiff > 0 ? 1 : -1;
          const colDirection = colDiff > 0 ? 1 : -1;
      
          let currentRow = parseInt(currentCell.dataset.row) + rowDirection;
          let currentCol = parseInt(currentCell.dataset.col) + colDirection;
      
          while (
            currentRow !== parseInt(nextCell.dataset.row) &&
            currentCol !== parseInt(nextCell.dataset.col)
          ) {
            const intermediateCell = document.querySelector(
              `[data-row="${currentRow}"][data-col="${currentCol}"]`
            );
            intermediateCell.classList.add(highlightedClass);
            intermediateCell.classList.add("bg-danger");
            currentRow += rowDirection;
            currentCol += colDirection;
          }
        }
    }
      
      
}

function botonObstaculoDinamico() {
    const element1 = document.getElementById("BotonIniciar");
    element1.remove();
    //AGREGAR BOTONES
    const botonObstaculo = document.createElement("button");
    botonObstaculo.textContent = "Agregar Obstaculo";
    botonObstaculo.id = "Obstaculo";
    botonObstaculo.classList.add("btn", "btn-primary", "botonTablero");
    cont_hoja.appendChild(botonObstaculo);

    // Asignar evento de clic al botón
    botonObstaculo.addEventListener("click", function () {
        console.log("¡Has hecho clic en el botón obstaculo!");
        botonObstaculo.disabled = true;
        botonMovimiento.disabled = false;
        eliminarMovimiento();
        agregarEventoPieza();
    });

    const botonMovimiento = document.createElement("button");
    botonMovimiento.textContent = "Habilitar Movimiento";
    botonMovimiento.id = "Movimiento";
    botonMovimiento.classList.add("btn", "btn-primary", "botonTablero");
    cont_hoja.appendChild(botonMovimiento);
    botonMovimiento.disabled = true;
    // Asignar evento de clic al botón
    botonMovimiento.addEventListener("click", function () {
        console.log("¡Has hecho clic en el botón movimiento!");
        botonMovimiento.disabled = true;
        botonObstaculo.disabled = false;
        eliminarEventoPieza();
        agregarMovimiento();
    });

    // Crear el alfil en la posición inicial

    function agregarPieza(row, col, symbol, nombre) {
        const cell = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
        const piece = document.createElement("div");
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

        // Obtener los atributos del div
        const atributos = div.attributes;
        agregarPieza(atributos[1].value, atributos[2].value, "♙", "peon");
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

                if (verificarCeldaOcupada(divPadre)) {
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

    function verificarCeldaOcupada(contenedorPadre) {
        const contenedorHijo = document.querySelectorAll(".peon");
        resultado = false;
        contenedorHijo.forEach((contenedor) => {
            if (contenedorPadre.contains(contenedor)) {
                resultado = true;
            }
        });

        return resultado;
    }

    
      
}
