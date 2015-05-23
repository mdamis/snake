var ctx;
var ctxWidth;
var ctxHeight;
var gameWidth = 25;
var gameHeight = 25;
var cellSize = 20;
var snake = [];

var direction = "down";

function Cell(x, y) {
	this.x = x;
	this.y = y;
}

function createSnake() {
	var snake = [];

	for(var i = 0; i < 5; i++) {
		snake.push(new Cell(12, 12 - i))
	}
	return snake;
}

window.onload = function() {
	var canvas = document.getElementById("snake");
	if(canvas.getContext) {
		ctx = canvas.getContext("2d");
		ctxWidth = canvas.width;
		ctxHeight = canvas.height;
		snake = createSnake();
		addEventListener("keydown", keyEvent);
		setInterval(draw, 100);
	}
}

function updatePosition() {
	var nextX = snake[0].x;
	var nextY = snake[0].y;
	switch(direction) {
		case "left":
			nextX = (nextX - 1 + gameWidth) % gameWidth;
			break;
		case "up":
			nextY = (nextY - 1 + gameHeight) % gameHeight;
			break;
		case "right":
			nextX = (nextX + 1 + gameWidth) % gameWidth;
			break;
		case "down":
			nextY = (nextY + 1 + gameHeight) % gameHeight;
			break;
		default:
	}
	var tail = snake.pop();
	tail.x = nextX;
	tail.y = nextY;
	snake.unshift(tail);
}

function draw() {
	updatePosition();
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	ctx.fillStyle = 'white';
	for(var i = 0; i < snake.length; i++) {
		var cell = snake[i];
		ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
	}
}

function keyEvent(event) {
	switch(event.keyCode) {
		case 37:
			direction = "left";
			break;
		case 38:
			direction = "up";
			break;
		case 39:
			direction = "right";
			break;
		case 40:
			direction = "down";
			break;
		default:
	}
}