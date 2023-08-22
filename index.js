const GameBoard = (() => {
    let _gameBoard = ['', '', '', '', '', '', '', '', ''];

    const getGameBoard = () => {
        return _gameBoard;
    };

    return {getGameBoard};
})();

const DisplayController = (() => {
    // display signatures on grid
    const gameBoardItems = GameBoard.getGameBoard();

    const updateGameBoard = (gridCells) => {
        gridCells.forEach( (gridCell, index) => {
            // display signatures on grid
            gridCell.textContent = gameBoardItems[index];
            // change color based on signature
            if(gameBoardItems[index] === 'X') gridCell.style.color = '#2f78bc';
            else if(gameBoardItems[index] === 'O') gridCell.style.color = '#f45';
        });
    };

    return {updateGameBoard};
})();

const GameController = (() => {
    const gridCells = document.querySelectorAll('.grid-cell');
    let playerXTurn = true;

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

    const updateGameBoard = (gridCell) => {
        const index = parseInt(gridCell.getAttribute('data-index'));
        GameBoard.getGameBoard()[index] = getSignature();

        DisplayController.updateGameBoard(gridCells);
    };

    const addGridListener = () => {
        gridCells.forEach(gridCell => {
            gridCell.addEventListener('click', () => {
                if(gridCell.textContent === ''){
                    updateGameBoard(gridCell);
                }
            })
        })
    };

    addGridListener();
})();

const Player = (signature) => {
    return {signature};
}

const playerX = Player('X');
const playerO = Player('O');