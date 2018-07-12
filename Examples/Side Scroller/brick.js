class Brick{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.highlight = false;
    }

    render(){
        if(this.highlight === true){
            fill(0,185,0)
        } else {
            fill(185,0,0);
        }
        
        stroke(0);
        strokeWeight(1)
        rect(this.x, this.y, this.w, this.h);
    }

    
}