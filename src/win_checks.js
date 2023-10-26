const doesCellMatch = (cell) => {
    return cell.classList.contains(myGame.whosTurn);
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
    const isCell0 = doesCellMatch(array[0]);
    const isCell2 = doesCellMatch(array[2]);
    const isCell4 = doesCellMatch(array[4]);
    const isCell6 = doesCellMatch(array[6]);
    const isCell8 = doesCellMatch(array[8]);

    if (isCell0 && isCell4 && isCell8) {
        return true;
    }
    else if (isCell2 && isCell4 && isCell6) {
        return true;
    }
    else
        return false;
};

const allCellsFull = (array) => {
    const len = array.length;
    for (let i = 0; i < len; i++) {
        if (!array[i].classList.contains(X_PLAYER) && !array[i].classList.contains(O_PLAYER)) {
            return false;
        }
    }
    return true;
};