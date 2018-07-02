function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    translate(200, 200);
    rotate(-90);

    //Time
    let hr = hour();
    let mn = minute();
    let sc = second()


    /* fill(255);
    noStroke();
    text(hr + ':' + mn + ':' + sc,10, 200); */

    strokeWeight(8);

    noFill()

    //Arcs
    let secondAngle = map(sc, 0, 60, 0, 360);
    stroke(255, 100, 150);
    arc(0, 0, 300, 300, 0, secondAngle);

    let minAngle = map(mn, 0, 60, 0, 360);
    stroke(150, 100, 255);
    arc(0, 0, 280, 280, 0, minAngle);

    let hourAngle = map(hr % 12, 0, 12, 0, 360);
    stroke(150, 255, 100);
    arc(0, 0, 260, 260, 0, hourAngle);

    //Lines
    push();
    rotate(hourAngle)
    stroke(150, 255, 100);
    line(0, 0, 100, 0)
    pop();

    push();
    rotate(minAngle)
    stroke(150, 100, 255);
    line(0, 0, 100, 0)
    pop();

    push();
    rotate(secondAngle)
    stroke(255, 100, 150);
    line(0, 0, 100, 0)
    pop();   
    
    //Point
    stroke(255);
    point(0,0);
}