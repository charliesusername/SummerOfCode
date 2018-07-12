var delay = 30;
var springConstant = 0.3;
var dampingConstant = 0.2;
var r = g = b = 255;
var springPoints = [];
var numSpringPoints = 1000;
var numPeriods = 20;
var ball;

function setup() {
    createCanvas(600, 300);

    ball = new Mass(width / 2 + 140, height / 2, 100, 0, 0)
    setInterval(update, 1000 / delay);

    angleMode(RADIANS);
}

function draw() {
    ball.ax = (-springConstant * (ball.x - width / 2)
        - dampingConstant * ball.vx) / ball.m;
    ball.vx += ball.ax;
    ball.ax = 0;



    //points on spring
    for (var i = 0; i < numSpringPoints; i++) {
        springPoints[i] = [80+(ball.x-160)*i/numSpringPoints, cos(i/numPeriods*PI+PI/2)*20 + height/2]
        }
}

function update() {
    background(45);

    ball.update();
    ball.render();
}

function mouseDragged() {
    var posX = mouseX;
    var posY = mouseY;
    if (ball.mouseOver(posX, posY) === true) {
        ball.over = true;
        ball.vx = 0;
        ball.x = posX;
    }
}

function mouseReleased() {
    var posX = mouseX;
    var posY = mouseY;
    if (ball.over === true) {
        ball.over = false;
    }
}


class Mass {
    constructor(x, y, m, vx, vy) {
        this.x = x;
        this.y = y;
        this.m = m;
        this.r = 50;
        this.vx = vx;
        this.vy = vy;
        this.ax = 0;

        this.over = false;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    render() {

        //streching x
        stroke(255)
        strokeWeight(8);
        line(0, 0, this.x, this.y);
        line(width, 0, this.x, this.y);
        line(width, height, this.x, this.y);
        line(0, height, this.x, this.y);

        //cosine spring
        stroke(255);
        strokeWeight(1);
        for (var i = 1; i < numSpringPoints; i++) {
            line(springPoints[i][0], springPoints[i][1], springPoints[i-1][0], springPoints[i-1][1])
            point(springPoints[i][0], springPoints[i][1]);
        }






        fill(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);

        /* var ax = this.x+80*cos(frameCount/20);
        var ay = this.y+80*sin(frameCount/20);
        var bx = this.x+80*sin(frameCount/20);
        var by = this.y+80*cos(frameCount/20);

        var d = dist(ax,ay,bx,by);
        if(d <= 20 && d >=15){
           r = random(255);
           g = random(255);
           b = random(255);
        }
        fill([r,g,b])
        ellipse(ax,ay,20,20);
        ellipse(bx,by,20,20);
     */


        textAlign(CENTER, CENTER);
        textSize(30);
        fill(0);
        text(str(round((this.x - 300) * 10) / 10), this.x, this.y)

    }

    mouseOver(mx, my) {
        var d = dist(this.x, this.y, mx, my)
        if (d <= this.r) {
            return true;
        } else {
            return false;
        }


    }
}

