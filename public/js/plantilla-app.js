
const container = document.querySelector(".c1");
const cont_hoja = document.querySelector(".hoja");
function addPlantilla(){
    const div = document.createElement("div");
    div.classList.add("miniatura");
    container.appendChild(div);
}

function addTablero(){
    cont_hoja.innerHTML = "";
    const div = document.createElement("div");
    div.id = 'chessboard';
    cont_hoja.appendChild(div);

}