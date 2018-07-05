class Obstacle {
    constructor(sx, sy, shape) {
        this.pos = createVector(sx, sy);
        this.shape = shape;
        this.r = 40;
    }

    render() {
        push();
        fill(255);
        stroke(0);
        strokeWeight(3);
        translate(this.pos.x, this.pos.y);
        if (this.shape === 'rectangle') {
            rect(0, 0, this.r, this.r);
            //rect is drawn from the top - left corner
        } else if (this.shape === 'triangle') {     
                triangle(
                    this.r/2, 0,
                    0, this.r,
                    this.r, this.r);        
            //triangle is drawn from the center
        }
        pop();
    }

}