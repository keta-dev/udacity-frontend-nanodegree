(function() {
    'use strict';

    // set variables
    const color = document.getElementById("colorPicker");
    const size = document.getElementById("sizePicker");
    const table = document.getElementById("pixelCanvas");

    // select grid size using event listeners
    size.addEventListener('submit', function(e) {
        e.preventDefault();

        // draw grid size
        let width = document.getElementById("inputWidth").value;
        let height = document.getElementById("inputHeight").value;
        makeGrid(width, height);
    });

// When size is submitted by the user, call makeGrid()

function makeGrid(width, height) {
    // Your code goes here!
    table.innerHTML = "";
    for (let row = 0; row < width; row++) {
        let newRow = table.insertRow();
        for (let col = 0; col < height; col++) {
            // add listener to change the colorPicker
            let newCell = newRow.insertCell();
            newCell.onclick = changeColorPicker;
        }
    }
}

// change color of the cell when clicked to a new color
function changeColorPicker() {
    this.style.backgroundColor = color.value;
}
})();