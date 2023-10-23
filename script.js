const X_PLAYER = 'x';
const O_PLAYER = 'o';
whosTurn = X_PLAYER;
class Game {
    constructor() {
        // element = board
        this.cells = document.querySelectorAll(".cell");
        this.cells.forEach(element => {
            element.addEventListener("click", (event) => {
                toggleCell(element);
                switchTurn();
            }, {once:true});
        });
    }

    isGameFinished = () => {
        array.forEach(element => {
            
        });
    };
}

const myGame = new Game;
// resetAll

function switchTurn() {
    if (whosTurn === X_PLAYER) {
        whosTurn = O_PLAYER;
    }
    else {
        whosTurn = X_PLAYER;
    }
}

function toggleCell(cell) {
    console.log("clicked", cell);
    cell.classList.add(whosTurn);
}