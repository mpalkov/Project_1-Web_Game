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

const doesCellMatch = (cell) => {
    return cell.classList.contains(whosTurn);
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



const checkIfFinished = (array, cellNo) => {
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