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

    populateGame = () => {
        for (let i = 0; i < this.level * this.level; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = i;
            this.gameBoard.appendChild(cell);
        }
        this.addClickHandlers();
    }

    switchTurn = () => {
        if (this.whosTurn === X_PLAYER) {
            this.whosTurn = O_PLAYER;
            this.gameBoard.classList.add("oturn");
            this.gameBoard.classList.remove("xturn");
            this.turnTextElement.innerHTML = O_SYMBOL;
        }
        else {
            this.whosTurn = X_PLAYER;
            this.gameBoard.classList.add("xturn");
            this.gameBoard.classList.remove("oturn");
            this.turnTextElement.innerHTML = X_SYMBOL;
        }
    }

    onClickActions = (element, cells) => {
        const cellNo = Number(element.id);
        toggleCell(element);
        if (isGameFinished(cells, cellNo)) {
            isGameOver = true;
            msgScreen.classList.toggle("hidden");
            return ;
        }
        this.switchTurn();
    }

    addClickHandlers = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(element => {
            element.addEventListener("click", (event) => {
                this.onClickActions(element, cells);
                if (myGame.player2 === AI && myGame.whosTurn === O_PLAYER) {
                    this.aiMove(cells);
                }
            }, {once:true});
        });
    }

}

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

const toggleCell = (cell) => {
    cell.classList.add(myGame.whosTurn);
}