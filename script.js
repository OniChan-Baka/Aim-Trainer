const score = document.getElementById("scoreNumber");
const target = document.querySelector("#target");
const timer = document.getElementById("timer");
const gameovertext = document.getElementById("gameovertext");
const startButton = document.getElementById("startButton");

const TARGET_WIDTH = target.offsetWidth;
const TARGET_HEIGHT = target.offsetHeight;
const MIN_X = 30;
const MAX_X = 1167 - TARGET_WIDTH;
const MIN_Y = 150;
const MAX_Y = 760 - TARGET_HEIGHT;

let timeRemaining = 30;
let gameRunning = false;
let timerId;

startButton.addEventListener("click", startGame);

function startGame() {
  if (gameRunning) return;

  restartGame();
  gameRunning = true;
  target.style.display = "block";
}

function restartGame() {
  gameovertext.innerHTML = "";
  score.textContent = 0;
  timeRemaining = 30;
  updateTimer();
  moveTarget();
}

function updateTimer() {
  timer.textContent = timeRemaining;

  if (timeRemaining === 0) {
    endGame();
  } else {
    timeRemaining--;
    timerId = setTimeout(updateTimer, 1000);
  }
}

function endGame() {
  gameRunning = false;
  clearTimeout(timerId);
  gameovertext.innerHTML = "Game Over!";
  startButton.style.display = "block";
}

function moveTarget() {
  const x = Math.floor(Math.random() * (MAX_X - MIN_X + 1)) + MIN_X;
  const y = Math.floor(Math.random() * (MAX_Y - MIN_Y + 1)) + MIN_Y;
  target.style.left = x + "px";
  target.style.top = y + "px";
}

target.addEventListener("click", () => {
  if (!gameRunning) return;

  score.textContent++;
  moveTarget();
});
