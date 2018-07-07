var player;
var obstacles = [];
var objectWidth = 40;
var gravity;
var lineY;
var lines = []
var positions = [];
var pick;
var obType;
var velocity = 2;
var newSet = true;
var i = 0;
var level = 0;
function setup() {
    createCanvas(600, 400);
    player = new Player();
    gravity = createVector(0, 0.8);


    
    // this code creates a random level that is 400 object lengths long
    for (let i = 0; i < 1; i++) {
        pick = floor(random(4));
        if(pick === 0){
            obType = 'r';                        
        } else if(pick > 1){
            obType = 'n';                        
        } 
        obstacles[i] = new Obstacle(width + objectWidth * i, height - 40, obType)     
    }  
}

function keyPressed() {
    if (key === ' ' && player.jumping === false) {
        player.jump();
        player.rotate();
        player.jumping = true;
    }
}

function draw() {
    background(51);

    for (var i = 0; i < height; i += objectWidth) {
        lineY = i + objectWidth / 2;
        lines.push(lineY);
        stroke(255);
        strokeWeight(1);
        line(0, lineY, width, lineY);
        stroke(0);
        strokeWeight(1);
        line(0, lineY - objectWidth / 2, width, lineY - objectWidth / 2);
    }
    for(var i = 0; i < floor(width/objectWidth); i++){
        stroke(255);
        strokeWeight(1);
        line(objectWidth * i, 0, objectWidth * i, height);
    }
    
    translate(-player.pos.x + 100, 0);

    if (player.pos.y < height) {
        player.applyForce(gravity);
    }

    player.update();
    player.render();
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].render();
        /* if(obstacles[i].pos.x < player.pos.x - 100){
            pick = floor(random(5));
            if(pick === 0){
                obType = 'r';                        
            } else if(pick > 1){
                obType = 'n';                        
            } 
            obstacles[i] = new Obstacle(player.pos.x + 500, height-40, obType);
        } */
        player.interact(obstacles[i]);
    }




}