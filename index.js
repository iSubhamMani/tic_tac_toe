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
            gridCell.textContent = gameBoardItems[index];
        });
    }

    return {updateGameBoard};
})();

const GameController = (() => {

    const gridCells = document.querySelectorAll('.grid-cell');

    const updateGameBoard = (gridCell) => {
        const index = parseInt(gridCell.getAttribute('data-index'));
        GameBoard.getGameBoard()[index] = 'X';

        DisplayController.updateGameBoard(gridCells);
    }

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

}