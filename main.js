'use strict';

var player,lineColor,canvas,context,canvasSize,sectionSize,declaredWinner,squares_arr,winner_holder,winner_text;

document.addEventListener('DOMContentLoaded', startGame, false);

function startGame() {
	player = 1;
	lineColor = "#333";
	declaredWinner = false;
	squares_arr = new Array();
	winner_holder = document.getElementById('winner_holder');
	winner_text = document.getElementById('winner_text');
	canvas = document.getElementById('tic-tac-toe-board');
	context = canvas.getContext('2d');

	canvasSize = 500;
	sectionSize = canvasSize / 3;
	//canvas.width = canvasSize;
	canvas.width = window.innerWidth;
	//canvas.height = canvasSize;
	canvas.height = window.innerHeight;
	context.translate(0.5, 0.5);	
	context.font="150px Permanent Marker";
	drawLines(10, lineColor);

	canvas.addEventListener('mouseup', function (event) {
		if (declaredWinner) return;

		var rect = canvas.getBoundingClientRect();
		var canvasMousePosition = {x: event.clientX - rect.left,y: event.clientY - rect.top};
		
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
				
				var halfSectionSize = (0.25 * sectionSize);
				console.log(xCordinate);
				var centerX = xCordinate + halfSectionSize;
				var centerY = yCordinate + halfSectionSize + 85;
				
				if (player === 1) {
					player = 2;
					context.fillStyle = '#4935ef';
					context.fillText("x",centerX,centerY);
				} else {
					player = 1;
					context.fillStyle = '#27d81c';
					context.fillText("O",centerX,centerY);
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
	var winner_name = 'X';
	if (winner == 2) winner_name = 'O';
	winner_text.innerHTML = winner_name;
	winner_holder.style.display = "block";
	console.log("player "+winner+" wins!");
	declaredWinner = true;
}

function drawLines (lineWidth, strokeStyle) {
	var lineStart = 4;
	var lineLenght = canvasSize - 5;
	context.lineWidth = lineWidth;
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
