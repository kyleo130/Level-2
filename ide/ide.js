ace.require("ace/ext/language_tools");
let editor = ace.edit("editor");
editor.setTheme("ace/theme/cobalt");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});


let defaultCode = 
`// You are given the following function:
// hit() -- Hit the door once

for () {

}`

editor.session.setValue(defaultCode);

let submitButton = document.getElementById("submit");
let resetButton = document.getElementById("reset")

let skeletonBefore = 
`
let count = 0;

function hit() {
    count += 1;
}

`

let skeletonAfter = 
`

count.valueOf();`

submitButton.addEventListener('click', function() {
    let code = editor.getValue();
    try {
        let result = eval(skeletonBefore + code + skeletonAfter);
        setSubmitted(true);
        setHitCount(result);
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
    } catch (error) {}
}, false);