var ctx;
var ctxWidth;
var ctxHeight;
var gameWidth = 25;
var gameHeight = 25;
var cellSize = 20;
var snake = [];
var walls = [];
var food;

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
		food = createFood();
		addEventListener("keydown", keyEvent);
		setInterval(draw, 60);
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

	if(isEatingFood(nextX, nextY)) {
		snake.unshift(new Cell(nextX, nextY));
		food = createFood();
	} else {
		var tail = snake.pop();
		tail.x = nextX;
		tail.y = nextY;
		snake.unshift(tail);
	}

	currentDirection = nextDirection;
}

function isEatingFood(x, y) {
	return food.x === x && food.y === y;
}

function createFood() {
	var emptyCells = [];
	widthLoop:
	for(var i = 0; i < gameWidth; i++) {
		heightLoop:
		for(var j = 0; j < gameHeight; j++) {
			for(var k = 0; k < walls.length; k++) {
				if(walls[k].x === i && walls[k].y === j) {
					continue heightLoop;
				}
			}
			for(var k = 0; k < snake.length; k++) {
				if(snake[k].x === i && snake[k].y === j) {
					continue heightLoop;
				}
			}
			emptyCells.push({x:i, y:j});
		}
	}
	var index = randomInt(0, emptyCells.length);
	var position = emptyCells[index];
	return new Cell(position.x, position.y);
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
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

	ctx.fillStyle = 'yellow';
	ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
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