"use strict";

const measureFractals = {};
measureFractals.imageCanvas = document.getElementById("imageCanvas");
measureFractals.gridCanvas = document.getElementById("gridCanvas");
measureFractals.imageCanvasCSS = getComputedStyle(measureFractals.imageCanvas);
measureFractals.gridCanvasCSS = getComputedStyle(measureFractals.imageCanvas);
measureFractals.imageCanvas.height = parseInt(measureFractals.imageCanvasCSS.getPropertyValue("height"));
measureFractals.imageCanvas.width = parseInt(measureFractals.imageCanvasCSS.getPropertyValue("width"));
measureFractals.gridCanvas.height = parseInt(measureFractals.imageCanvasCSS.getPropertyValue("height"));
measureFractals.gridCanvas.width = parseInt(measureFractals.imageCanvasCSS.getPropertyValue("width"));
measureFractals.imageContext = measureFractals.imageCanvas.getContext("2d");
measureFractals.gridContext = measureFractals.gridCanvas.getContext("2d");

measureFractals.sensitivity = document.getElementById("sensitivity");

function isLineInSquare(x, y, side) {
	const pixels = measureFractals.imageContext.getImageData(x, y, side, side).data;
	const sensitivity = measureFractals.sensitivity.value;
	for (let i = 0; i < pixels.length - 1; i += 4) {
		if ((pixels[i] < sensitivity || pixels[i + 1] < sensitivity || pixels[i + 2] < sensitivity) &&
			pixels[i + 3] > 255 - sensitivity) {
			return true;
		}
	}
	return false;
}

function drawSquaresWithLines(side) {
	const listOfSquares = getSquaresWithLines(side);
	console.log("Side: " + side + " - Squares: " + listOfSquares.length);
	measureFractals.gridContext.globalAlpha = 0.3;
	measureFractals.gridContext.fillStyle = "#0000ff";
	for (const square of listOfSquares) {
		measureFractals.gridContext.fillRect(square.x, square.y, square.side, square.side);
	}
}

function drawGrid(separation) {
	measureFractals.gridContext.clearRect(0, 0, measureFractals.imageCanvas.width, measureFractals.imageCanvas.height);

	if (separation < 4) {
		drawSquaresWithLines(separation);
		return;
	}

	let currentHGrid = separation;
	let currentVGrid = separation;
	measureFractals.gridContext.beginPath();
	while (currentHGrid < measureFractals.imageCanvas.height) {
		measureFractals.gridContext.moveTo(0, currentHGrid);
		measureFractals.gridContext.lineTo(measureFractals.imageCanvas.width, currentHGrid);
		currentHGrid += separation;
	}
	while (currentVGrid < measureFractals.imageCanvas.width) {
		measureFractals.gridContext.moveTo(currentVGrid, 0);
		measureFractals.gridContext.lineTo(currentVGrid, measureFractals.imageCanvas.height);
		currentVGrid += separation;
	}
	measureFractals.gridContext.globalAlpha = 0.5;
	measureFractals.gridContext.strokeStyle = "#000000";
	measureFractals.gridContext.lineWidth = 1;
	measureFractals.gridContext.stroke();
	drawSquaresWithLines(separation);
}
