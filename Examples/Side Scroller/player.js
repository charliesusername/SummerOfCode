class Player {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y - 100;
        this.w = w;
        this.h = h;

        this.vx = this.vy = 0;
        this.onGround = false;
        this.jump = 11;
        this.move = 8;
    }

    render() {
        fill(0, 185, 0);
        stroke(0);
        strokeWeight(1)
        rect(this.x, this.y, this.w, this.h);
    }

    update() {
        translate(-this.x + 100, 0);
        this.x += this.vx;
        this.y += this.vy;

        if (holdLeft === true) {
            this.vx = -this.move;
        }
        if (holdRight === true) {
            this.vx = this.move;
        }
        this.onGround = false;
        //on the floor?
        if (this.y > height - this.h) {
            this.y = height - this.h - 1;
            this.onGround = true;
        }
        for (var i = 0; i < plats.length; i++) {
            this.collide(plats[i]);
        }


        if (this.onGround === true) {
            this.vx *= 0.8;
        } else {
            this.vy += grav;
        }
    }


    collide(other) {
        var leftEdge = this.x <= (other.x + other.w);
        var topEdge = this.y <= (other.y + other.h);
        var rightEdge = (this.x + this.w) >= other.x;
        var bottomEdge = (this.y + this.h) >= other.y;
        other.highlight = false;
        if (leftEdge && topEdge && rightEdge && bottomEdge) {
            other.highlight = true;


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
                this.onGround = true;
                if(this.vy > 0){
                    this.vy = 0;
                    this.y = other.y - this.h;
                }
            }
             if (bottomCollision < topCollision && bottomCollision < leftCollision && bottomCollision < rightCollision) {
                console.log('bottom');
                if(this.vy < 0){
                    this.vy = 0;
                }
            } 
            if (leftCollision < bottomCollision && leftCollision < topCollision && leftCollision < rightCollision) {
                console.log('left');
                this.x = other.x - this.w;
                //this.vx = -2;
                //holdRight = false;
            }
            if (rightCollision < bottomCollision && rightCollision < leftCollision && rightCollision < topCollision) {
                console.log('right');
                this.x = other.x + other.w;
                //this.vx = 2;
                //holdLeft = false;
            }

        }

    }
}