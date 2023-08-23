const GameBoard = (() => {
    let _gameBoard = ['', '', '', '', '', '', '', '', ''];

    const getGameBoard = () => {
        return _gameBoard;
    };

    return {getGameBoard};
})();

const DisplayController = (() => {
    // display signatures on grid
    const gameBoard = GameBoard.getGameBoard();

    const updateGameBoard = (gridCells) => {
        gridCells.forEach( (gridCell, index) => {
            // display signatures on grid
            gridCell.textContent = gameBoard[index];
            // change color based on signature
            if(gameBoard[index] === 'X') {
                gridCell.style.color = '#2f78bc';
            }
            else if(gameBoard[index] === 'O') {
                gridCell.style.color = '#f45';
            };
        });
    };

    return {updateGameBoard};
})();

const GameController = (() => {
    const gridCells = document.querySelectorAll('.grid-cell');
    const gameInfoTxt = document.getElementById('game-info-txt');

    let playerXTurn = true;
    let turnsCounter = 0;
    let endMatchMsg = '';
    const gameBoard = GameBoard.getGameBoard();

    const setDefaults = () => {
        playerXTurn = true;
        turnsCounter = 0;
        endMatchMsg = '';
    }

    const getSignature = () => {
        if(playerXTurn){
            playerXTurn = false;
            return playerX.signature;
        }
        else{
            playerXTurn = true;
            return playerO.signature;
        }
    };

    const updateGameInfo = () => {
        if(playerXTurn) gameInfoTxt.textContent = `Player ${playerX.signature}'s turn`;
        else gameInfoTxt.textContent = `Player ${playerO.signature}'s turn`;
    }

    const updateGameBoard = (gridCell) => {
        const index = parseInt(gridCell.getAttribute('data-index'));
        gameBoard[index] = getSignature();

        DisplayController.updateGameBoard(gridCells);
    };

    const addGridListener = () => {
        gridCells.forEach(gridCell => {
            gridCell.addEventListener('click', () => {
                if(gridCell.textContent === ''){
                    turnsCounter++;
                    updateGameBoard(gridCell);
                    if(checkForWin()){
                        // Display End Screen
                        
                    }
                    else{
                        updateGameInfo();
                    }
                }
            });
        })
    };

    const checkForWin = () => {
        if(turnsCounter >= 5 && checkGameBoard()){
            endMatchMsg = `Player ${checkGameBoard()} has won!`;
            return true;
        }
        else if(turnsCounter === 9 && !checkGameBoard()){
            endMatchMsg = 'Match Tie..';
            return true;
        }
    }

    const checkGameBoard = () => {
        // Row check
        if(gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2] && gameBoard[0] !== '') return gameBoard[0];
            
        else if(gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5] && gameBoard[3] !== '') return gameBoard[3];
           
        else if(gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8] && gameBoard[6] !== '') return gameBoard[6];

        // Column Check
        else if(gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6] && gameBoard[0] !== '') return gameBoard[0];
           
        else if(gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[1] !== '') return gameBoard[1];

        else if(gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8] && gameBoard[2] !== '') return gameBoard[2];

        // Diagonal Check
        else if(gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[0] !== '') return gameBoard[0];

        else if(gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[2] !== '') return gameBoard[2];

        // Match Tie
        else return false;
    };

    addGridListener();
})();

const Player = (signature) => {
    return {signature};
}

const playerX = Player('X');
const playerO = Player('O');