function Laser(spos, angle) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);

    this.update = function () {
        this.vel.setMag(10);
        this.pos.add(this.vel);
    }

    this.render = function () {
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }

    this.hits = function (other) {
        var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);

        return (d < other.r);
    }

    this.offscreen = function () {
        if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
            return true;            
        } else {
            return false;
        }
    }
}