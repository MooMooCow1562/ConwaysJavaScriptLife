//Will replace the commenting with more robust descriptions later, like, block comments.

//hardcoding cell values
const alive = 2;
const ghost = 1;
const dead = 0;

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
context.fillStyle = deadColor; // Background color
context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the background color

//our grids, Conway's game of life needs at least 2 grids and I beleive the names explan them.
var currentGrid = create2dArray(canvas.width / cellSize, canvas.height / cellSize);
var nextGrid = create2dArray(canvas.width / cellSize, canvas.height / cellSize);

//Need a 2D array, Javascript unfortunately does not have an easy way to make these so I'll just make a function to do it :D
function create2dArray(length, height) {
    let arr = new Array(height);
    for (let i = 0; i < height; i++) {
        arr[i] = new Array(length).fill(0);
    }
    return arr;
}

//draws a cell, given two coordinates, starting from the flattened coordinates and ending at the flattened coordinate + cell size.
//written to expect x and y values of a mouse clicking on the canvas, in other contexts like loops, I will need to multiply the coords by 10.
function drawCell(x, y) {
    normX = flattenCoordinate(x);
    normY = flattenCoordinate(y);
    if (currentGrid[normX / 10][normY / 10] == alive) {
        context.fillStyle = livingColor;
    } else if (currentGrid[normX / 10][normY / 10] == ghost) {
        context.fillStyle = ghostColor;
    } else {
        context.fillStyle = deadColor;
    }
    context.fillRect(normY, normX, normY + cellSize, normX + cellSize);
}

//Takes a coordinate and rounds it to the 10ths place.
function flattenCoordinate(v) {
    return (Math.floor(v / cellSize)) * cellSize;
}

function randomizeBoard() {
    for (let i = 0; i < (canvas.height / cellSize); i++) {
        for (let j = 0; j < (canvas.width / cellSize); j++) {
            var newVal = Math.floor(Math.random() * 3);//a random value between 0 and 2, hopefully.
            currentGrid[i][j] = newVal;
        }
    }
    //draw the board after randomizing the boards.
    drawBoard();
}

//draws board separately from the computations for the board.
function drawBoard(){
    for (let i = 0; i < (canvas.height / cellSize); i++) {
        for (let j = 0; j < (canvas.width / cellSize); j++) {
            drawCell(i * 10, j * 10);
        }
    }
}

//simply resets the board, for the user.
function clearBoard(){
    currentGrid = create2dArray(canvas.width / cellSize, canvas.height / cellSize);
    drawBoard();
}