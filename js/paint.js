"use strict";

let flag = false;
let prevX = 0;
let currX = 0;
let	prevY = 0;
let currY = 0;

function draw() {
	measureFractals.imageContext.beginPath();
	measureFractals.imageContext.moveTo(prevX, prevY);
	measureFractals.imageContext.lineTo(currX, currY);
	measureFractals.imageContext.globalAlpha = 1;
	measureFractals.imageContext.strokeStyle = "black";
	measureFractals.imageContext.lineWidth = 1;
	measureFractals.imageContext.stroke();
	measureFractals.imageContext.closePath();
}

function findxy(e) {
	if (e.type === "mousedown") {
		prevX = currX;
		prevY = currY;
		currX = e.clientX - measureFractals.imageCanvas.parentNode.offsetLeft - measureFractals.imageCanvas.offsetLeft;
		currY = e.clientY - measureFractals.imageCanvas.parentNode.offsetTop - measureFractals.imageCanvas.offsetTop;

		flag = true;
	}
	if (e.type === "mouseup" || e.type === "mouseout") {
		flag = false;
	}
	if (e.type === "mousemove") {
		if (flag) {
			prevX = currX;
			prevY = currY;
			currX = e.clientX - measureFractals.imageCanvas.parentNode.offsetLeft - measureFractals.imageCanvas.offsetLeft;
			currY = e.clientY - measureFractals.imageCanvas.parentNode.offsetTop - measureFractals.imageCanvas.offsetTop;
			draw();
		}
	}
}
