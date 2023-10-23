const X_PLAYER = 'x';
const O_PLAYER = 'o';
class Game {
    constructor() {
        // element = board
        // element cells queryAll [9items]
        this.cells = document.querySelectorAll(".cell");
        this.whosTurn = 'x'; 
        cells.forEach(element => {
            addEventListener("click", (event) => {
                toggleCell(this);
            }, {once:true});
        });
    }

    isGameFinished = () => {
        array.forEach(element => {
            
        });
    };
}

const myGame = new Game;

const toggleCell = (cell) => {
    console.log("clicked", cell);
    cell.classList.add(whosTurn);
}