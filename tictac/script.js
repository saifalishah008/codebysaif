const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const aiBtn = document.getElementById("aiBtn");

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsAI = false;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function handleClick(event) {
    const index = event.target.getAttribute("data-index");

    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkResult();

    if (vsAI && gameActive && currentPlayer === "O") {
        setTimeout(aiMove, 400);
    }
}

function aiMove() {
    let emptyCells = [];

    boardState.forEach((value, idx) => {
        if (value === "") emptyCells.push(idx);
    });

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardState[randomIndex] = "O";
    cells[randomIndex].textContent = "O";

    checkResult();
}

function checkResult() {
    let win = false;

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            win = true;
            break;
        }
    }

    if (win) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    cells.forEach(c => c.textContent = "");
    statusText.textContent = "Player X's Turn";
}

restartBtn.addEventListener("click", restartGame);

aiBtn.addEventListener("click", () => {
    restartGame();
    vsAI = !vsAI;
    aiBtn.textContent = vsAI ? "Playing vs Computer" : "Play vs Computer";
});

cells.forEach(cell => cell.addEventListener("click", handleClick));
