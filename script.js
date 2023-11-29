document.addEventListener('DOMContentLoaded', createPuzzle);

let puzzleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, ""];
const gridSize = 3;
let moveCounter = 0;
const maxMoves = 20; // Set the maximum number of moves

function createPuzzle() {
    const puzzleGrid = document.getElementById('puzzle-grid');
    puzzleGrid.innerHTML = '';

    for (let i = 0; i < puzzleNumbers.length; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.textContent = puzzleNumbers[i];
        tile.onclick = () => moveTile(i);
        puzzleGrid.appendChild(tile);
    }

    updateMoveCounter();
}

function moveTile(index) {
    const emptyIndex = puzzleNumbers.indexOf("");
    if (isValidMove(index, emptyIndex)) {
        [puzzleNumbers[index], puzzleNumbers[emptyIndex]] = [puzzleNumbers[emptyIndex], puzzleNumbers[index]];
        moveCounter++;
        createPuzzle();

        if (isPuzzleSolved()) {
            showWinMessage();
            resetGame();
        } else if (moveCounter === maxMoves) {
            showGameOverMessage();
            resetGame();
        }
    }
}

function isValidMove(currentIndex, emptyIndex) {
    const rowDiff = Math.floor(currentIndex / gridSize) - Math.floor(emptyIndex / gridSize);
    const colDiff = (currentIndex % gridSize) - (emptyIndex % gridSize);
    return (Math.abs(rowDiff) === 1 && colDiff === 0) || (Math.abs(colDiff) === 1 && rowDiff === 0);
}

function isPuzzleSolved() {
    return puzzleNumbers.slice(0, puzzleNumbers.length - 1).every((number, index) => number === index + 1);
}

function showWinMessage() {
    alert('Congratulations! You solved the puzzle in ' + moveCounter + ' moves. You win!');
}

function showGameOverMessage() {
    alert('Game Over! You reached the maximum number of moves (' + maxMoves + '). Try again!');
}

function shuffle() {
    for (let i = puzzleNumbers.length - 2; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [puzzleNumbers[i], puzzleNumbers[j]] = [puzzleNumbers[j], puzzleNumbers[i]];
    }
    resetGame();
}

function resetGame() {
    moveCounter = 0;
    createPuzzle();
}

function updateMoveCounter() {
    const moveCounterElement = document.getElementById('move-counter');
    if (moveCounterElement) {
        moveCounterElement.textContent = 'Moves: ' + moveCounter;
    }
}
