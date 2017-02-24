'use strict';

var player,lineColor,canvas,context,canvasSize,sectionSize,board,declaredWinner,squares_arr;

document.addEventListener('DOMContentLoaded', startGame, false);

function startGame() {
	player = 1;
	lineColor = "#ddd";
	declaredWinner = false;
	squares_arr = new Array();
	canvas = document.getElementById('tic-tac-toe-board');
	context = canvas.getContext('2d');

	canvasSize = 500;
	sectionSize = canvasSize / 3;
	canvas.width = canvasSize;
	canvas.height = canvasSize;
	context.translate(0.5, 0.5);	

	board = getInitialBoard("");
	drawLines(10, lineColor);

	canvas.addEventListener('mouseup', function (event) {
		if (declaredWinner) return;
		var canvasMousePosition = getCanvasMousePosition(event);
		addPlayingPiece(canvasMousePosition);
		drawLines(10, lineColor);
	});
	
	var xCordinate;
	var yCordinate;
	for (var x = 0;x < 3;x++) {
		for (var y = 0;y < 3;y++) {
			squares_arr.push(false);
			xCordinate = x * sectionSize;
			yCordinate = y * sectionSize;
		}
	}
	
}


function getInitialBoard (defaultValue) {
	var board = [];
	for (var x = 0;x < 3;x++) {
		board.push([]);
		for (var y = 0;y < 3;y++) {
			board[x].push(defaultValue);
		}
	}
	return board;
}


function addPlayingPiece (mouse) {
	var xCordinate;
	var yCordinate;
	var count = 0;
	for (var x = 0;x < 3;x++) {
		for (var y = 0;y < 3;y++) {
			xCordinate = x * sectionSize;
			yCordinate = y * sectionSize;
			if (mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize && mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize) {
				if (squares_arr[count]) return;
				squares_arr[count] = player;
				if (player === 1) {
					player = 2;
					drawX(xCordinate, yCordinate);
				} else {
					player = 1;
					drawO(xCordinate, yCordinate);
				}
				checkWinner();
			}
			count++;
		}
	}
}

function checkWinner() {
	if(squares_arr[0] && squares_arr[0] == squares_arr[1] && squares_arr[0] == squares_arr[2]) showWinner(squares_arr[0]);
	if(squares_arr[3] && squares_arr[3] == squares_arr[4] && squares_arr[3] == squares_arr[5]) showWinner(squares_arr[3]);
	if(squares_arr[6] && squares_arr[6] == squares_arr[7] && squares_arr[6] == squares_arr[8]) showWinner(squares_arr[6]);
	if(squares_arr[0] && squares_arr[0] == squares_arr[3] && squares_arr[0] == squares_arr[6]) showWinner(squares_arr[0]);
	if(squares_arr[1] && squares_arr[1] == squares_arr[4] && squares_arr[1] == squares_arr[7]) showWinner(squares_arr[1]);
	if(squares_arr[2] && squares_arr[2] == squares_arr[5] && squares_arr[2] == squares_arr[8]) showWinner(squares_arr[2]);
	if(squares_arr[0] && squares_arr[0] == squares_arr[4] && squares_arr[0] == squares_arr[8]) showWinner(squares_arr[0]);
	if(squares_arr[2] && squares_arr[2] == squares_arr[4] && squares_arr[2] == squares_arr[6]) showWinner(squares_arr[2]);
}

function showWinner(winner){
	console.log("player "+winner+" wins!");
	declaredWinner = true;
}

function drawO (xCordinate, yCordinate) {
	var halfSectionSize = (0.5 * sectionSize);
	var centerX = xCordinate + halfSectionSize;
	var centerY = yCordinate + halfSectionSize;
	var radius = (sectionSize - 100) / 2;
	var startAngle = 0 * Math.PI; 
	var endAngle = 2 * Math.PI;

	context.lineWidth = 10;
	context.strokeStyle = "#01bBC2";
	context.beginPath();
	context.arc(centerX, centerY, radius, startAngle, endAngle);
	context.stroke();
}

function drawX (xCordinate, yCordinate) {
	context.strokeStyle = "#f1be32";
	context.beginPath();
	var offset = 50;
	context.moveTo(xCordinate + offset, yCordinate + offset);
	context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);
	context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
	context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);
	context.stroke();
}

function drawLines (lineWidth, strokeStyle) {
	var lineStart = 4;
	var lineLenght = canvasSize - 5;
	context.lineWidth = lineWidth;
	context.lineCap = 'round';
	context.strokeStyle = strokeStyle;
	context.beginPath();
	for (var y = 1;y <= 2;y++) {  
		context.moveTo(lineStart, y * sectionSize);
		context.lineTo(lineLenght, y * sectionSize);
	}
	for (var x = 1;x <= 2;x++) {
		context.moveTo(x * sectionSize, lineStart);
		context.lineTo(x * sectionSize, lineLenght);
	}
	context.stroke();
}

function getCanvasMousePosition (event) {
	var rect = canvas.getBoundingClientRect();

	return {x: event.clientX - rect.left,y: event.clientY - rect.top};
}

