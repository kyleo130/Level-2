ace.require("ace/ext/language_tools");
let editor = ace.edit("editor");
editor.setTheme("ace/theme/cobalt");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});


let defaultCode = 
`// Finish the function move()
// (x, y) is the position you are currently at.
// x increases from left to right of the map.
// y increases from top to bottom of the map.
// direction can be "Right", "Up" or "Down".
// step indicates how many steps you move in a direction.

function move(x, y, direction, step) {
    let newX = x, newY = y;
    
    if (direction == "Down") {
        newY += step;
    }
    
    // TODO
    
    return [newX, newY];
}

// The function will be called:
// move(x, y, "Right", 3);
// move(x, y, "Down", 2);
// move(x, y, "Right", 2);
// move(x, y, "Up", 1);
// move(x, y, "Right", 4);`

let answer =
`
function move(x, y, direction, step) {
    let newX = x, newY = y;
    
    if (direction == "Down") {
        newY += step;
    } else if (direction == "Up") {
        newY -= step;
    } else if (direction == "Right") {
        newX += step;
    }
    
    return [newX, newY];
}
`

editor.session.setValue(answer);

let submitButton = document.getElementById("submit");
let resetButton = document.getElementById("reset")

let skeletonBefore = 
`
let playerX = 5.5, playerY = 6;
let coordinates = [];
`

let skeletonAfter = 
`
let tempCoor = move(playerX, playerY, "Right", 3);
playerX = tempCoor[0], playerY = tempCoor[1];
coordinates.push([playerX, playerY]);

tempCoor = move(playerX, playerY, "Down", 2);
playerX = tempCoor[0], playerY = tempCoor[1];
coordinates.push([playerX, playerY]);

tempCoor = move(playerX, playerY, "Right", 2);
playerX = tempCoor[0], playerY = tempCoor[1];
coordinates.push([playerX, playerY]);

tempCoor = move(playerX, playerY, "Up", 1);
playerX = tempCoor[0], playerY = tempCoor[1];
coordinates.push([playerX, playerY]);

tempCoor = move(playerX, playerY, "Right", 4);
playerX = tempCoor[0], playerY = tempCoor[1];
coordinates.push([playerX, playerY]);

coordinates;
`

submitButton.addEventListener('click', function() {
    let code = editor.getValue();
    try {
        setResult(eval(skeletonBefore + code + skeletonAfter));
        /*
        if (attempt > 0) {
            requestAnimationFrame(doFrame);
        }
        addAttempt();
        */
        setSubmitted(true);
        document.getElementById("alertSuccess").style.display = "none";
        document.getElementById("alertFail").style.display = "none";
        document.getElementById("alertProblem").style.display = "none";
    } catch (err) {
        console.error(err);
        document.getElementById("alertSuccess").style.display = "none";
        document.getElementById("alertFail").style.display = "none";
        document.getElementById("alertProblem").style.display = "block";
    }
}, false);

resetButton.addEventListener('click', function() {
    try {
        editor.session.setValue(defaultCode);
    } catch (error) {
        console.log(error);
    }
}, false);