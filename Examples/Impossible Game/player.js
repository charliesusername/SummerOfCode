class Player {
    constructor() {
        this.r = objectWidth;
        this.pos = createVector(100, height - this.r / 2);
        this.vel = createVector(velocity, 0);
        this.acc = createVector(0, 0);
        this.angle = 0;
        this.jumping = false;
        this.level = 1;
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

        /* stroke(255, 0, 0);
        line(-this.r / 2, this.r / 2, 0, 0);
        stroke(0, 255, 0);
        line(-this.r / 2, -this.r / 2, 0, 0);
        stroke(0, 0, 255);
        line(this.r / 2, this.r / 2, 0, 0);
        stroke(150, 0, 150);
        line(this.r / 2, -this.r / 2, 0, 0); */

        stroke(255);
        strokeWeight(6);
        point(0, 0);
        pop();
    }

    applyForce(force) {
        this.acc.add(force)
    }

    update() {

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);

        if (this.pos.y > height - (this.r / 2) * this.level) {
            this.vel.y = 0;
            this.pos.y = height - (this.r / 2) * this.level;
            player.jumping = false;
        }

        /* push();
        angleMode(DEGREES);
        this.angle = 90 + (this.pos.y - objectWidth / 2) % this.r;
        //this.angle = 0;  
        positions.push(this.angle);

        rotate(this.angle);

        pop(); */
    }

    jump() {
        var jump = createVector(0, -12);
        player.applyForce(jump);
    }

    rotate() {
        // when called have the object complete
        // one full rotation by the time it lands

    }   

    interact(other) {

        //land on squares
        if (other.shape === 'r') {
            if (this.pos.x + this.r / 2 > other.pos.x - this.r / 2
                && this.pos.x - this.r / 2 < other.pos.x + this.r / 2) {
                if (this.pos.y + this.r / 2 < other.pos.y - this.r / 2 + 1) {
                    this.level = other.level + 2;
                }
            }
        } else {
            this.level = 1;
        }
        
        if(this.level !== 1){
            console.log(this.level);
        }




    }
}