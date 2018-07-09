var hero;
var step = [];
var blockSize = 40;
var grav = [0, 0.6];

function setup() {
    createCanvas(400, 400);
    hero = new Block(width / 5, 1, [255, 175, 9]);

    step[0] = new Block(3 * width / 5, 1, [140]);
    //step[1] = new Block(2 * width / 5, 2, [140]);
    //step[2] = new Block(4 * width / 5, 3, [140]);
}

function draw() {
    background(255);
    hero.render();
    for(var i = 0; i < step.length; i++){
        step[i].render();
    }   

    if(keyIsDown(RIGHT_ARROW)){
        hero.vel.x = 3;
    } else if(keyIsDown(LEFT_ARROW)){
        hero.vel.x = -3;
    } else {
        hero.vel.x = 0;
    }
    for(var i = 0; i < step.length; i++){
        hero.collide(step[i]);
    }

    hero.update();
    hero.applyForce(grav);
}


// this relates to jumping
function keyPressed() {
    if (keyCode === UP_ARROW && hero.jumping === false) {
        hero.vel.y = -15;
        hero.jumping = true;
    }
}
function keyReleased() {
    if (hero.vel.y < 0) {
        hero.vel.y = 0;
    }
}

function Block(sx, sy, col) {
    this.r = blockSize;
    this.color = col;
    this.jumping = false;
    
    this.pos = createVector(sx, height - this.r * sy);
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0);
    this.level = floor((height - this.pos.y)/this.r);

    this.render = function () {
        noStroke();
        fill(this.color);
        rect(this.pos.x, this.pos.y, this.r, this.r);
    }

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.update = function () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        if (this.pos.y > height - this.r * this.level) {
            this.pos.y = height - this.r * this.level;
            this.acc = createVector(0, 0);
            this.jumping = false;
        }
    }

    this.collide = function(other){
        var d = dist (this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if(d < this.r * 1.5){
            if(this.pos.x + this.r > other.pos.x && this.pos.x < other.pos.x + other.r){
                if(this.pos.y + this.r < other.pos.y){
                    this.level = other.level + 1;
                } 
            }   
        }   else {
            this.level = 1;
        }  
    }
}