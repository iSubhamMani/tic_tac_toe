const GameBoard = (() => {
    let _gameBoard = ['', '', '', '', '', '', '', '', ''];

    const getGameBoard = () => {
        return _gameBoard;
    };

    return {getGameBoard};
})();

const DisplayController = (() => {
    // display signatures on grid
    const gridCells = document.querySelectorAll('.grid-cell');
    const gameBoardItems = GameBoard.getGameBoard();

    gridCells.forEach( (gridCell, index) => {
        gridCell.textContent = gameBoardItems[index];
    })
})();

const Player = (signature) => {

}