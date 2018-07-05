function Asteroid(pos, r) {
    pos ? this.pos = pos.copy() : this.pos = createVector(random(width), random(height));
    r ? this.r = r * 0.5 : this.r = floor(random(15, 50));
    this.sides = floor(random(10, 15));
    this.offset = [];
    for (var i = 0; i < this.sides; i++) {
        this.offset[i] = random(-this.r / 4, this.r / 4);
    }
    this.vel = p5.Vector.random2D();

    this.render = function () {
        push();
        translate(this.pos.x, this.pos.y);
        strokeWeight(2);
        stroke(255);
        noFill();
        beginShape()
        for (var i = 0; i < this.sides; i++) {
            var angle = map(i, 0, this.sides, 0, TWO_PI);
            var r = this.r + this.offset[i];
            var x = r * cos(angle);
            var y = r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }

    this.update = function () {
        this.pos.add(this.vel);
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

    this.breakup = function () {
        var child = [];
        child[0] = new Asteroid(this.pos, this.r);
        child[1] = new Asteroid(this.pos, this.r);
        
        return child;
    }
}