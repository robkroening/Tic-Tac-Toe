import { Player } from "./PlayerClass.js";
import readline from 'readline';

// create a class for the tic tac toe game
class Game {
    constructor() {
        this.players = this.createPlayers();
        this.currentPlayerIndex = 0;
        this.gameBoard = this.createBoardTemplate();
    };
    // methods that can be performed on the game object

    // create the board
    // row array, column array, populate with null to start
    // WORKING
    createBoardTemplate() {
        const gameBoard = [];
        for (let row = 0; row < 3; row++) {
            const boardRow = [];
            for (let column = 0; column < 3; column++) {
                boardRow.push(null);
            };
            gameBoard.push(boardRow);
        };
        // console.log(gameBoard);
        return gameBoard;
    };

    // This function places the correct symbol based on the row and column that are passed in
    // WORKING
    updateBoard(row, column) {
        // logic to update the tic tac toe board
        const currentPlayer = this.players[this.currentPlayerIndex];
        let playerSymbol;
        if (currentPlayer.name == 'Bob') {
            playerSymbol = 'X';
        } else {
            playerSymbol = 'O';
        }

        if (this.gameBoard[row][column] === null) {
            // update the current game board spot
            this.gameBoard[row][column] = playerSymbol;
            // this.printBoard();
            return this.gameBoard;
        } else {
            console.log('This spot is taken');
            // this.printBoard();
            return null;
        }

    };

    // WORKING
    printBoard() {
        console.log('This is the current game board:');
        this.gameBoard.forEach((row) => {
            console.log(row.map(cell => (cell === null ? ' ' : cell)).join(' | '));
        });
        console.log('');
    };

    // logic to start the game loop
    startGame() {
        let gameEnded = false;
        while (gameEnded === false) {
            this.printBoard();
            let row = prompt(`Please input a row (0, 1, or 2):`);
            let column = prompt(`Please input a column (0, 1, or 2):`);

            console.log(row);
            console.log(column);
            break;
        }
    };

    // check who the active player is
    // select what element you want to make a move on
    // make the move as the active player
    // invoke logic to make the move
    // update the gameboard
    // switch the player turn
    // return the updated gameboard
    makeMove(row, column) {
        if (this.isMoveValid(row, column)) {
            this.updateBoard(row, column);
            this.switchPlayerTurn();
            this.printBoard();
        } else {
            console.log('This move is invalid, please try again.')
        }
    };

    // check if the move is valid
    // returns false if invalid
    // returns true if the move is valid
    isMoveValid(row, column) {
        if (row < 0 || row > 2 || column < 0 || column > 2) {
            // out of bounds return false
            return false;
        } else if (this.gameBoard[row][column] !== null) {
            // not null return false
            return false;
        } else {
            // return true
            return true;
        }
    };

    // after player makes a move, switch to the other player's turn
    // WORKING
    switchPlayerTurn() {
        if (this.currentPlayerIndex === 0) {
            this.currentPlayerIndex = 1;
            return this.players[this.currentPlayerIndex];
        } else {
            this.currentPlayerIndex = 0;
            return this.players[this.currentPlayerIndex];
        }
    };

    // create a new player
    // THIS CAN BE DONE DYNAMICALLY SOMEHOW WITH MONGOOSE
    createPlayers() {
        const player1 = new Player('Bob', 'bobevans@potatoes.com', '54-32');
        const player2 = new Player('Vinny', 'vinny11@email.com', '91-85');
        return [player1, player2];
    };

    // show players participating in the game
    showPlayerData() {
        console.log(this.players);
        return this.players;
    };

    // more methods below
};

// const game1 = new Game('player1');
const game1 = new Game();
game1.startGame();
// game1.rowColumnPrompt();
// // console.log(game1);
// game1.updateBoard(0, 0);
// game1.updateBoard(2, 2);
// game1.printBoard();
// game1.switchPlayerTurn();
// game1.switchPlayerTurn();
// game1.switchPlayerTurn();
// game1.makeMove();
// game1.showPlayerData();
// game1.createBoard();

export default Game;