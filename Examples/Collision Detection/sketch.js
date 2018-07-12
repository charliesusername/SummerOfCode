var blockA;
var blockB;
function setup() {
    createCanvas(600, 600);
    blockA = new Block(150, 200, 60, 60);
    blockB = new Block(250, 250, 100, 100);




}

function draw() {
    background(160, 160, 205);
    blockA.x = mouseX;
    blockA.y = mouseY;

    blockA.render();
    blockB.render();

    blockA.collide(blockB);



}

class Block {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    render() {
        fill(255);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
        stroke(255, 100, 100)
        strokeWeight(10);
        point(this.x, this.y);
        point(this.x + this.w, this.y);
        point(this.x + this.w, this.y + this.h);
        point(this.x, this.y + this.h);
    }

    collide(other) {
        var leftEdge = this.x <= (other.x + other.w);
        var topEdge = this.y <= (other.y + other.h);
        var rightEdge = (this.x + this.w) >= other.x;
        var bottomEdge = (this.y + this.h) >= other.y;

        if (leftEdge && topEdge && rightEdge && bottomEdge) {

            var thisBottom = this.y + this.h;
            var otherBottom = other.y + other.h;
            var thisRight = this.x + this.w;
            var otherRight = other.x + other.w;

            var bottomCollision = otherBottom - this.y;
            var topCollision = thisBottom - other.y;
            var leftCollision = thisRight - other.x;
            var rightCollision = otherRight - this.x;

            if (topCollision < bottomCollision && topCollision < leftCollision && topCollision < rightCollision) {
                console.log('top');
            }
            if (bottomCollision < topCollision && bottomCollision < leftCollision && bottomCollision < rightCollision) {
                console.log('bottom');
            }
            if (leftCollision < bottomCollision && leftCollision < topCollision && leftCollision < rightCollision) {
                console.log('left');
            }
            if (rightCollision < bottomCollision && rightCollision < leftCollision && rightCollision < topCollision) {
                console.log('right');
            }

        }

    }
}

