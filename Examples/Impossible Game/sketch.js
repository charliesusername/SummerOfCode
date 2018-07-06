var player;
var obstacles = [];
var objectWidth = 40;
var gravity;

var positions = [];


function setup() {
    createCanvas(600, 400);
    player = new Player();
    gravity = createVector(0, 0);


    //To Do
    //Randomize the type (0 = nothing, 1 = rect, 2 = triangle);
    //Delete when goes past the left wall
    //Create them
    for (let i = 0; i < 40; i++) {
        obstacles[i] = new Obstacle(width + objectWidth * i, height - 40, 'triangle')       
    }    
}

function keyPressed() {
    if(key === ' ' && player.jumping === false){
        player.jump();
        player.rotate();
        player.jumping = true;
    } 
}

function draw() {
    background(51);

    translate(-player.pos.x + 100, 0);
    
    if(player.pos.y < height){
        player.applyForce(gravity);
    }    
    
    player.update();
    player.render();
    

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].render();   
    }


    /* fill(255, 0, 100);
    noStroke();
    rect(310, height - 50, 50, 50); */
}