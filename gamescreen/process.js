const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const player = Player(context, 176, 192);

let result = [];
let submitted = false;
let finished = false;

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

function handleOutOfBound(x, y) {
  if (x < 16 || x > 624 || y < 32 || y > 416) {
    endAnimation();
    setTimeout(sendFail, 1000);
  }
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
    }

    if (submitted && !finished) {
      let targetPos = result[0];
      let nowPos = player.getXY();

      if (nowPos.x > targetPos[0] * 32) {
        handleOutOfBound(nowPos.x - 1, nowPos.y);
        player.setXY(nowPos.x - 1, nowPos.y);
      } else if (nowPos.x < targetPos[0] * 32) {
        handleOutOfBound(nowPos.x + 1, nowPos.y);
        player.setXY(nowPos.x + 1, nowPos.y);
      } else if (nowPos.y > targetPos[1] * 32) {
        handleOutOfBound(nowPos.x, nowPos.y - 1);
        player.setXY(nowPos.x, nowPos.y - 1);
      } else if (nowPos.y < targetPos[1] * 32) {
        handleOutOfBound(nowPos.x, nowPos.y + 1);
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