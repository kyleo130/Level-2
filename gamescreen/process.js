const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const bitmap = [
[9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 9, 9, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
[9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
]

const player = Player(context, 176, 192);
player.draw();

let attempt = 0;
let result = [];
let submitted = false;
let finished = false;

function addAttempt() {
  attempt += 1;
}

function setResult(val) {
  result = val;
}

function setSubmitted(val) {
  submitted = val;
}

function setFinished(val) {
  finished = val;
}

function sendSuccess() {
  console.log("success");
  document.getElementById("alertSuccess").style.display = "block";
  document.getElementById("alertFail").style.display = "none";
  document.getElementById("alertProblem").style.display = "none";
  document.getElementById("submit").disabled = false;
  setSubmitted(false);
}

function sendFail() {
  console.log("fail");
  document.getElementById("alertSuccess").style.display = "none";
  document.getElementById("alertFail").style.display = "block";
  document.getElementById("alertProblem").style.display = "none";
  document.getElementById("submit").disabled = false;
  setSubmitted(false);
}

function endAnimation() {
  setFinished(true);
  player.stop();
  result = [];
}

function dieAnimation() {
  setFinished(true);
  player.die();
  result = [];
}

function handleOutOfBound(x, y) {
  if (x < 16 || x > 624 || y < 32 || y > 416) {
    endAnimation();
    setTimeout(sendFail, 1000);
    return true;
  }

  return false;
}

function handleStepOnRed(x, y) {
  let coorX = Math.floor(x/32);
  let coorY = Math.floor((y/32)+0.5);
  if (bitmap[coorY][coorX] == 1) {
    dieAnimation();
    setTimeout(sendFail, 500);
    return true;
  }

  return false;
}

function doFrame(now) {
    if (submitted && document.getElementById("submit").disabled === false) {
      document.getElementById("submit").disabled = true;
      setFinished(false);
      player.setXY(176, 192);
      player.move();
    }

    if (submitted && (result.length === 0)) {
      endAnimation();

      let nowPos = player.getXY();
      if (nowPos.x == 464 && nowPos.y == 224) {
        setTimeout(sendSuccess, 1000);
      } else {
        setTimeout(sendFail, 1000);
      }

      // return;
    }

    let nowPos = player.getXY();
    handleOutOfBound(nowPos.x, nowPos.y);

    if (submitted) {
      handleStepOnRed(nowPos.x, nowPos.y);
    }

    if (submitted && !finished) {
      let targetPos = result[0];

      if (nowPos.x > targetPos[0] * 32) {
        player.setXY(nowPos.x - 1, nowPos.y);
      } else if (nowPos.x < targetPos[0] * 32) {
        player.setXY(nowPos.x + 1, nowPos.y);
      } else if (nowPos.y > targetPos[1] * 32) {
        player.setXY(nowPos.x, nowPos.y - 1);
      } else if (nowPos.y < targetPos[1] * 32) {
        player.setXY(nowPos.x, nowPos.y + 1);
      } else {
        result.shift();
      }
    }

    /* Update the sprites */
    player.update(now);

    /* Clear the screen */
    context.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw the sprites */
    player.draw();

    /* Process the next frame */
    requestAnimationFrame(doFrame);
}

/* Start the animation */
requestAnimationFrame(doFrame);