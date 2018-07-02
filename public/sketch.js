let snow = [];
let gravity;

let zOff = 0;

let spriteSheet;
let textures = [];
function preload() {
    spritesheet = loadImage('flakes32.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    gravity = createVector(0, 0.03);

    for (let x = 0; x < spritesheet.width; x += 32) {
        for (let y = 0; y < spritesheet.height; y += 32) {
            let img = spritesheet.get(x, y, 32, 32);
            image(img, x, y);
            textures.push(img);
        }
    }

    for (let i = 0; i < 200; i++) {
        let x = random(width);
        let y = random(height);
        let design = random(textures);
        snow.push(new Snowflake(x, y, design));
    }
}

function draw() {
    background(0);

    for (flake of snow) {

        let wAngle = noise(zOff) * TWO_PI;
        let wind = p5.Vector.fromAngle(wAngle);
        wind.mult(0.01);
        zOff += 0.05;
        flake.applyForce(gravity);
        flake.applyForce(wind);
        flake.render();
        flake.update();
    }

    // for(let i = snow.length - 1; i >= 0; i--){
    //     if(snow[i].offScreen()){
    //         snow.splice(i, 1);
    //     }
    // }
} 