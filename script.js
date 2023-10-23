const X_PLAYER = 'x';
const O_PLAYER = 'o';
let whosTurn = X_PLAYER;
class Game {
    constructor() {
        // element = board
        this.level = 3;
        for (let i = 0; i < this.level * this.level; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = i;
            document.querySelector("#gameBoard").appendChild(cell);
        }

        this.cells = document.querySelectorAll(".cell");
        this.cells.forEach(element => {
            element.addEventListener("click", (event) => {
                const cellNo = Number(element.id);
                toggleCell(element);
                checkIfFinished(this.cells, cellNo);
                switchTurn();
            }, {once:true});
        });
    }

    isGameFinished = () => {
        array.forEach(element => {
            
        });
    };
}

const hasHorizontalWin = (array, cellNo) => {
    const lvl = myGame.level;
    for (let row = 0; row < lvl; row++) {
        if (row === Math.floor(cellNo / lvl)) {
            if (array[cellNo + 2] && array[cellNo + 2].classList.contains(whosTurn) && array[cellNo + 1].classList.contains(whosTurn)) {
                return true;
            }
            else if (array[cellNo - 2] && array[cellNo - 2].classList.contains(whosTurn) && array[cellNo - 1].classList.contains(whosTurn)) {
                return true;
            }
            else if (array[cellNo - 1] && array[cellNo + 1] && array[cellNo - 1].classList.contains(whosTurn) && array[cellNo + 1].classList.contains(whosTurn)) {
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
            const clickCol = cellNo % lvl;
            if (array[cellNo + lvl * 2] && array[cellNo + lvl * 2].classList.contains(whosTurn) && array[cellNo + lvl].classList.contains(whosTurn)) {
                return true;
            }
            else if (array[cellNo - lvl * 2] && array[cellNo - lvl * 2].classList.contains(whosTurn) && array[cellNo - lvl].classList.contains(whosTurn)) {
                return true;
            }
            else if (array[cellNo - lvl] && array[cellNo + lvl] && array[cellNo - lvl].classList.contains(whosTurn) && array[cellNo + lvl].classList.contains(whosTurn)) {
                return true;
            }
            else {
                return false;
            }
        }
    }
};
const hasDiagonalWin = (array, cellNo) => {
    const lvlStepUp = myGame.level + 1;
    const lvlStepDn = myGame.level - 1;
    if (array[cellNo + 2 * lvlStepUp] && array[cellNo + 2 * lvlStepUp].classList.contains(whosTurn) && array[cellNo + lvlStepUp].classList.contains(whosTurn)) {
        return true;
    }
    else if (array[cellNo - 2 * lvlStepUp] && array[cellNo - 2 * lvlStepUp].classList.contains(whosTurn) && array[cellNo - lvlStepUp].classList.contains(whosTurn)) {
        return true;
    }
    else if (array[cellNo - lvlStepUp] && array[cellNo + lvlStepUp] && array[cellNo - lvlStepUp].classList.contains(whosTurn) && array[cellNo + lvlStepUp].classList.contains(whosTurn)) {
        return true;
    }
    if (array[cellNo + 2 * lvlStepDn] && array[cellNo + 2 * lvlStepDn].classList.contains(whosTurn) && array[cellNo + lvlStepDn].classList.contains(whosTurn)) {
        return true;
    }
    else if (array[cellNo - 2 * lvlStepDn] && array[cellNo - 2 * lvlStepDn].classList.contains(whosTurn) && array[cellNo - lvlStepDn].classList.contains(whosTurn)) {
        return true;
    }
    else if (array[cellNo - lvlStepDn] && array[cellNo - lvlStepDn].classList.contains(whosTurn) && array[cellNo + lvlStepDn].classList.contains(whosTurn)) {
        return true;
    }
};


function checkIfFinished(array, cellNo) {
    if (hasHorizontalWin(array, cellNo)) {
        console.log("HORIZONTAL WIN - - - - ");
        return (true);
    } 
    if (hasVerticalWin(array, cellNo)) {
        console.log("VERTICAL WIN | | | | ");
        return (true);
    }
    if (hasDiagonalWin(array, cellNo)) {
        console.log("DIAGONAL WIN / / / / / ");
        return true;
    }
    // ELSE IF ALL CELLS ARE TAKEN
    /* else if ( 1 ) {
            // DRAFT
    }
    else {
        // GAME CONTINUES
        return false;
    } */
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
    //console.log("clicked", cell);
    cell.classList.add(whosTurn);
}