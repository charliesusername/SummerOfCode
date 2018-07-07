class Obstacle {
    // creates an object in the world at a provided coordinate and shape
    constructor(sx, sy, shape) {
        
        this.shape = shape;
        this.r = objectWidth;
        this.x = sx;
        this.y = sy;
        this.level = 1;



        this.pos = createVector(sx, height - this.r/2);
       
    }

    render() {
        push();
        fill(255);
        stroke(0);
        strokeWeight(3);
        translate(this.pos.x, this.pos.y);
        if (this.shape === 'r') {
            rectMode(CENTER)
            rect(0, 0, this.r*10, this.r);
            //rect is drawn from the top - left corner
        } else if (this.shape === 't') {     
                triangle(                    
                    0, -this.r/2,
                    -this.r/2, this.r/2,
                    this.r/2, this.r/2);        
            //triangle is drawn from the center
        } else if (this.shape === 'n'){

        }
        pop();
        
    }
}

