document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');

    // Crear las celdas del tablero
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
            cell.dataset.row = row;
            cell.dataset.col = col;
            chessboard.appendChild(cell);
        }
    }

    //AGREGAR BOTONES
    const botonObstaculo = document.createElement("button");
    botonObstaculo.textContent = "Agregar Obstaculo";
    botonObstaculo.classList.add('btn','btn-primary');
    document.body.appendChild(botonObstaculo);

    // Asignar evento de clic al botón
    botonObstaculo.addEventListener("click", function() {
        console.log("¡Has hecho clic en el botón!");
        //agregarPieza(2, 4, '♖','peon');
        eliminarMovimiento();
        agregarEventoPieza();
    });

    const botonMovimiento = document.createElement("button");
    botonMovimiento.textContent = "Habilitar Movimiento";
    botonMovimiento.classList.add('btn','btn-primary');
    document.body.appendChild(botonMovimiento);

    // Asignar evento de clic al botón
    botonMovimiento.addEventListener("click", function() {
        console.log("¡Has hecho clic en el botón!");
        //agregarPieza(2, 4, '♖','peon');
        eliminarEventoPieza();
        agregarMovimiento();
    });

    // Crear el alfil en la posición inicial
    const initialCell = document.querySelector(`[data-row="0"][data-col="2"]`);
    const alfil = document.createElement('div');
    alfil.setAttribute("id", "alfil");
    alfil.classList.add('piece');
    alfil.textContent = '♗'; // Unicode para el símbolo del alfil
    initialCell.appendChild(alfil);

    function agregarPieza(row, col, symbol, nombre) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const piece = document.createElement('div');
        piece.classList.add('piece',nombre);
        piece.textContent = symbol;
        cell.appendChild(piece);
    }

    // Agregar el evento de click a las celdas del tablero
    

    function agregarMovimiento(){
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', moveAlfil);
        });
    }

    function eliminarMovimiento(){
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.removeEventListener('click', moveAlfil);
        });
    }

    function agregarEventoPieza(){
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', agregarCelda);
        });
    }

    function eliminarEventoPieza(){
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.removeEventListener('click', agregarCelda);
        });
    }

    function agregarCelda(){
        const clickedCell = this;
        const div = clickedCell;

        // Obtener los atributos del div
        const atributos = div.attributes;
        agregarPieza(atributos[1].value, atributos[2].value, '♖','peon');
    }

    /*function moveAlfil() {
        const clickedCell = this;
        console.log(clickedCell);
        const alfilCell = alfil.parentElement;

        // Verificar si el movimiento es válido
        const rowDiff = Math.abs(clickedCell.dataset.row - alfilCell.dataset.row);
        const colDiff = Math.abs(clickedCell.dataset.col - alfilCell.dataset.col);

        if (rowDiff === colDiff && rowDiff !== 0) {
            // Remover el alfil de la celda actual y agregarlo a la celda seleccionada
            const divPadre = clickedCell; // Obtén una referencia al div padre
            const divHijo = document.querySelector('.peon'); // Obtén una referencia al div hijo
            console.log(divHijo);
            if (divPadre.contains(divHijo)) {
                console.log('El div hijo está contenido dentro del div padre.');
            } else {
                console.log('El div hijo no está contenido dentro del div padre.');
                clickedCell.appendChild(alfil);
            }
        }
    }*/
    agregarMovimiento();

    function moveAlfil() {
        const clickedCell = this;
        const alfilCell = alfil.parentElement;

        // Verificar si el movimiento es válido
        const rowDiff = Math.abs(clickedCell.dataset.row - alfilCell.dataset.row);
        const colDiff = Math.abs(clickedCell.dataset.col - alfilCell.dataset.col);

        if (rowDiff === colDiff && rowDiff !== 0) {
            // Verificar si hay obstáculos en el camino
            if (!hasObstacleInPath(clickedCell)) {
                // Remover el alfil de la celda actual y agregarlo a la celda seleccionada
                const divPadre = clickedCell; // Obtén una referencia al div padre
                //const divHijo = document.querySelectorAll('.peon'); // Obtén una referencia al div hijo
                
                if (verificarCeldaOcupada(divPadre)) {
                    console.log('El div hijo está contenido dentro del div padre.');
                } else {
                    console.log('El div hijo no está contenido dentro del div padre.');
                    clickedCell.appendChild(alfil);
                }
            } else {
                console.log('Hay un obstáculo en el camino del alfil.');
            }
        }
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
                return true;
            }
            currentRow += rowDirection;
            currentCol += colDirection;
        }

        return false;
    }

    function verificarCeldaOcupada(contenedorPadre){
        const contenedorHijo = document.querySelectorAll('.peon');
        resultado = false;
        contenedorHijo.forEach(contenedor => {
            if (contenedorPadre.contains(contenedor)) {
                resultado = true;
            }
        });

        return resultado;
    }
});
