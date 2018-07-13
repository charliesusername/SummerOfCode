var player;

function setup() {
    createCanvas(400, 300);
    player = new Ship();
}

function draw() {
    background(0);

    player.update();
    player.render();





}

function keyPressed(){
    if(keyCode === 65){player.velX = -1}
    if(keyCode === 68){player.velX = 1}
}

function keyReleased(){
    if(keyCode === 65){player.velX = 0}
    if(keyCode === 68){player.velX = 0}    
    if(keyCode === 32){player.shoot = true;}
}


class Ship {
    constructor(x, y) {
        this.x = width / 2 || x;
        this.y = height - 100 || y;
        this.velX = 0;
        this.pelletVelocity = 5;
        this.shoot = false;


        this.shipWidth = 30;
        this.shipHeight = 50
        this.wingWidth = 20;
        this.wingHeight = 30;
        this.noseHeight = 25;
    }

    render() {
        fill(255);
        
        push();
        translate(this.x, this.y)
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
        triangle(-this.shipWidth/2, 0,
            0, -this.noseHeight,
            this.shipWidth/2, 0)
        pop();
    }


    update() {
        this.x += this.velX * 1.8

        if(this.shoot === true){
            push()
            translate(this.x, this.y)
            var pelletExists = true
            var pelletY = 0;
            var pelletX = 0;
            fill(100,100,100);
            ellipse(pelletX, pelletY, 10,10)
            pop();
            this.shoot === false;
        }
        if(pelletExists){
        pelletY -= this.pelletVelocity
        }

        console.log(pelletExists, pelletX, pelletY)
    }
}
