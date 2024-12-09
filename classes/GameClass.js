import { Player } from "./PlayerClass.js";
import inquirer from "inquirer";

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
    async startGame() {
        let isGameOver = false;
    
        while (!isGameOver) {
            this.printBoard();
    
            // Prompt for row input
            const { row } = await inquirer.prompt([{
                type: 'input',
                name: 'row',
                message: 'Please input a row (0: top, 1: middle, or 2: bottom):',
                validate: (input) => ['0', '1', '2'].includes(input) || 'Please enter 0, 1, or 2',
            }]);
    
            // Prompt for column input
            const { column } = await inquirer.prompt([{
                type: 'input',
                name: 'column',
                message: 'Please input a column (0: left, 1: middle, or 2: right):',
                validate: (input) => ['0', '1', '2'].includes(input) || 'Please enter 0, 1, or 2',
            }]);
    
            const rowParsed = parseInt(row);
            const columnParsed = parseInt(column);
    
            if (this.isMoveValid(rowParsed, columnParsed)) {
                this.updateBoard(rowParsed, columnParsed);
                isGameOver = this.checkForWin();  // Check if the game is over
                // isGameOver = true;
    
                if (!isGameOver) {
                    this.switchPlayerTurn();  // Switch player if the game is not over
                } else {
                    console.log("Game Over!");
                }
            } else {
                console.log('Invalid move, try again.');
            }
        }
    }

    // Logic for checking for win
    checkForWin() {
        // check if there is 3 in a row in each direction
        // 3 in a row horizontal
        for (let row = 0; row < 3; row++) {
            if (this.gameBoard[row][0] && this.gameBoard[row][0] === this.gameBoard[row][1] && this.gameBoard[row][0] === this.gameBoard[row][2]) {
                console.log(`Player ${this.players[this.currentPlayerIndex]} wins!`);
                return true;
            }
        }
        // 3 in a row vertical
        for (let column = 0; column < 3; column++) {
            if (this.gameBoard[column][0] && this.gameBoard[column][0] === this.gameBoard[column][1] && this.gameBoard[column][0] === this.gameBoard[column][2]) {
                console.log(`Player ${this.players[this.currentPlayerIndex]} wins!`);
                return true;
            }
        }
        // 3 in a row diagonal
        // bottom left to top right
        if (this.gameBoard[2][0] &&
            this.gameBoard[2][0] === this.gameBoard[1][1] &&
            this.gameBoard[2][0] === this.gameBoard[0][2]
        ) {
            console.log(`Player ${this.gameBoard[2][0]} wins!`);
            return true;
        }
        // bottom right to top left
        if (this.gameBoard[2][2] &&
            this.gameBoard[2][2] === this.gameBoard[1][1] &&
            this.gameBoard[2][2] === this.gameBoard[0][0]
        ) {
            console.log(`Player ${this.gameBoard[2][2]} wins!`);
            return true;
        }

        // check for a draw
        if (this.gameBoard.every(row => row.every(cell => cell !== null))) {
            console.log('It\'s a draw!');
            return true;
        }

        return false;
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

export default Game;