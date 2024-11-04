import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
//Update Loop

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

let lastTime;
function update(time) {
  if (lastTime !== null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    if (!isNaN(delta)) {
      document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
    }

    if (isLose()) {
      handleLose();
    }
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  } else {
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100; // calculation since paddle position in css is in vh
});

// setInterval(update, 10) Not to use this cause of delay in various times. instead use window.requestanimationframe
window.requestAnimationFrame(update);
