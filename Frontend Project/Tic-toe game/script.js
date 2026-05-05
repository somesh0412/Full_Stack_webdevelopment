const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Ignore click if cell is already occupied or the game is over
    if (gameState[cellIndex] !== "" || !isGameActive) return;

    // Process turn
    gameState[cellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") continue;
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Player <span style="color: ${currentPlayer === 'X' ? 'var(--accent-x)' : 'var(--accent-o)'}">${currentPlayer}</span> wins! 🎉`;
        isGameActive = false;
        return;
    }

    // Check for draw
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusText.innerText = "Game ended in a draw! 🤝";
        isGameActive = false;
        return;
    }

    // Toggle player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerHTML = `Player <span style="color: ${currentPlayer === 'X' ? 'var(--accent-x)' : 'var(--accent-o)'}">${currentPlayer}</span>'s turn`;
}

function resetGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    statusText.innerHTML = `Player <span style="color: var(--accent-x)">X</span>'s turn`;
    
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('x', 'o');
    });
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);