function Laser(spos, angle){
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);

    this.update = function(){
        this.vel.mult(1.1);
        this.pos.add(this.vel);

    }

    this.render = function(){
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }
    
    this.hits = function(asteroid){
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
        if(d < asteroid.r){
            return true;
        } else {
            return false;
        }
    }
}