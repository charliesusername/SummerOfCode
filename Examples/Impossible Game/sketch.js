var player;
var obstacles = [];
var obstacleWidth = 40

function setup() {
    createCanvas(600, 400);
    player = new Player();
    


    //To Do
    //Randomize the type (0 = nothing, 1 = rect, 2 = triangle);
    //Delete when goes past the left wall
    //Create them
    for (let i = 0; i < 40; i++) {
        obstacles[i] = new Obstacle(width + obstacleWidth * i, height - 40, 'triangle')
        
    }    
}

function keyPressed() {
    if(key == ' '){
        player.jump();
    } 
}

function draw() {
    background(51);

    var gravity = createVector(0, 0.5);
    if(player.pos.y < height){
        player.applyForce(gravity);
    }

    translate(-player.pos.x + 100, 0);

    
    player.update();
    player.render();

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].render();   
    }


    /* fill(255, 0, 100);
    noStroke();
    rect(310, height - 50, 50, 50); */
}

function keyIsPressed() {
    if (keyCode === ' ') {
        player.jump();
    }
}