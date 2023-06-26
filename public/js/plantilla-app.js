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
    mi.classList.add("miTitulo", "tituloDiapositiva");
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
    letras.forEach(letra => {
        const letraElement = document.createElement("div");
        letraElement.textContent = letra;
        letrasContainer.appendChild(letraElement);
    });
    chessboard.appendChild(letrasContainer);

    // Agregar números en el lateral derecho
    const numerosContainer = document.createElement("div");
    numerosContainer.classList.add("notacion-numeros");
    numeros.forEach(numero => {
        const numeroElement = document.createElement("div");
        numeroElement.textContent = numero;
        numerosContainer.appendChild(numeroElement);
    });
    chessboard.appendChild(numerosContainer);
}

function agregarAlfil() {
    // Crear el alfil en la posición inicial
    const initialCell = document.querySelector(`[data-row="0"][data-col="2"]`);
    const alfil = document.createElement("div");
    alfil.setAttribute("id", "alfil");
    alfil.classList.add("piece");
    alfil.draggable = true;
    alfil.textContent = "♗"; // Unicode para el símbolo del alfil
    initialCell.appendChild(alfil);
}
function añadirEventoAlfil(){

    const alfil = document.getElementById('alfil');
    alfil.addEventListener("click", function () {
        console.log("¡Has hecho clic sobre el alfil");
        mostrarMovimientosAlfil();


    });
}
function eliminarPosiblesMovimientos(){
    const celdas = document.querySelectorAll('.cell');
    // Recorrer todas las celdas y verificar si son posibles movimientos del alfil
    celdas.forEach(celda => {
      celda.classList.remove('movimientoPosible'); // Remover clase CSS de movimientos previos
      
    });
}
function mostrarMovimientosAlfil() {
    const alfilCell = alfil.parentElement;
  
    // Obtener la posición del alfil
    const filaAlfil = parseInt(alfilCell.dataset.row);
    const columnaAlfil = parseInt(alfilCell.dataset.col);
  
    // Obtener todas las celdas del tablero
    const celdas = document.querySelectorAll('.cell');
  
    // Recorrer todas las celdas y verificar si son posibles movimientos del alfil
    celdas.forEach(celda => {
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
              console.log("El div está vacío");
              celda.classList.add('movimientoPosible');
          } else {
              console.log("El div no está vacío");
          }
          
        } else {
          celda.classList.remove('movimientoPosible'); // Remover clase CSS de movimientos previos
        }
      } else {
        celda.classList.remove('movimientoPosible'); // Remover clase CSS de movimientos previos
      }
    });
  }

  function hasObstacleInPath(clickedCell) {
    const alfilCell = alfil.parentElement;
    const rowDiff = parseInt(clickedCell.dataset.row) - parseInt(alfilCell.dataset.row);
    const colDiff = parseInt(clickedCell.dataset.col) - parseInt(alfilCell.dataset.col);
    const rowDirection = rowDiff > 0 ? 1 : -1;
    const colDirection = colDiff > 0 ? 1 : -1;
  
    let currentRow = parseInt(alfilCell.dataset.row) + rowDirection;
    let currentCol = parseInt(alfilCell.dataset.col) + colDirection;
  
    while (currentRow !== parseInt(clickedCell.dataset.row) && currentCol !== parseInt(clickedCell.dataset.col)) {
      const cell = document.querySelector(`[data-row="${currentRow}"][data-col="${currentCol}"]`);
      if (cell.hasChildNodes()) {
        return true; // Hay un obstáculo en el camino
      }
      currentRow += rowDirection;
      currentCol += colDirection;
    }
  
    return false; // No hay obstáculos en el camino
  }
function prueba() {
    dibujarTablero();
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
    agregarAlfil();
    añadirEventoAlfil();
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
        const contenedorHijo = document.querySelectorAll(".peon");
        const atributos = div.attributes;
        var contenido = div.innerHTML.trim();
        if (contenido === "") {
            console.log("El div está vacío");
            agregarPieza(atributos[1].value, atributos[2].value, "♙", "peon");
        } else {
            console.log("El div no está vacío");
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
        mostrarMovimientosAlfil();
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
    añadirEventoAlfil();
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
        const atributos = div.attributes;
        var contenido = div.innerHTML.trim();
        if (contenido === "") {
            console.log("El div está vacío");
            agregarPieza(atributos[1].value, atributos[2].value, "♙", "peon");
        } else {
            console.log("El div no está vacío");
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
        mostrarMovimientosAlfil();
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
