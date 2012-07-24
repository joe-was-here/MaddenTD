/* Author: Joe Madden */
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	units = [],
	tick = 0,
	blockedX = [],
    blockedY = [],
    gridArray = [],
	hp = 1,
	unitId = 0,
	offset = $('#canvas').offset(),
	lives = 100,
	towers = [],
	runScript = false;

function Tower(type, topLeft, topRight, botRight, botLeft, towerHeight, towerWidth) {
	this.type = type;
	this.topLeft = topLeft;
	this.topRight = topRight;
	this.botRight = botRight;
	this.botLeft = botLeft;
	this.towerMid = [topLeft[1] + (towerWidth / 2), topLeft[0] + (towerHeight / 2)];
};

function buildPathingArrays(mapHeight, mapWidth, towerHeight, towerWidth) {
    var horizontalRows = mapHeight / towerHeight;
    var verticalRows = mapWidth / towerWidth;
    var xIterations = Math.floor(horizontalRows / 8);
    var yIterations = Math.floor(verticalRows / 8);
    var gridSections = horizontalRows * verticalRows;
    var gridLoops = Math.floor(gridSections / 8);
    var xRemainder = horizontalRows % 8;
    var yRemainder = verticalRows % 8;
    var gridRemainder = gridSections % 8;
    var i = 0;
    var x = 0;
    var y = 0;
    var gridX = 1;
    var iY = 1;
    var iX = 1;

    for (var yTest = 1; yTest <= horizontalRows; yTest++) {
    	for (var xTest = 1; xTest <= verticalRows; xTest++) {
    		gridArray.push([yTest + ' x ' + xTest, 'empty']);
    	}
    }


    if (xRemainder > 0) {
        do {
            blockedX[x] = towerWidth * iX;
            x++;
            iX++;
        } while (--xRemainder > 0);
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

    if (yRemainder > 0) {
        do {
            blockedY[y] = towerHeight * iY;
            y++;
            iY++;
        } while (--yRemainder > 0);
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
    
    console.log(blockedX);
    console.log(blockedY);
    console.log(gridArray);


};

function generateUnits() {
    //add particle if fewer than 100
    while (unitId < 100) {
        units.push({
            x: 0,
            y: 350 - (Math.random() * 100), //between 0 and canvas width
            direction: 'right',
            speed: .5+Math.random()*.4, //between 2 and 5
            radius: 5+Math.random()*2, //between 5 and 10
            color: "black",
            id: unitId
        });
        unitId++;
    }
};

function updateUnits() {

	var towerWidth = blockedX[1] - blockedX[0];
	var towerHeight = blockedY[1] - blockedY[0];

	for (var i in units) {
		var part = units[i];
		var nearestVerticalSection = part.speed > 0 ? Math.ceil(part.x / towerHeight) * towerHeight : Math.floor(part.x / towerHeight) * towerHeight;
		var nearestHorizontalSection = part.speed > 0 ? Math.floor(part.y / towerWidth) * towerWidth : Math.ceil(part.y / towerWidth) * towerWidth;
		var nearestVerticalSectionArrayNum = nearestVerticalSection / 25;
		var nearestHorizontalSectionArrayNum = nearestHorizontalSection / 25;
		var nextGridSection = nearestVerticalSectionArrayNum + ' x ' + nearestHorizontalSectionArrayNum;
		var nearestVerticalSectionBlocked = typeof blockedY[nearestVerticalSectionArrayNum] === 'object' ? true : false;
		var nearestHorizontalSectionBlocked = typeof blockedX[nearestHorizontalSectionArrayNum] === 'object' ? true : false;
		var direction;
		var gridArrayNum;
    	nearestHorizontalSectionArrayNum !== 1 ? gridArrayNum = ((nearestHorizontalSectionArrayNum * 44) + nearestVerticalSectionArrayNum) : gridArrayNum = nearestVerticalSectionArrayNum;

		if (typeof gridArray[gridArrayNum][1] === 'object') {
			var blockingTowersMidX = gridArray[gridArrayNum][1].towerMid[1];
			var blockingTowersMidY = gridArray[gridArrayNum][1].towerMid[0];
			var keepGoing;

			if (part.x >= blockingTowersMidX - 25 && part.y <= blockingTowersMidY) {
				keepGoing = true;
			} else {
				keepGoing = false;
			}
				
			console.log(keepGoing)

			if (part.x >= (blockingTowersMidX - 25)) {
				part.y += part.speed;
			} else {
				part.x += part.speed;
			}
		} else {
			part.x += part.speed;
		}

		//if (part.direction !== 'right' || part.direction !== 'down') {
		//	part.speed = -(part.speed);
		//}
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
    

    for (var i in units) {
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

function placeTower(clickedX, clickedY, towerWidth, towerHeight, towerType) {
	
	if (clickedX == 0) {
		clickedX = towerWidth;
	} else if (clickedX > 0) {
		clickedX = Math.ceil(clickedX/towerWidth) * towerWidth;
	} else if (clickedX == ctx.height) {
		clickedX = ctx.height;
	}

	if (clickedY == 0) {
		clickedY = towerHeight;
	} else if (clickedY > 0) {
		clickedY = Math.ceil(clickedY / towerHeight) * towerHeight;
	} else if (clickedY == ctx.height) {
		clickedY = ctx.height;
	}

	var topLeft = [clickedX - 25, clickedY - 25];
	var topRight = [clickedX, clickedY - 25];
	var botRight = [clickedX, clickedY];
	var botLeft = [clickedX - 25, clickedY];
	var towerId = towerType + clickedX + clickedY;
    var xPosition = (clickedX / towerWidth) - 1;
    var yPosition = (clickedY / towerHeight) - 1;
    var xPos = xPosition + 1;
    var yPos = yPosition + 1;
    var gridArrayNum;

    yPos !== 1 ? gridArrayNum = ((yPosition * 44) + xPos) - 1 : gridArrayNum = xPosition;


	if (typeof gridArray[gridArrayNum][1] === 'string') {

		towers.push({
			startingX: clickedX,
			startingY: clickedY
		});

	    gridArray[gridArrayNum][1] = new Tower('arrow', topLeft, topRight, botRight, botLeft, towerHeight, towerWidth);

	    console.log(gridArray);

	}


	// if (typeof blockedX[yPosition] === 'number' || typeof blockedY[xPosition] === 'number') {

	// 	towers.push({
	// 		startingX: clickedX,
	// 		startingY: clickedY
	// 	});

	//     blockedX[yPosition] = new Tower('arrow', topLeft, topRight, botRight, botLeft, towerHeight, towerWidth);
	//     blockedY[xPosition] = new Tower('arrow', topLeft, topRight, botRight, botLeft, towerHeight, towerWidth);

	//     console.log(blockedX);
 //        console.log(blockedY);

	// }

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

function appControl(switchButton) {
	if (switchButton.attr('id') == 'switchOn') {
		runScript = true;
		switchButton.attr('id', 'switchOff');
		switchButton.html('On');
	} else {
		runScript = false;
		switchButton.attr('id', 'switchOn');
		switchButton.html('Off');
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

	$('.switcher').click(function() {
		var that = $(this);
		appControl(that);
	});

	function loop() {
		if (runScript) {
	    	generateUnits();
	    	updateUnits();
	    	killUnits();
	    	drawUnits();
	    	drawGrid();
	    	drawTowers();
	    } else {
	    	return false;
	    }
	};

	$(canvas).mousedown(function() {
		placeTower(mouseLocX, mouseLocY, 25, 25);
	});

	setInterval(loop,30);

	$('.remainingLives').html(100);


});





