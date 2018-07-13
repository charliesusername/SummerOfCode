var player;
var pellet = [];

function setup() {
    createCanvas(400, 300);
    player = new Ship();
}

function draw() {
    background(0);

    player.update();
    player.render();

    console.log(pellet);
    for (var i = pellet.length - 1; i >= 0; i--) {
        
        pellet[i].update();
        pellet[i].render();if(pellet[i].y <= 0){
            pellet.splice(i,1);
        }
        

    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) { player.holdLeft = true; }
    if (keyCode === RIGHT_ARROW) { player.holdRight = true; }
    if (keyCode === 32) { player.shoot = true; }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW) { player.holdLeft = false; }
    if (keyCode === RIGHT_ARROW) { player.holdRight = false; }
    if (keyCode === 32) { player.shoot = false; }
}

class Ship {
    constructor(x, y) {
        this.x = width / 2 || x;
        this.y = height - 35 || y;
        this.velX = 0;
        this.pelletVelocity = 5;
        this.shoot = false;
        this.holdLeft = this.holdRight = false;

        this.shipWidth = 8;
        this.shipHeight = 20;
        this.wingHeight = 8;
        this.wingWidth = 10;
        this.noseHeight = 5;
        this.color = [255, 255, 255]
    }

    render() {
        fill(this.color);

        push();
        translate(this.x, this.y)
        scale(1.5)
        noStroke();
        //body
        rect(- this.shipWidth / 2, 0, this.shipWidth, this.shipHeight);
        //left wing
        triangle(this.shipWidth / 2, this.shipHeight - this.wingHeight,
            this.shipWidth / 2, this.shipHeight,
            this.shipWidth / 2 + this.wingWidth, this.shipHeight);
        //right wing
        triangle(0 - this.shipWidth / 2, this.shipHeight - this.wingHeight,
            0 - this.shipWidth / 2, 0 + this.shipHeight,
            0 - this.shipWidth / 2 - this.wingWidth, this.shipHeight);
        //nose
        triangle(-this.shipWidth / 2, 0,
            0, -this.noseHeight,
            this.shipWidth / 2, 0)
        pop();
    }

    update() {
        if(this.x > width - 50){
            this.holdRight = false;
        }
        
        if(this.x < 50){
            this.holdLeft = false;
        }

        if (this.holdLeft) {
            this.x += -1.8;
        }
        if (this.holdRight) {
            this.x += 1.8;
        }
        
        if(this.shoot === true){
            pellet.push(new Pellet(this.x, this.y));            
            console.log(pellet[pellet.length-1]);
            this.shoot = false; 
        }
    }
}

class Pellet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.v = -10;
        this.r = 10;
    }

    render() {
        fill(255);
        ellipse(this.x, this.y, this.r*3/5, this.r);
    }

    update() {

        this.y += this.v


    }
}