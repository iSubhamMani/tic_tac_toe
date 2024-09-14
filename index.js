// Class representing the game board of Tic-Tac-Toe
class GameBoard {
  // Constructor initializes the game board as an array with 9 empty strings (representing empty cells)
  constructor() {
    this._gameBoard = ["", "", "", "", "", "", "", "", ""];
  }

  // Method to return the current state of the game board
  getGameBoard() {
    return this._gameBoard;
  }

  // Method to reset the game board (fills the board with empty strings)
  resetBoard() {
    this._gameBoard.fill("");
  }
}

// Class that handles displaying the game board and other UI elements
class DisplayController {
  constructor(gameBoard) {
    // Reference to the game board array (needed to display the current state)
    this.gameBoard = gameBoard;

    // Get the modal element that will show the end screen when the game is over
    this.modal = document.querySelector(".modal");

    // Get the element where the end game message (win/tie) will be displayed
    this.endGameTxt = document.querySelector(".endgame-msg");
  }

  // Method to update the UI of the game board (called after every player move)
  updateGameBoard(gridCells) {
    // Loop through all grid cells and update their content
    gridCells.forEach((gridCell, index) => {
      gridCell.textContent = this.gameBoard[index]; // Update the grid cell with 'X', 'O', or empty
      // Change the color of 'X' and 'O' for better visual distinction
      if (this.gameBoard[index] === "X") {
        gridCell.style.color = "#5dd028"; // Green color for 'X'
      } else if (this.gameBoard[index] === "O") {
        gridCell.style.color = "#f45"; // Red color for 'O'
      }
    });
  }

  // Method to show the modal at the end of the game with a win/tie message
  showEndScreen(endGameMsg) {
    this.endGameTxt.textContent = endGameMsg; // Set the message text
    this.modal.showModal(); // Show the modal
  }

  // Method to close the modal when the game is reset
  closeEndScreen() {
    this.modal.close(); // Close the modal
  }
}

// Class to represent a player, either X or O
class Player {
  constructor(signature) {
    // 'signature' is either 'X' or 'O'
    this.signature = signature;
  }
}

// Class that controls the game logic, handles turns, and checks for a win/tie
class GameController {
  constructor(gameBoard, displayController, playerX, playerO) {
    // Get all grid cells in the game (these are the clickable boxes in the UI)
    this.gridCells = document.querySelectorAll(".grid-cell");

    // Get the element where information about the current player's turn will be displayed
    this.gameInfoTxt = document.getElementById("game-info-txt");

    // Get the replay button element (for restarting the game)
    this.replayBtn = document.querySelector(".replay-game");

    // Initial game state values
    this.playerXTurn = true; // Player X always starts first
    this.turnsCounter = 0; // Tracks the number of turns (maximum is 9)
    this.endMatchMsg = ""; // Message to show at the end of the game (either win or tie)
    this.minTurnsToWin = 5; // Minimum number of turns needed to check for a win
    this.maxTurns = 9; // Maximum number of turns (if reached, the game ends in a tie)
    this.gameBoard = gameBoard.getGameBoard(); // Reference to the game board array
    this.displayController = displayController; // Reference to the DisplayController for updating the UI
    this.playerX = playerX; // Reference to Player X
    this.playerO = playerO; // Reference to Player O

    // Set up the event listener for the replay button (to reset the game)
    this.replayBtn.addEventListener("click", () => {
      this.displayController.closeEndScreen(); // Close the end game modal
      this.setDefaults(); // Reset the game to its default state
    });

    // Set up the event listeners for the grid cells (to allow players to click on them)
    this.addGridListener();

    // Update the game information to show the current player's turn
    this.updateGameInfo();
  }

  // Method to reset the game to its initial state
  setDefaults() {
    this.playerXTurn = true; // Player X starts first
    this.turnsCounter = 0; // Reset the turn counter
    this.endMatchMsg = ""; // Clear the end game message

    // Clear the game board
    this.gameBoard.fill("");

    // Update the game information and UI
    this.updateGameInfo();
    this.displayController.updateGameBoard(this.gridCells);
  }

  // Method to get the current player's signature ('X' or 'O')
  getSignature() {
    if (this.playerXTurn) {
      this.playerXTurn = false; // Toggle to player O's turn
      return this.playerX.signature; // Return 'X'
    } else {
      this.playerXTurn = true; // Toggle to player X's turn
      return this.playerO.signature; // Return 'O'
    }
  }

  // Method to update the game information (which player's turn it is)
  updateGameInfo() {
    this.gameInfoTxt.textContent = `Player ${
      this.playerXTurn ? this.playerX.signature : this.playerO.signature
    }'s turn`;
  }

  // Method to update the game board when a player clicks on a cell
  updateGameBoard(gridCell) {
    const index = parseInt(gridCell.getAttribute("data-index")); // Get the index of the clicked cell
    this.gameBoard[index] = this.getSignature(); // Place 'X' or 'O' in the clicked cell

    // Update the UI to reflect the current state of the game board
    this.displayController.updateGameBoard(this.gridCells);
  }

  // Method to add click event listeners to all grid cells
  addGridListener() {
    this.gridCells.forEach((gridCell) => {
      gridCell.addEventListener("click", () => {
        // If the clicked cell is empty, update the game state
        if (gridCell.textContent === "") {
          this.turnsCounter++; // Increment the turn counter
          this.updateGameBoard(gridCell); // Update the game board

          // Check if a player has won or if the game is a tie
          if (this.checkForWin()) {
            this.displayController.showEndScreen(this.endMatchMsg); // Show end screen with result
          } else {
            this.updateGameInfo(); // Update the turn info if the game is not over
          }
        }
      });
    });
  }

  // Method to check if the game has been won or if it's a tie
  checkForWin() {
    // Check if a player has won (after at least 5 turns)
    if (this.turnsCounter >= this.minTurnsToWin && this.checkGameBoard()) {
      this.endMatchMsg = `Player ${this.checkGameBoard()} has won!`; // Set the win message
      return true; // End the game
    }
    // If all 9 turns are completed and there's no winner, it's a tie
    else if (this.turnsCounter === this.maxTurns && !this.checkGameBoard()) {
      this.endMatchMsg = "Match Tie.."; // Set the tie message
      return true; // End the game
    }
    return false; // The game continues
  }

  // Method to check the game board for a winning combination (rows, columns, diagonals)
  checkGameBoard() {
    const board = this.gameBoard;

    // Check rows for a win
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== "")
      return board[0];
    if (board[3] === board[4] && board[4] === board[5] && board[3] !== "")
      return board[3];
    if (board[6] === board[7] && board[7] === board[8] && board[6] !== "")
      return board[6];

    // Check columns for a win
    if (board[0] === board[3] && board[3] === board[6] && board[0] !== "")
      return board[0];
    if (board[1] === board[4] && board[4] === board[7] && board[1] !== "")
      return board[1];
    if (board[2] === board[5] && board[5] === board[8] && board[2] !== "")
      return board[2];

    // Check diagonals for a win
    if (board[0] === board[4] && board[4] === board[8] && board[0] !== "")
      return board[0];
    if (board[2] === board[4] && board[4] === board[6] && board[2] !== "")
      return board[2];

    return false; // No winner yet
  }
}

// Initialize Players (Player X and Player O)
const playerX = new Player("X");
const playerO = new Player("O");

// Initialize Game Board and Controllers
const gameBoardInstance = new GameBoard();
const displayControllerInstance = new DisplayController(
  gameBoardInstance.getGameBoard()
);
const gameControllerInstance = new GameController(
  gameBoardInstance,
  displayControllerInstance,
  playerX,
  playerO
);
