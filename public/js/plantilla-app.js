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
    function findBestPath(targetRow, targetCol) {
        const startCell = alfil.parentElement;
        const queue = [];
        const visited = new Set();
        const paths = new Map();
      
        const startNode = { row: parseInt(startCell.dataset.row), col: parseInt(startCell.dataset.col) };
        queue.push(startNode);
        visited.add(`${startNode.row},${startNode.col}`);
        paths.set(`${startNode.row},${startNode.col}`, []);
      
        while (queue.length > 0) {
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
          { row: -1, col: 1 },  // Top-right
          { row: 1, col: -1 },  // Bottom-left
          { row: 1, col: 1 }    // Bottom-right
        ];
      
        const neighbors = [];
      
        for (const direction of directions) {
          const neighborRow = row + direction.row;
          const neighborCol = col + direction.col;
      
          if (isValidCell(neighborRow, neighborCol) && !hasObstacle(neighborRow, neighborCol)) {
            neighbors.push({ neighborRow, neighborCol });
          }
        }
      
        return neighbors;
      }
      
      function isValidCell(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
      }
      
      function hasObstacle(row, col) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        return cell.classList.contains('obstaculo');
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
        path.forEach((step) => {
            console.log("############");
            console.log(step);
          const row = step.neighborRow;
          const col = step.neighborCol;
          console.log(row+" "+col);
          console.log(`[data-row="${row}"][data-col="${col}"]`);
          const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
          console.log("=====================");
          console.log(cell);
          cell.classList.add("bg-warning");
        });
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
