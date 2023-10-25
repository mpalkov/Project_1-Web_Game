console.log("index.js OK");
const X_PLAYER = 'x';
const O_PLAYER = 'o';
const TEXT_X_WON = "× WINS!"
const TEXT_O_WON = "𝗢 WINS!"
const TEXT_DRAW = "DRAW, NO WINNER!"
let whosTurn = X_PLAYER;
let myGame = null;
let isGameOver = true;
const endScreen = document.querySelector(".end-screen");
const newGameBtn = document.querySelector(".end-screen button");
const endScreenText = document.querySelector(".end-screen h2");

const startNewGame = () => {
    myGame = new Game;
    myGame.populateGame();
    whosTurn = X_PLAYER;
    console.log("Game started");
}

newGameBtn.addEventListener("click", (e) => {
    if (isGameOver) {
        endScreen.classList.toggle("hidden");
        gameBoard.innerHTML = "";
        isGameOver = false;
        startNewGame();
    }
});

startNewGame();