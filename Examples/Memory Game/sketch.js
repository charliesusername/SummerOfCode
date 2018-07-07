var cards = [];
var cardValue = [];
var numCards = 8;
//var width = 500;
var cardSize;
var selectIndex;
var cardExists = true;
var val = 1;

function setup() {
    createCanvas(500, 500);
    cardSize = floor(width / numCards);

    //create an array of all acceptable card values
    for (var i = 0; i < floor((numCards * numCards) / 2); i++) {
        cardValue[i] = [i, i];
    }

    for (var i = 0; i < numCards; i++) {
        cards[i] = [];
        for (var j = 0; j < numCards; j++) {
            while (cardExists) {
                selectIndex = [floor(random(floor((numCards * numCards) / 2))), floor(random(2))];
                if (cardValue[selectIndex[0]][selectIndex[1]] != null) {
                    val = cardValue[selectIndex[0]][selectIndex[1]]
                    cardValue[selectIndex[0]].splice(selectIndex[1], 1)
                    cards[i][j] = new Card(i, j, val + 1);
                    console.log(selectIndex, val);
                    break;
                } else {
                    cardExists = true;
                }
            }
        }
    }
}

function draw() {
    background(255);

    for (var i = 0; i < numCards; i++) {
        for (var j = 0; j < numCards; j++) {
            cards[i][j].render('hide');
            if (mouseIsPressed) {
                if (mouseX >= cards[i][j].x && mouseX < cards[i][j].x + cards[i][j].r
                    && mouseY >= cards[i][j].y && mouseY < cards[i][j].y + cards[i][j].r) {
                    cards[i][j].render('show')
                }
            }
        }
    }

    // border
    strokeWeight(4);
    stroke(0);
    noFill();
    rect(0, 0, width, height)
}

class Card {
    constructor(col, row, num) {
        this.r = cardSize
        this.x = col * this.r;
        this.y = row * this.r;
        this.num = num;
    }

    render(visible) {
        stroke(0);
        strokeWeight(5);
        noFill();
        rect(this.x, this.y, this.r, this.r);

        if (visible === 'show') {
            fill(0);
        } else {
            noFill();
        }
        noStroke();
        textAlign(CENTER, CENTER)
        textSize(this.r * 0.9);
        text(str(this.num), this.x + this.r / 2, this.y + this.r / 2);



    }
}

