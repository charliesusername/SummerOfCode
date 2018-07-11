var delay = 60;
var springConstant = 0.3;
var dampingConstant = 0.2;
var r = g = b = 255;

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
}

function update() {
    background(45);

    ball.update();
    ball.render();
}

class Mass {
    constructor(x, y, m, vx, vy) {
        this.x = x;
        this.y = y;
        this.m = m;
        this.vx = vx;
        this.vy = vy;
        this.ax = 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    render() {
        fill(255);
        ellipse(this.x, this.y, 100, 100);

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
        text(str(round(this.vx*10)/10),this.x,this.y)

    }
}

