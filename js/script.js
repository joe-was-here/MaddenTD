/* Author: Joe Madden */
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	units = [],
	tick = 0,
	blockedX = [],
    blockedY = [],
	hp = 1,
	unitId = 0,
	offset = $('#canvas').offset(),
	lives = 100,
	towers = [];


function buildPathingArrays(mapHeight, mapWidth, towerHeight, towerWidth) {
    var horizontalRows = mapHeight / towerHeight;
    var verticalRows = mapWidth / towerWidth;
    var xIterations = Math.floor(horizontalRows / 8);
    var yIterations = Math.floor(verticalRows / 8);
    var xLeftover = horizontalRows % 8;
    var yLeftover = verticalRows % 8;
    var i = 0;
    var x = 0;
    var y = 0;

    if (xLeftover > 0){
        do {
            blockedX[x] = towerWidth * x;
            x++;
        } while (--leftover > 0);
    }

    do {
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
    } while (--xIterations > 0);

    if (yLeftover > 0){
        do {
            blockedY[x] = towerWidth * x;
            y++;
        } while (--leftover > 0);
    }

    do {
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
    } while (--yIterations > 0);    
    

};

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

$(document).ready(function() {

	var mouseLocX;
	var mouseLocY;

    buildPathingArrays(canvas.height, canvas.width, 25, 25);

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
		console.log(blockedPath);
	});

	setInterval(loop,30);

	$('.remainingLives').html(100);

	function creepWave(numberOfUnits, speedOfUnits, defenseOfUnits, doUnitsFly) {

	};


});





