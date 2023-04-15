const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const door = Door(context, 320, 144);
const player = Player(context, 304, 152);
let smokes = [];

let hitCount = 0;
let hitLeft = 200;

let submitted = false;

function setSubmitted(val) {
  submitted = val;
}

function setHitCount(count) {
  resetHit();
  hitCount = count;
}

function resetHit() {
  hitCount = 0;
  hitLeft = 200;
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

function doFrame(now) {
    if (submitted) {
      document.getElementById("submit").disabled = true;
      door.repair();

      if (hitLeft == 0) {
        setTimeout(sendSuccess, 1000);
      } else if (hitCount == 0) {
        if (hitLeft > 0) {
          setTimeout(sendFail, 1000);
        }
      }
    }

    if (hitCount > 0 && hitLeft > 0) {
      hitCount--;
      hitLeft--;

      let randomX = Math.floor(Math.random()*48) + 296;
      smokes.push(Smoke(context, randomX, 144));
      player.setXY(randomX, 152)
    }

    if (smokes.length > 5) {
      smokes.shift();
    }

    /* Update the sprites */
    if (hitLeft <= 0) {
      door.destroy();
    }

    door.update(now);
    for (let i = 0; i < smokes.length; i++) {
      smokes[i].update(now);
    }
    player.update(now);

    /* Clear the screen */
    context.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw the sprites */
    door.draw();
    for (let i = 0; i < smokes.length; i++) {
      smokes[i].draw();
    }
    player.draw();

    /* How many hit left */
    context.font = "30px Consolas";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText(hitLeft, 320, 120);

    /* Process the next frame */
    requestAnimationFrame(doFrame);
}

/* Start the animation */
requestAnimationFrame(doFrame);