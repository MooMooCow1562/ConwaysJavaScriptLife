
//hardcoding the color values for now.
var livingColor = "#ffffff"; // Color of living cells
var ghostColor = "#aaaaaa"; // Color of ghost cells
var deadColor = "#000000"; // Color of dead cells

//before coding this version, I did not realize there were canvas like functions in UI systems, so I was using the equivelant of an
//ass load of div elements, like, too many.
//canvas-elements will be much better for this in future iterations.
//get the canvas, create a context.
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

//may may cell size adjustable later, will need to be changed via a form input so we have to reload the entire application to change it.
//cell size is in pixels
var cellSize = 10;

//fill the canvas with black, to represent the initial dead state of the game
context.fillStyle = "#000000"; // Background color
context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the background color
//our grids, Conway's game of life needs at least 2 grids and I beleive the names explan them.
var currentGrid = create2dArray(canvas.width / cellSize);
var nextGrid = create2dArray(canvas.width / cellSize);

//Need a 2D array, Javascript unfortunately does not have an easy way to make these so I'll just make a function to do it :D
create2dArray = (length) => {
    let arr = new Array(length);
    for (let i = 0; i < length; i++) {
        arr[i] = new Array(length).fill(0);
    }
    return arr;
}