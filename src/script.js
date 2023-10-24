const X_PLAYER = 'x';
const O_PLAYER = 'o';
const TEXT_X_WON = "× WINS!"
const TEXT_O_WON = "𝗢 WINS!"
const TEXT_DRAW = "DRAW, NO WINNER!"
let whosTurn = X_PLAYER;
let myGame = null;
let isGameOver = true;

function startNewGame() {
    myGame = new Game;
        // resetAll
}

class Game {
    constructor() {
        // element = board
        this.level = 3;
        this.endScreen = document.querySelector(".end-screen");
        this.gameBoard = document.querySelector("#gameBoard");
        this.newGameBtn = document.querySelector(".end-screen button");
        this.endScreenText = document.querySelector(".end-screen h2");

        for (let i = 0; i < this.level * this.level; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = i;
            this.gameBoard.appendChild(cell);
        }
        this.cells = document.querySelectorAll(".cell");
        this.cells.forEach(element => {
            element.addEventListener("click", (event) => {
                const cellNo = Number(element.id);
                toggleCell(element);
                if (isGameFinished(this.cells, cellNo)) {
                    isGameOver = true;
                    this.endScreen.classList.toggle("hidden");
                }
                switchTurn();
            }, {once:true});
        });
        this.newGameBtn.addEventListener("click", (e) => {
            if (isGameOver) {
                this.endScreen.classList.toggle("hidden");
                this.gameBoard.innerHTML = "";
                isGameOver = false;
                startNewGame();
            }
        });
    }
}

myGame = new Game;

/* const restartGame = () => {
    const endGame = document.querySelector(".endgame");
    endGame.classList.toggle("hidden");
}
 */
const doesCellMatch = (cell) => {
    return cell.classList.contains(whosTurn);
};

// these 2 functions search if all 2 adjacent cells match with the current player symbol (works for bigger boards too (5x5 7x7 ...))
const hasHorizontalWin = (array, cellNo) => {
    const lvl = myGame.level;
    for (let row = 0; row < lvl; row++) {
        if (row === Math.floor(cellNo / lvl)) {
            //check if just-clicked cell is of column 1 so you can search 2 to the right and not go beyond the row.
            const clickColumn = cellNo % lvl;
            //check 2 right
            if (clickColumn === 0 && array[cellNo + 2] && doesCellMatch(array[cellNo + 2]) && doesCellMatch(array[cellNo + 1])) {
                console.log("this", clickColumn, cellNo, array[cellNo + 2], array[cellNo + 1]);
                return true;
            }
            // check 2 left
            else if (clickColumn === 2 && array[cellNo - 2] && doesCellMatch(array[cellNo - 2]) && doesCellMatch(array[cellNo - 1])) {
                return true;
            }
            //check 1 left and 1 right
            else if (clickColumn === 1 && array[cellNo - 1] && array[cellNo + 1] && doesCellMatch(array[cellNo - 1]) && doesCellMatch(array[cellNo + 1])) {
                return true;
            }
            else {
                return false;
            }
        }
    }
};

const hasVerticalWin = (array, cellNo) => {
    const lvl = myGame.level;
    for (let col = 0; col < lvl; col++) {
        if (col === cellNo % lvl) {      
            // const clickRow = cellNo / lvl;
            if (array[cellNo + lvl * 2] && doesCellMatch(array[cellNo + lvl * 2]) && doesCellMatch(array[cellNo + lvl])) {
                return true;
            }
            else if (array[cellNo - lvl * 2] && doesCellMatch(array[cellNo - lvl * 2]) && doesCellMatch(array[cellNo - lvl])) {
                return true;
            }
            else if (array[cellNo - lvl] && array[cellNo + lvl] && doesCellMatch(array[cellNo - lvl]) && doesCellMatch(array[cellNo + lvl])) {
                return true;
            }
            else {
                return false;
            }
        }
    }
};

const hasDiagonalWin = (array, cellNo) => {
    const nextDnRight = myGame.level + 1;
    const nextDnLeft = myGame.level - 1;
    // const lvlStepUp = myGame.level + 1;
    // const lvlStepDn = myGame.level - 1;

    //check if the cells are match with symbol of current player
    const isCell0 = doesCellMatch(array[0]);
    const isCell2 = doesCellMatch(array[2]);
    const isCell4 = doesCellMatch(array[4]);
    const isCell6 = doesCellMatch(array[6]);
    const isCell8 = doesCellMatch(array[8]);

    // check if the cells in 2 diagonal directions are the same
    if (isCell0 && isCell4 && isCell8) {
        return true;
    }
    else if (isCell2 && isCell4 && isCell6) {
        return true;
    }
    else
        return false;
};

const setWinnerText = () => {
    if (whosTurn === X_PLAYER) {
        console.log(TEXT_X_WON);
        myGame.endScreenText.innerHTML = TEXT_X_WON;
    }
    else if (whosTurn === O_PLAYER) {
        console.log(TEXT_O_WON);
        myGame.endScreenText.innerHTML = TEXT_O_WON;
    }
}

const allCellsFull = (array) => {
    const len = array.length;
    for (let i = 0; i < len; i++) {
        console.log("allcells full", i, (!array[i].classList.contains(X_PLAYER) || !array[i].classList.contains(O_PLAYER)));
        if (!array[i].classList.contains(X_PLAYER) && !array[i].classList.contains(O_PLAYER)) {
            return false;
        }
    }
    return true;
};

const isGameFinished = (array, cellNo) => {
    if (hasHorizontalWin(array, cellNo)) {
        setWinnerText();
        console.log("HORIZONTAL WIN - - - - ");
        return true;
    } 
    else if (hasVerticalWin(array, cellNo)) {
        setWinnerText();
        console.log("VERTICAL WIN | | | | ");
        return true;
    }
    else if (hasDiagonalWin(array, cellNo)) {
        setWinnerText();
        console.log("DIAGONAL WIN / / / / / ");
        return true;
    }
    else if (allCellsFull(array)) {
        console.log(TEXT_DRAW);
        myGame.endScreenText.innerHTML = TEXT_DRAW;
        return true;
    }
    else {
        return false;
    }
}

const switchTurn = () => {
    if (whosTurn === X_PLAYER) {
        whosTurn = O_PLAYER;
    }
    else {
        whosTurn = X_PLAYER;
    }
}

const toggleCell = (cell) => {
    //console.log("clicked", cell);
    cell.classList.add(whosTurn);
}