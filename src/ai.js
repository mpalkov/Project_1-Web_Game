class AiGame extends Game {
    constructor() {
        super();
        this.player2 = AI;
    }

	enemyCellToBlock = (cells, freeCells) => {
		const freeCellsToTry = freeCells.length;
		this.whosTurn = X_PLAYER;
        for (let i = 0; i < freeCellsToTry; i++) {
            const testCells = [...cells];
            const testCellNo = freeCells[i].id
            if (this.onClickActions(testCells[testCellNo], testCells, IS_TEST)) {
				this.whosTurn = O_PLAYER;
                return cells[testCellNo];
            }
        }
        // if win not found, return false;
		this.whosTurn = O_PLAYER;
        return null;
	}

	randomMove = (cells, freeCells) => {
        const AInbr = Math.floor(Math.random() * freeCells.length);
        const randomCell = cells[freeCells[AInbr].id];
        console.log("randommove chosencell: ", randomCell);
        return randomCell;
    };

	// IF win found, return TheChosenCell, fill it and win the game!
    winningCell = (cells, freeCells) => {
        const freeCellsToTry = freeCells.length;
        for (let i = 0; i < freeCellsToTry; i++) {
            const testCells = [...cells];
            const testCellNo = freeCells[i].id
            if (this.onClickActions(testCells[testCellNo], testCells, IS_TEST)) {
                return cells[testCellNo];
            }
        }
        // if win not found, return false;
        return null;
    };

	aiChooseCell = (cells) => {
        const freeCells = document.querySelectorAll(".cell:not(.x):not(.o)");
        let AIchosenCell = null;
        // First search if you can do a move to WIN
        AIchosenCell = this.winningCell(cells, freeCells)
        if (AIchosenCell) {
            console.log("chosen WIN cell")
            return AIchosenCell;
        }
        // Second, if no winning move exists, search if enemy has a winning move and block it.
		AIchosenCell = this.enemyCellToBlock(cells, freeCells)
        if (AIchosenCell) {
			console.log("chosen BLOCK cell")
			return AIchosenCell;
		}
        // Else, choose a random empty cell
        else {
            console.log("chosen RANDOM cell")
            AIchosenCell = this.randomMove(cells, freeCells);
        }
        return AIchosenCell;
    };

    aiMove = (cells) => {
        // block cells from user actions while AI is playing
        myGame.gameBoard.classList.add("blocked");
        // Choose cell
        let AIchosenCell = this.aiChooseCell(cells);
        setTimeout(() => {
            this.onClickActions(AIchosenCell, cells);
            // unblock cells
            myGame.gameBoard.classList.remove("blocked");
        }, 400);
    };
}