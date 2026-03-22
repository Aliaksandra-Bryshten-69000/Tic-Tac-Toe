const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let playerNames = { X: "", O: "" };
let scores = { X: 0, O: 0 };

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => makeMove(cell, index));
});

function startGame() {
    const x = document.getElementById("playerX").value;
    const o = document.getElementById("playerO").value;

    if (!x || !o) {
        alert("Wpisz imiona!");
        return;
    }

    playerNames.X = x;
    playerNames.O = o;

    let savedScores = JSON.parse(localStorage.getItem("scores"));
    if (savedScores) scores = savedScores;

    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "block";

    updateScoreUI();
    statusText.textContent = "Tura: " + playerNames.X;
}

function makeMove(cell, index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Tura: " + playerNames[currentPlayer];
}

function checkWinner() {
    for (let condition of winConditions) {
        let [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            scores[board[a]]++;
            saveScores();

            statusText.textContent = "Wygrywa: " + playerNames[board[a]];
            updateScoreUI();
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "Remis!";
        gameActive = false;
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Tura: " + playerNames.X;

    cells.forEach(cell => cell.textContent = "");
}

function saveScores() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

function updateScoreUI() {
    document.getElementById("scoreX").textContent = playerNames.X + ": " + scores.X;
    document.getElementById("scoreO").textContent = playerNames.O + ": " + scores.O;
}

function resetScore() {
    scores = { X: 0, O: 0 };
    saveScores();
    updateScoreUI();
}
