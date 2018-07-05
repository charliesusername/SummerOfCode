var ship;
var asteroids = [];
var lasers = [];

function setup() {
    createCanvas(windowWidth * 0.95, windowHeight * 0.95);
    ship = new Ship();
    for (var i = 0; i < 5; i++) {
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(0);

    if (keyIsDown(RIGHT_ARROW)) {
        ship.setRotation(0.1);
    } else if (keyIsDown(LEFT_ARROW)) {
        ship.setRotation(-0.1);
    } else if (keyIsDown(UP_ARROW)) {
        ship.boost();
        ship.boosting(true);
    }

    for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
            console.log('oops!');
        }
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
    }

    for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1);
            break;
        } else {
            for (var j = asteroids.length - 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                    if (asteroids[j].r > 10) {
                        var newAsteroids = asteroids[j].breakup();
                        asteroids = asteroids.concat(newAsteroids);
                        asteroids.splice(j, 1);
                        lasers.splice(i, 1);
                        // increase the score
                        break;
                    }
                    else {
                        // increase the score
                        asteroids.splice(j, 1);
                        lasers.splice(i, 1);
                    }
                }
            }
        }


    }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

}

function keyPressed() {
    if (key == ' ') {
        lasers.push(new Laser(ship.pos, ship.heading));
    }
}

function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false);
}