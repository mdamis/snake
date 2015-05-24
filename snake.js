var ctx;
var ctxWidth;
var ctxHeight;
var gameWidth = 25;
var gameHeight = 25;
var cellSize = 20;
var snake = [];
var walls = [];
var food;
var intervalID;

var currentDirection = "";
var nextDirection = "";

function Cell(x, y) {
	this.x = x;
	this.y = y;
}

window.onload = function() {
	var canvas = document.getElementById("snake");
	if(canvas.getContext) {
		ctx = canvas.getContext("2d");
		ctxWidth = canvas.width;
		ctxHeight = canvas.height;
		startGame();
	}
}

function startGame() {
	snake = createSnake(12, 12, 5);
	walls = createWalls();
	food = createFood();
	addEventListener("keydown", inGameKeyEvent);
	intervalID = setInterval(play, 60);
}

function createWalls() {
	var walls = [];

	walls.push(new Cell(0, 0));
	walls.push(new Cell(1, 0));
	walls.push(new Cell(0, 1));

	walls.push(new Cell(gameWidth - 1, 0));
	walls.push(new Cell(gameWidth -2, 0));
	walls.push(new Cell(gameWidth - 1, 1));

	walls.push(new Cell(0, gameHeight - 1));
	walls.push(new Cell(0, gameHeight - 2));
	walls.push(new Cell(1, gameHeight - 1));

	walls.push(new Cell(gameWidth - 1, gameHeight - 1));
	walls.push(new Cell(gameWidth - 1, gameHeight - 2));
	walls.push(new Cell(gameWidth - 2, gameHeight - 1));

	return walls;
}

function createSnake(startX, startY, length) {
	var snake = [];

	for(var i = 0; i < length; i++) {
		snake.push(new Cell(startX, startY))
	}
	return snake;
}

function nextPosition() {
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
			return;
	}
	return {x: nextX, y: nextY};
}

function updatePosition(x, y) {
	if(isEatingFood(x, y)) {
		snake.unshift(new Cell(x, y));
		food = createFood();
	} else {
		var tail = snake.pop();
		tail.x = x;
		tail.y = y;
		snake.unshift(tail);
	}

	currentDirection = nextDirection;
}

function play() {
	var position = nextPosition();

	if(position) {
		if(isColliding(position.x, position.y)) {
			clearInterval(intervalID);
			removeEventListener("keydown", inGameKeyEvent);
			retry("Game Over");
			return;
		} else {
			updatePosition(position.x, position.y);
		}
	}
	
	draw();
}

function isEatingFood(x, y) {
	return food.x === x && food.y === y;
}

function isColliding(x, y) {
	for(var i = 0; i < walls.length; i++) {
		if(walls[i].x === x && walls[i].y === y) {
			return true;
		}
	}

	for(var i = 0; i < snake.length; i++) {
		if(snake[i].x === x && snake[i].y === y) {
			return true;
		}
	}
	return false;
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

function retry(message) {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	if(message) {
		ctx.fillStyle = 'white';
		ctx.font = "45px Arial";

		ctx.fillText(message, (ctxWidth - ctx.measureText(message).width) / 2, 100);

		ctx.font = "30px Arial";
		message = "Press Enter to Retry"
		ctx.fillText(message, (ctxWidth - ctx.measureText(message).width) / 2, 300);
	}

	addEventListener("keydown", waitForEnterKey);
}

function waitForEnterKey(event) {
	if(event.keyCode === 13) {
		startGame();
		removeEventListener("keydown", waitForEnterKey);
	}
}

function inGameKeyEvent(event) {
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