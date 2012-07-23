/*
Unit starts moving left to right +x
Unit checks for obstacles

    if unit encounters obstacle
        unit checks if it's connected to the wall in either direction

            if the obstacle is connected to a wall
                unit moves in the opposite direction

            else unit checks for the mid y point of the obstacle
            unit compares mid y point to it's current position

                if units current position has a y value that is greater than the current mid y point
                    unit moves down +y

                else
                    unit moves up -y

    else it keeps going
*/

function whichWayShouldIGo() {
    switch (direction) {
        
        case 'up':
            break;
        
        case 'down':
            break;
        
        case 'left':
            break;
        
        default:
            if (nextBlock === 'blocked') {
                if (nextBlock.wallConnected) {
                    nextBlock.wallConnected === 'top' ? direction = 'down' : direction = 'up';
                } else {
                    nextBlock.midPoint >= currPosition.y ? direction = 'up' : direction = 'down';
                }
            }
            break;
    } 
};