var grav = 0.6;
var plat = [];
var holdLeft = holdRight = false;

function setup() {
    createCanvas(500, 500);

    //create level using random procedure
    for (i = 0; i < 50; i++) {
        x = random() * width;
        y = random() * height;
        w = random() * 100 + 30;
        h = random() * 30 + 20;
        plat[i] = new Block(x, y, w, h, [0, 0, 0]);
    }

    // create player
    hero = new Block(20, height - 100, 20, 20, [0, 130, 0]);
}

function draw() {
    background(255);

    for (i = 0; i < 50; i++) {
        plat[i].render();
    }

    hero.update();
    hero.render();
    strokeWeight(2);
    stroke(0);
    line(0, height, width, height);

}

function Block(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.onGround = false
    this.color = c

    this.render = function () {
        fill(this.color);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }

    //interaction
    this.vx = this.vy = 0;

    this.update = function () {
        if (holdLeft === true) {
            this.vx = -2;
        }
        if (holdRight === true) {
            this.vx = 2;
        }
        this.x += this.vx;
        this.y += this.vy;

        this.onGround = false;
        for (var i = 0; i < 50; i++) {
            if (this.x > plat[i].x 
                && this.x < plat[i].x + plat[i].w
                && this.y + this.h > plat[i].y 
                && this.y < plat[i].y + plat[i].h) {
                this.y = plat[i].y - this.h;
                this.onGround = true;

            }
        }
        if (this.y > height - this.h) {
            this.y = height - this.h
            this.onGround = true;
        }






        if (this.onGround === true) {
            this.vx *= 0.8;

        } else {
            this.vy += grav;
        }
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        holdLeft = true;
    }
    if (keyCode === UP_ARROW) {
        if (hero.onGround === true) {
            hero.vy = -10;
        }
    }
    if (keyCode === RIGHT_ARROW) {
        holdRight = true;
    }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW) {
        holdLeft = false;
    }
    if (keyCode === UP_ARROW) {
        if (hero.vy < -3) {
            hero.vy = -3;
        }
    }
    if (keyCode === RIGHT_ARROW) {
        holdRight = false;
    }
}




