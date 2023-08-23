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
    const modal = document.querySelector('.modal');
    const endGameTxt = document.querySelector('.endgame-msg');

    const updateGameBoard = (gridCells) => {
        gridCells.forEach( (gridCell, index) => {
            // display signatures on grid
            gridCell.textContent = gameBoard[index];
            // change color based on signature
            if(gameBoard[index] === 'X') {
                gridCell.style.color = '#5dd028';
            }
            else if(gameBoard[index] === 'O') {
                gridCell.style.color = '#f45';
            };
        });
    };

    const showEndScreen = (endGameMsg) => {
        endGameTxt.textContent = endGameMsg;
        modal.showModal();
    }

    const closeEndScreen = () => {
        modal.close();
    } 

    return {updateGameBoard, showEndScreen, closeEndScreen};
})();

const GameController = (() => {
    const gridCells = document.querySelectorAll('.grid-cell');
    const gameInfoTxt = document.getElementById('game-info-txt');

    const replayBtn = document.querySelector('.replay-game');

    let playerXTurn = true;
    let turnsCounter = 0;
    let endMatchMsg = '';
    const minTurnsToWin = 5;
    const maxTurns = 9;
    const gameBoard = GameBoard.getGameBoard();

    replayBtn.addEventListener('click', () => {
        DisplayController.closeEndScreen();
        setDefaults();
    });

    const setDefaults = () => {
        playerXTurn = true;
        turnsCounter = 0;
        endMatchMsg = '';

        for(let i = 0; i < gameBoard.length; i++){
            gameBoard[i] = '';
        }

        updateGameInfo();
        DisplayController.updateGameBoard(gridCells);
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
                        DisplayController.showEndScreen(endMatchMsg);
                    }
                    else{
                        updateGameInfo();
                    }
                }
            });
        })
    };

    const checkForWin = () => {
        if(turnsCounter >= minTurnsToWin && checkGameBoard()){
            endMatchMsg = `Player ${checkGameBoard()} has won!`;
            return true;
        }
        else if(turnsCounter === maxTurns && !checkGameBoard()){
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