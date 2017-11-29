"use strict";

function commonDivisors(num1, num2) {
	const divisors = [1];
	const limit = Math.min(num1, num2) / 2;
	for (let i = 2; i < limit; i++) {
		if (num1 % i === 0 && num2 % i === 0) {
			divisors.push(i);
		}
	}
	return divisors;
}

function getSquaresWithLines(side) {
	const list = [];
	let currentX = 0;
	let currentY = 0;
	while (currentX < measureFractals.imageCanvas.width) {
		currentY = 0;
		while (currentY < measureFractals.imageCanvas.height) {
			if (isLineInSquare(currentX, currentY, side)) {
				list.push({
					x: currentX,
					y: currentY,
					side: side,
				});
			}
			currentY += side;
		}
		currentX += side;
	}
	return list;
}
