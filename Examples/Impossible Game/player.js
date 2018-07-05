class Player {
    constructor() {
        this.r = 40;
        this.pos = createVector(100, height - this.r);
        this.vel = createVector(1, 0);
        this.acc = createVector(0, 0);
        this.angle = 0;
    }

    render() {
        push();
        fill(0);
        stroke(175);
        strokeWeight(3);
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rect(0, 0, this.r, this.r);
        pop();
    }

    applyForce(force) {
        this.acc.add(force)
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);

        if(this.pos.y > height - this.r){
            this.vel.y *= 0;
            this.pos.y = height - this.r;
        }
    }

    jump() {
        var jump = createVector(0, -10);
        player.applyForce(jump);
        player.rotate();

    }

    rotate(){
        // when called have the object complete
        // one full rotation by the time it lands
    }

    


}