var delay1 = 60;
var delay2 = 45;
var delay3 =30;

function setup() {
    createCanvas(400, 400);
    background(165);

    //top ball
    setInterval(topUpdate, 1000 / delay1);


    //middle ball
    setInterval(midUpdate, 1000 / delay2);


    //bottom ball
    setInterval(botUpdate, 1000 / delay3);

}
var posX = 50;
var next = 1;

function draw() {
    if(posX >= width - 20){
        next = -1;
    } else if(posX <= 20){
        next = 1;
    }
    posX = posX + next;
    console.log(posX);
    

}



function topUpdate() {
    fill(165);
    noStroke();
    rect(0, 0, width, height * 2 / 6);

    stroke(255);
    line(posX,0,posX,height*2/6);

    fill(0);
    ellipse(posX, height / 6, 40, 40)

    fill(255)
    textAlign(CENTER, CENTER)
    text(str(delay1),posX,height/6);

    
}

function midUpdate() {
    fill(165);
    noStroke();
    rect(0, height * 2 / 6, width, height * 2 / 6);

    stroke(255);
    line(posX,height*2/6,posX,height*4/6);

    fill(0);
    ellipse(posX, 3 * height / 6, 40, 40)

    fill(255)
    textAlign(CENTER, CENTER)
    text(str(delay2),posX,height*3/6);

    

}


function botUpdate() {
    fill(165);
    noStroke();
    rect(0, height * 4 / 6, width, height*2/6);

    stroke(255);
    line(posX,height*4/6,posX,height*6/6);

    fill(0);
    ellipse(posX, 5 * height / 6, 40, 40)

    fill(255)
    textAlign(CENTER, CENTER)
    text(str(delay3),posX,height*5/6);

    

}