"use strict";

measureFractals.input = document.getElementById("input");
measureFractals.paint = document.getElementById("paint");
measureFractals.execute = document.getElementById("execute");

function inputListener(inputEvent) {
	const file = inputEvent.target.files[0];

	const reader = new FileReader();
	reader.addEventListener("loadend", (readerEvent) => {
		const image = readerEvent.target.result;

		const src_image = new Image();
		src_image.onload = () => {
			measureFractals.imageCanvas.parentNode.style.height = src_image.height + "px";
			measureFractals.imageCanvas.parentNode.style.width = src_image.width + "px";
			measureFractals.imageCanvas.height = src_image.height;
			measureFractals.imageCanvas.width = src_image.width;
			measureFractals.gridCanvas.height = src_image.height;
			measureFractals.gridCanvas.width = src_image.width;
			measureFractals.imageCanvas.style.height = src_image.height + "px";
			measureFractals.imageCanvas.style.width = src_image.width + "px";
			measureFractals.gridCanvas.style.height = src_image.height + "px";
			measureFractals.gridCanvas.style.width = src_image.width + "px";
			measureFractals.imageContext.drawImage(src_image, 0, 0);
		};
		src_image.src = image;
	});
	reader.readAsDataURL(file);
}

measureFractals.input.addEventListener("change", inputListener);

function paintListener() {
	measureFractals.gridCanvas.addEventListener("mousemove", findxy);
	measureFractals.gridCanvas.addEventListener("mousedown", findxy);
	measureFractals.gridCanvas.addEventListener("mouseup", findxy);
	measureFractals.gridCanvas.addEventListener("mouseout", findxy);
}

measureFractals.paint.addEventListener("click", paintListener);

function execute() {
	measureFractals.gridCanvas.removeEventListener("mousemove", findxy);
	measureFractals.gridCanvas.removeEventListener("mousedown", findxy);
	measureFractals.gridCanvas.removeEventListener("mouseup", findxy);
	measureFractals.gridCanvas.removeEventListener("mouseout", findxy);
	measureFractals.gridCanvas.width = measureFractals.imageCanvas.width;
	measureFractals.gridCanvas.height = measureFractals.imageCanvas.height;

	const divisors = commonDivisors(measureFractals.imageCanvas.width, measureFractals.imageCanvas.height);
	let i = divisors.length - 1;
	const interval = setInterval(() => {
		drawGrid(divisors[i]);
		i--;
		if (i < 0) {
			clearInterval(interval);
		}
	}, 1);
}

measureFractals.execute.addEventListener("click", execute);
