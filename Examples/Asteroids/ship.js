function Ship() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
    this.heading = random(2*PI);
    this.rotation = 0;
    this.vel = createVector(0, -0);
    this.isBoosting = false;

    this.boosting = function (b) {
        this.isBoosting = b;
    }

    this.update = function () {
        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }

    this.boost = function () {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.5);
        this.vel.add(force)
        this.vel.limit(4);
    }

    this.edges = function () {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }

    this.hits = function(other){
        var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        return(d < this.r + other.r)
    }

    this.render = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + 3*PI/2);
        fill(0);
        stroke(255);
        strokeWeight(1);
        beginShape()
        vertex(0, this.r);
        vertex(this.r*0.6, -this.r);
        vertex(0, -this.r*0.8);
        vertex(-this.r*0.6, -this.r);       
        endShape(CLOSE);
        
        
        //triangle(-this.r/1.5, this.r, this.r/1.5, this.r, 0, -this.r)
        pop();
    }

    this.setRotation = function (a) {
        this.rotation = a;
    }

    this.turn = function () {
        this.heading += this.rotation;
    }
}