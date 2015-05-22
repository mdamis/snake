var ctxWidth;
var ctxHeight;
var gameWidth = 25;
var gameHeight = 25;
var cellSize = 20;

var x = 12;
var y = 12;

window.onload = function() {
	var canvas = document.getElementById("snake");
	if(canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctxWidth = canvas.width;
		ctxHeight = canvas.height;
		draw(ctx);
	}
}

function draw(context) {
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 0, ctxWidth, ctxHeight);

	context.fillStyle = 'white';
	context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
}