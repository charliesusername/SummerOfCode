var textX;
var textY;
var textH = 32;
var r = 255;
var g = 255;
var b = 0;

function setup() {
    createCanvas(windowWidth * 0.97, windowHeight * 0.97);
    textX = width / 2;
    textY = height / 2;
}

function draw() {
    background(185);

    textSize(textH);
    textAlign(CENTER);
    fill(r, g, b);
    strokeWeight(textH / 20);
    stroke(0);
    text('SUMMER OF CODE!!', textX, textY);
    if (textWidth('SUMMER OF CODE!!') < width) {
        textH += 0.5;
        r--;
        g--;
        b++;
    } else {
        textH -= 0.5;
        r = random(255);
        g = random(255);
        b = random(255);

    }
}