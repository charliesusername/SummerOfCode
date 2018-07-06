class Player {
    constructor() {
        this.r = 40;
        this.pos = createVector(100, height - this.r/2);
        this.vel = createVector(10, 0);
        this.acc = createVector(0, 0);
        this.angle = 0;
        this.jumping = false;
    }

    render() {
    rectMode(CENTER);
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
        
        angleMode(DEGREES);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);

        if (this.pos.y > height - this.r/2) {
            this.vel.y = 0;
            this.pos.y = height - this.r/2;
            player.jumping = false;
        }
        
        push();       
        this.angle = 360 / ((height - this.pos.y));
        positions.push(this.angle);
        
        rotate(this.angle); 
        pop();
    }

    jump() {
        var jump = createVector(0, -1);
        player.applyForce(jump);
    }

    rotate() {
        // when called have the object complete
        // one full rotation by the time it lands
       
    }




}