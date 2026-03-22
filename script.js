const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const scoreDiv = document.getElementById("score");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let playerNames = { X: "", O: "" };

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

    localStorage.setItem("players", JSON.stringify(playerNames));

    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "block";

    showScores();
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
            statusText.textContent = "Wygrywa: " + playerNames[board[a]];
            gameActive = false;
            saveScore(board[a]);
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
    statusText.textContent = "Tura: " + playerNames["X"];

    cells.forEach(cell => cell.textContent = "");
}

function saveScore(winner) {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.push(
        playerNames[winner] + " wygrał (" + new Date().toLocaleString() + ")"
    );

    localStorage.setItem("scores", JSON.stringify(scores));

    showScores();
}

function showScores() {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scoreDiv.innerHTML = scores.join("<br>");
}
