var ctx;
var ctxWidth;
var ctxHeight;
var gameWidth = 25;
var gameHeight = 25;
var cellSize = 20;

var x = 12;
var y = 12;

var direction = "down";

window.onload = function() {
	var canvas = document.getElementById("snake");
	if(canvas.getContext) {
		ctx = canvas.getContext("2d");
		ctxWidth = canvas.width;
		ctxHeight = canvas.height;
		addEventListener("keydown", keyEvent);
		setInterval(draw, 100);
	}
}

function updatePosition() {
	switch(direction) {
		case "left":
			x = (x - 1 + gameWidth) % gameWidth;
			break;
		case "up":
			y = (y - 1 + gameHeight) % gameHeight;
			break;
		case "right":
			x = (x + 1 + gameWidth) % gameWidth;
			break;
		case "down":
			y = (y + 1 + gameHeight) % gameHeight;
			break;
		default:
	}
}

function draw() {
	updatePosition();
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	ctx.fillStyle = 'white';
	ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
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