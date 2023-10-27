# Martin's Tic-Tac-Toe

## The project idea
My idea is to make the classic Tic-Tac-Toe game. 2 players putting X and O-s in the 3x3 grid. The first one to accomplish 3 in a row wins. Else a draw is forced.

## Try it!
<img src="https://github.com/mpalkov/Project_1-Web_Game/assets/102831536/2d155015-b63d-491f-a3ac-5c60a08e54f1" alt="tic-tac-toe preview" width="250px"/>

https://mpalkov.github.io/Project1-WebGame/

## Technical requirements
- Render a game in the browser.

- Have logic for winning and/or losing and show feedback to the player in either case:

- Your game must have logic that allows the player to win or lose.

- Your game code must be organized in separate files for HTML, CSS, and JavaScript.

- Use plain JavaScript for DOM manipulation.

- Your game entities and elements must be organized using classes and OOP.

- Have a repo on GitHub.

- Have at least one (1) commit per day that you worked on.

- You must deploy your game online using GitHub Pages so anyone can play it.

- Your code should follow the principles of KISS (Keep It Simple Stupid) and DRY (Don’t Repeat Yourself).


## Backlog
If I have time, I will apply some of these extras
- add restart game button
- add hover effect on empty cells
- add animations
- add score (X wins: # | O wins: #)
    - add "New Game" button
- add option for computer as second-player
- add sound effects
- add more difficulty levels (5x5 / 7x7)
- make it more fun


## Approach and learnings
- I have connected HTML, CSS and JavaScript files to make it all work.

- I have used Object Oriented programming to create Game class and then create class AiGame which extends the Game Class, it has some more methods with algorhytms controlling the AI turns.

- I tried to make the code as much clear and readable as possible. Grouping related code into various files.

- I come from C language programming and I find it very useful to create constants (constant variables) which can be reused in multiple places and if a change is required, you have to modify it in one place only. As well, It can be used to increase readability for humans.
In C the term is macros.

for example: 

    const IS_TEST = true;
    const NOT_TEST = false;
    
    addClickHandlers = () => {
            const cells = document.querySelectorAll(".cell");
            cells.forEach(element => {
                element.addEventListener("click", (event) => {
                    this.onClickActions(element, cells, NOT_TEST);
                    if (myGame.player2 === AI && myGame.whosTurn === O_PLAYER) {
                        this.aiMove(cells);
                    }
                }, {once:true});
            });
        }


