/* Author: Joe
*/

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    units = [],
    unitId = 0,
    hp = 1,
    level = 1,
    lives = 100;

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

function killUnits() {
    for(var i in units) {
        var part = units[i];
        if(part.x > canvas.width) {
            part.x = 0;
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

function drawTowers() { 
    drawSquare(300, 300, 50, 50, 'green');
    drawSquare(400, 400, 50, 50, 'green');
    drawSquare(500, 500, 50, 50, 'green');
    drawSquare(500, 200, 50, 50, 'green');
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

function creepWave(numberOfUnits, speedOfUnits, defenseOfUnits, doUnitsFly) {

};

function logUnits() {
    console.log(units);
};

$(document).ready(function() {

	function loop() {
    	generateUnits();
    	updateUnits();
    	killUnits();
    	drawUnits();
    	drawTowers();
	};

    setInterval(logUnits,5000);

	setInterval(loop,25);


});





