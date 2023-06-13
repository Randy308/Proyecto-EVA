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
  
    // Crear el alfil en la posición inicial
    const initialCell = document.querySelector(`[data-row="0"][data-col="2"]`);
    const alfil = document.createElement('div');
    alfil.classList.add('piece');
    alfil.textContent = '♗'; // Unicode para el símbolo del alfil
    initialCell.appendChild(alfil);
  
    // Agregar el evento de click a las celdas del tablero
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', moveAlfil);
    });
  
    function moveAlfil() {
        const clickedCell = this;
        const alfilCell = alfil.parentElement;
  
        // Verificar si el movimiento es válido
        const rowDiff = Math.abs(clickedCell.dataset.row - alfilCell.dataset.row);
        const colDiff = Math.abs(clickedCell.dataset.col - alfilCell.dataset.col);
  
        if (rowDiff === colDiff && rowDiff !== 0) {
            // Remover el alfil de la celda actual y agregarlo a la celda seleccionada
            clickedCell.appendChild(alfil);
        }
    }
  });
  