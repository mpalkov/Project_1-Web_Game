class AiGame extends Game {
    constructor() {
        super();
        this.player2 = AI;
    }

    aiMove = (cells) => {
        // block cells from user actions while AI is playing
        myGame.gameBoard.classList.add("blocked");
        // Choose random empty cell
        const freeCells = document.querySelectorAll(".cell:not(.x):not(.o)");
        const AInbr = Math.floor(Math.random() * freeCells.length);
        const AIchosenCell = cells[freeCells[AInbr].id];
        setTimeout(() => {
            this.onClickActions(AIchosenCell, cells);
            // unblock cells
            myGame.gameBoard.classList.remove("blocked");
        }, 400);
    }
}