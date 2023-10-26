console.log("game.js OK");
class Game {
    constructor() {
        this.level = 3;
        this.gameBoard = document.querySelector("#gameBoard");
        this.gameBoard.classList.add("xturn");
        this.turnTextElement = document.querySelector(".turn-text span");
        this.whosTurn = X_PLAYER;
        this.player2 = null;
    }

    populateGame() {
        for (let i = 0; i < this.level * this.level; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = i;
            this.gameBoard.appendChild(cell);
        }
        this.addClickHandlers();
    }

    onClickActions(element, cells) {
        const cellNo = Number(element.id);
        toggleCell(element);
        // console.log("free cells: ", document.querySelectorAll(".cell:not(.x):not(.o)"));
        if (isGameFinished(cells, cellNo)) {
            isGameOver = true;
            msgScreen.classList.toggle("hidden");
            return ;
        }
        switchTurn();
    }

    addClickHandlers() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(element => {
            element.addEventListener("click", (event) => {
                this.onClickActions(element, cells);
                if (myGame.player2 === AI && myGame.whosTurn === O_PLAYER) {
                    // block cells from user actions while AI is playing
                    myGame.gameBoard.classList.add("blocked");
                    // Choose random empty cell
                    const freeCells = document.querySelectorAll(".cell:not(.x):not(.o)");
                    const AInbr = Math.floor(Math.random() * freeCells.length);
                    const AIchosenCell = cells[freeCells[AInbr].id];
                    setTimeout(() => {
                        this.onClickActions(AIchosenCell, cells);
                        myGame.gameBoard.classList.remove("blocked");
                    }, 1000);
                    // setTimeout 1s
                        // toggle the cell, 
                        // check if gameOver
                        // switchTurn
                }
            }, {once:true});
        });
    }

}

const doesCellMatch = (cell) => {
    return cell.classList.contains(myGame.whosTurn);
};

/* const AImove = () => {
    const freeCells = document.querySelectorAll(".cell:not(.x):not(.o)");
    const AIchosenCellNo = Math.floor(Math.random() * freeCells.length);
} */

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
    if (myGame.whosTurn === X_PLAYER) {
        console.log(TEXT_X_WON);
        msgText.innerHTML = TEXT_X_WON;
    }
    else if (myGame.whosTurn === O_PLAYER) {
        console.log(TEXT_O_WON);
        msgText.innerHTML = TEXT_O_WON;
    }
}

const allCellsFull = (array) => {
    const len = array.length;
    for (let i = 0; i < len; i++) {
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
        msgText.innerHTML = TEXT_DRAW;
        return true;
    }
    else {
        return false;
    }
}

const switchTurn = () => {
    if (myGame.whosTurn === X_PLAYER) {
        myGame.whosTurn = O_PLAYER;
        myGame.gameBoard.classList.add("oturn");
        myGame.gameBoard.classList.remove("xturn");
        myGame.turnTextElement.innerHTML = O_SYMBOL;
    }
    else {
        myGame.whosTurn = X_PLAYER;
        myGame.gameBoard.classList.add("xturn");
        myGame.gameBoard.classList.remove("oturn");
        myGame.turnTextElement.innerHTML = X_SYMBOL;
    }
}

const toggleCell = (cell) => {
    cell.classList.add(myGame.whosTurn);
}