var ctx;
var ctxWidth;
var ctxHeight;
var gameWidth = 25;
var gameHeight = 25;
var cellSize = 20;
var snake = [];
var walls = [];

var currentDirection = "";
var nextDirection = "";

function Cell(x, y) {
	this.x = x;
	this.y = y;
}

function createWalls() {
	var walls = [];

	walls.push(new Cell(0, 0));
	walls.push(new Cell(1, 0));
	walls.push(new Cell(0, 1));

	return walls;
}

function createSnake(startX, startY, length) {
	var snake = [];

	for(var i = 0; i < length; i++) {
		snake.push(new Cell(startX, startY))
	}
	return snake;
}

window.onload = function() {
	var canvas = document.getElementById("snake");
	if(canvas.getContext) {
		ctx = canvas.getContext("2d");
		ctxWidth = canvas.width;
		ctxHeight = canvas.height;
		snake = createSnake(12, 12, 5);
		walls = createWalls();
		addEventListener("keydown", keyEvent);
		setInterval(draw, 100);
	}
}

function updatePosition() {
	var nextX = snake[0].x;
	var nextY = snake[0].y;
	switch(nextDirection) {
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

	currentDirection = nextDirection;
	var tail = snake.pop();
	tail.x = nextX;
	tail.y = nextY;
	snake.unshift(tail);
}

function draw() {
	updatePosition();
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	ctx.fillStyle = 'red';
	for(var i = 0; i < snake.length; i++) {
		var cell = snake[i];
		ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
	}

	ctx.fillStyle = 'white';
	for(var i = 0; i < walls.length; i++) {
		var wall = walls[i];
		ctx.fillRect(wall.x * cellSize, wall.y * cellSize, cellSize, cellSize);
	}
}

function keyEvent(event) {
	if(event.keyCode === 37 && currentDirection !== "right") {
		nextDirection = "left";
	} else if(event.keyCode === 38 && currentDirection !== "down") {
		nextDirection = "up";
	} else if(event.keyCode === 39 && currentDirection !== "left") {
		nextDirection = "right";
	} else if(event.keyCode === 40 && currentDirection !== "up") {
		nextDirection = "down";
	}
}