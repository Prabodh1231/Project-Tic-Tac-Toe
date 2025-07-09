let cells = document.querySelectorAll(".cell");
let restartGameButton = document.querySelector(".restart-btn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", cellClick);
});

restartGameButton.addEventListener("click", restartGame);

console.log("Game board created");

function cellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");
  console.log(`Cell clicked: ${index}`);

  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const a = board[condition[0]];
    const b = board[condition[1]];
    const c = board[condition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    document.querySelector(
      ".player-turn"
    ).textContent = `Player ${currentPlayer} wins!`;
    return;
  }

  if (!board.includes("")) {
    gameActive = false;
    document.querySelector(".player-turn").textContent = "It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.querySelector(
    ".player-turn"
  ).textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach((cell) => {
    cell.textContent = "";
  });

  document.querySelector(".player-turn").textContent = "Player X's turn";
}
