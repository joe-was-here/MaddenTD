/* Author: Joe Madden */
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	units = [],
	tick = 0,
	collisionDetection = [],
	hp = 1;
	unitId = 0;
	offset = $('#canvas').offset();
	lives = 100,
	towers = [];


function generateUnits() {
    //add particle if fewer than 100
    while (unitId < 100) {
        units.push({
            x: 0,
            y: Math.random()*canvas.width, //between 0 and canvas width
            speed: .5+Math.random()*.4, //between 2 and 5
            radius: 5+Math.random()*2, //between 5 and 10
            color: "black",
            id: unitId
        });
        unitId++;
    }

    // if(units.length < 100) {
    //     units.push({
    //         x: 0,
    //         y: Math.random()*canvas.width, //between 0 and canvas width,
    //         speed: 1.3+Math.random()*1.3, //between 2 and 5
    //         radius: 5+Math.random()*3, //between 5 and 10
    //         color: "black"
    //     });
    // }
};

function updateUnits() {
	for(var i in units) {
    	var part = units[i];
    	part.x += part.speed;
	}
};

function drawGrid() {
	var startX = 0,
		startY = 0,
		endX = canvas.width,
		endY = canvas.height;
	
	while (startX < endX) {
		ctx.moveTo(startX, 0);
		ctx.lineTo(startX, endY);
		ctx.strokeStyle = '#b9b9b9';
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.closePath();
		startX += 25;
	}

	while (startY < endY) {
		ctx.moveTo(0, startY);
		ctx.lineTo(endX, startY);
		ctx.strokeStyle = '#b9b9b9';
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.closePath();
		startY += 25;
	}

	// for (var i = 0; i < endX; i+5) {
	// 	if (i%10 == 0) {
	// 		ctx.moveTo(i, 0);
	// 		ctx.lineTo(i, endY);
	// 		ctx.strokeStyle = '#b9b9b9';
	// 		ctx.stroke();
	// 		ctx.lineWidth = 1;
	// 		ctx.closePath();
	// 		ctx.moveTo(0, i);
	// 		ctx.lineTo(endX, i);
	// 		ctx.strokeStyle = '#b9b9b9';
	// 		ctx.stroke();
	// 		ctx.lineWidth = 1;
	// 		ctx.closePath();
	// 	}
	// };
};

function killUnits() {
	for(var i in units) {
    	var part = units[i];
    	if(part.x > canvas.width) {
        	part.x = 0;
        	lives -= 1;
        	$('.remainingLives').html(lives);
    	}
	}
};

function drawUnits() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(var i in units) {
        var part = units[i];
        ctx.beginPath();
        ctx.arc(part.x,part.y, part.radius, 0, Math.PI*2);
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(part.id, part.x, part.y+18);
        ctx.closePath();
        ctx.fillStyle = part.color;
        ctx.fill();
    }
};

function placeTower(clickedX, clickedY) {
	if (clickedX == 0) {
		clickedX = 25;
	} else if (clickedX > 0) {
		clickedX = Math.ceil(clickedX/25) * 25;
	} else if (clickedX == ctx.height) {
		clickedX = ctx.height;
	}

	if (clickedY == 0) {
		clickedY = 25;
	} else if (clickedY > 0) {
		clickedY = Math.ceil(clickedY/25) * 25;
	} else if (clickedY == ctx.height) {
		clickedY = ctx.height;
	}

	towers.push({
		startingX: clickedX,
		startingY: clickedY
	});

	console.log($(towers)[0].startingY);

};

function drawTowers() {
	for (i in towers) {

		var clickedX = $(towers)[i].startingX;
		var clickedY = $(towers)[i].startingY;

		ctx.beginPath();
		ctx.moveTo(clickedX, clickedY);
		ctx.lineTo(clickedX - 25, clickedY -25);
		ctx.lineTo(clickedX, clickedY - 25);
		ctx.lineTo(clickedX, clickedY);
		ctx.lineTo(clickedX - 25, clickedY);
		ctx.lineTo(clickedX, clickedY - 25);
		ctx.moveTo(clickedX - 25, clickedY);
		ctx.lineTo(clickedX - 25, clickedY -25);
		ctx.closePath();
		ctx.strokeStyle =  'black';
		ctx.stroke();

	}
};

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

// function drawTowers() { 
// 	drawSquare(300, 300, 50, 50, 'black');
// 	drawSquare(400, 400, 50, 50, 'black');
// 	drawSquare(500, 500, 50, 50, 'black');
// 	drawSquare(500, 200, 50, 50, 'black');
// };

$(document).ready(function() {

	var mouseLocX;
	var mouseLocY;

	$('.mouseLocation').show();
	$('canvas').mousemove(function(e){
		var x = e.pageX - offset.left,
			y = e.pageY - offset.top;
			mouseLocX = x;
			mouseLocY = y;
			$('.mouseLocation').html('x = ' + x +', y = ' + y);
	});

	function loop() {
    	generateUnits();
    	updateUnits();
    	killUnits();
    	drawUnits();
    	drawGrid();
    	drawTowers();
	};

	$(canvas).mousedown(function() {
		placeTower(mouseLocX, mouseLocY);
	});

	setInterval(loop,30);

	$('.remainingLives').html(100);

	function creepWave(numberOfUnits, speedOfUnits, defenseOfUnits, doUnitsFly) {

	};


});





