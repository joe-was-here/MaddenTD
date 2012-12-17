/* Author:
Joe
*/

$(document).ready(function() {
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	creeps = [],
	tick = 0;

	function loop() {
    	generateCreeps();
    	updateCreeps();
    	killCreeps();
    	drawCreeps();
    	drawTowers();
	};

	function generateCreeps() {
    	//check on every 10th tick check
    	if(tick % 10 == 0) {
        	//add particle if fewer than 100
        	if(creeps.length < 100) {
            	creeps.push({
                	x: 0,
                	y: Math.random()*canvas.width, //between 0 and canvas width,
                	speed: 1.3+Math.random()*1.3, //between 2 and 5
                	radius: 5+Math.random()*2, //between 5 and 10
                	color: "black",
            	});
        	}
    	}
	};

	function updateCreeps() {
    	for(var i in creeps) {
        	var part = creeps[i];
        	part.x += part.speed;
    	}
	};

	function killCreeps() {
    	for(var i in creeps) {
        	var part = creeps[i];
        	if(part.x > canvas.width) {
            	part.x = 0;
        	}
    	}
	};

	function drawCreeps() {
    	var c = canvas.getContext('2d');
    	c.fillStyle = "white";
    	c.fillRect(0,0,canvas.width,canvas.height);
    	for(var i in creeps) {
        	var part = creeps[i];
        	c.beginPath();
        	c.arc(part.x,part.y, part.radius, 0, Math.PI*2);
        	c.closePath();
        	c.fillStyle = part.color;
        	c.fill();
    	}
	};

	function drawTowers() { 
		drawSquare(300, 300, 50, 50, 'green');
		drawSquare(400, 400, 50, 50, 'green');
		drawSquare(500, 500, 50, 50, 'green');
		drawSquare(500, 200, 50, 50, 'green');
	};

	setInterval(loop,30);

	function drawCircle(centerX, centerY, radius, strokeColor) {
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
		ctx.strokeStyle = strokeColor;
		ctx.closePath();
		ctx.stroke();
	};

	function drawLine(startingPointX, startingPointY, endingPointX, endingPointY, strokeColor) {
		ctx.beginPath();
		ctx.moveTo(startingPointX, startingPointY);
		ctx.lineTo(endingPointX, endingPointY);
		ctx.closePath();
		ctx.strokeStyle = strokeColor;
		ctx.stroke();
	}

	function drawSquare(topLeftX, topLeftY, width, height, strokeColor) {
			ctx.beginPath();
			ctx.rect(topLeftX, topLeftY, width, height);
			ctx.closePath();
			ctx.strokeStyle = strokeColor;
			ctx.stroke();
	};

	function creepWave(numberOfCreeps, speedOfCreeps, defenseOfCreeps, doCreepsFly) {

	};


});





