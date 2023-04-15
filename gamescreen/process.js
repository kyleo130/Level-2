const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const player = Player(context, 176, 192);

let submitted = false;

function setSubmitted(val) {
  submitted = val;
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
      setTimeout(sendSuccess, 1000);
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