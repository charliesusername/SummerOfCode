var player;
var pellet = [];
var enemies = [];
var particles = [];

function setup() {
    createCanvas(400, 150 * PI);
    player = new Ship();
    for (var i = 0; i < 10; i++) {
        enemies[i] = new Enemy(random(width), -random(height))
    }
}

function draw() {
    background(0);
    for (var i = pellet.length - 1; i >= 0; i--) {
        pellet[i].update();
        if (pellet[i].y <= 0) {
            pellet.splice(i, 1);
        }
        for (var j = enemies.length - 1; j >= 0; j--) {
            if (pellet[i].hit(enemies[j])) {
                pellet.splice(i, 1);
                enemies[j].destroy();
                enemies.splice(j, 1);
                break;
            }
        }
    }

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
        if(enemies[i].y - enemies[i].r >= height){
            //enemies[i] = new Enemy(random(width), -random(height));
            enemies.splice(i,1);
        }
    }
    for (var i = pellet.length - 1; i >= 0; i--) {        
        pellet[i].render();        
    }
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].render();
    }
    player.update();
    player.render();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) { player.holdLeft = true; }
    if (keyCode === RIGHT_ARROW) { player.holdRight = true; }
    if (keyCode === 32) { player.shoot = true; }
    if (keyCode === 49) { player.gunMode = 'lineGun' }
    if (keyCode === 50) { player.gunMode = 'sineGun' }
    if (keyCode === 51) { player.gunMode = 'rainbowGun' }
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

        this.gunMode = 'lineGun';
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
        stroke(0);
        strokeWeight(4);
        point(0, 0);
        pop();
    }

    update() {
        if (this.x > width - 50) {
            this.holdRight = false;
        }

        if (this.x < 50) {
            this.holdLeft = false;
        }

        if (this.holdLeft) {
            this.x += -1.8;
        }
        if (this.holdRight) {
            this.x += 1.8;
        }

        if (this.shoot === true) {
            pellet.push(new Pellet(this.x, this.y, this.gunMode));
            this.shoot = false;
        }
    }
}

class Pellet {
    constructor(x, y, type) {
        this.x = x;
        this.startX = x;
        this.y = y;
        this.startY = y;
        this.v = -3;
        this.r = 25;
        this.color = [255, 255, 255]

        this.gunType = type || 'lineGun'
        this.colorMix = 0

        this.amplitude = 100;
        this.omega = 3;
        this.phase = 0;

    }

    render() {
        fill(this.color);
        ellipse(this.x, this.y, this.r * 3 / 5, this.r);
    }

    update() {
        switch (this.gunType) {
            case 'lineGun':
                this.x = this.startX;
                break;
            case 'sineGun':
                angleMode(DEGREES);
                this.x = this.startX + this.amplitude * sin(this.omega * (this.y - this.startY) + this.phase);
                break;
            case 'rainbowGun':
                if (this.colorMix < 1) {
                    this.color = [random(255), random(255), random(255)];
                    this.colorMix += 1;
                }
                break;
        }
        this.y += this.v;
    }

    hit(other) {
        var d = dist(this.x, this.y, other.x, other.y);
        if (d < other.r) {
            return true;
        } else {
            return false;
        }
    }



}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 40;
        this.v = 1;

    }

    render() {
        fill(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    update() {
        this.y += this.v;
    }

    destroy(){
        particles.push(new particleField(this.x, this.y, this.v, this.r));
    }
}

class particleField{
    constructor(x,y,v,r){
        this.x = x;
        this.y = y;
        this.v = v;
        this.r = r;        
    }

}

