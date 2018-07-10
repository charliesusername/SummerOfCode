var hero;
var obstacles = [];

function setup() {
    createCanvas(600, 600);

    hero = new Player(50, height - 50, 50, 50)
    for(var i = 0; i < 1; i++){
    obstacles[i] = new brick(200 + 200*i, height - 100, 100, 100);
    }
}

function draw() {
    background(35);

    hero.render();
    obstacles[0].render();
}