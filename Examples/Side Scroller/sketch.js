var hero;
var plats = [];
var grav = 0.5;
var holdLeft = holdRight = false;

function setup() {
    createCanvas(600, 400);

    hero = new Player(50, -50, 50, 50)

    for (var i = 0; i < 50; i++) {        
        plats[i] = new Brick(width + 400 * i, height - 100, 20, 100);        
    }

}

function draw() {
    background(35);
    strokeWeight(18);
    noFill();
    rect(0,0,width,height);

    hero.update();
    hero.render();

    for (var i = 0; i < plats.length; i++) {
        plats[i].render();
    }
}

function keyPressed(){
    if(keyCode === LEFT_ARROW){
        holdLeft = true;        
    }
    if(keyCode === UP_ARROW){
        if(hero.onGround === true){
            hero.vy = -hero.jump;
        }
    }
    if(keyCode === RIGHT_ARROW){
        holdRight = true;        
    }
}

function keyReleased(){
    if(keyCode === LEFT_ARROW){
        holdLeft = false;
    }
    if(keyCode === UP_ARROW){
        if(hero.vy < -3){
            hero.vy < -3;
        }
    }
    if (keyCode === RIGHT_ARROW){
        holdRight = false;

    }
}