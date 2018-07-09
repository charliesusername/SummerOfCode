//Game Logic
var cards = [];             // array that stores all the Card objects
var cardValue = [];         // 2D Array that stores two of every card value
var cardsInARow = 4;           // number of cards to display on a side
var selectIndex;            // temporarily holds the particular index for a card value
var cardExists = true;      // true if the card value at selectIndex is still available
var val = 1;                // hold the value of cardValue at selectIndex

var numberOfValues;
var pairFound = [];

//Render Preference
var cardSize;

function setup() {
    createCanvas(500, 500);
    cardSize = floor(width / cardsInARow);
    numberOfValues = floor(cardsInARow * cardsInARow / 2);

    //creates a 2D array of each available card value and stores it twice at each index.
    //available values are one half of every card in the grid
    for (var i = 0; i < numberOfValues; i++) {
        cardValue[i] = [i, i];
    }

    // populates the 2D array cards.   
    for (var i = 0; i < cardsInARow; i++) {
        cards[i] = []; // for every index i, generate an empty array
        pairFound[i] = [];
        for (var j = 0; j < cardsInARow; j++) {
            pairFound[i][j] = false;
            // only runs the following code WHILE cardExists === true
            while (cardExists === true) {

                /* pick an index at random.
                index i can be anything from 0 to number of values
                index j can be either 0 or 1 (since we want to pull any given number twice) */
                selectIndex = [floor(random(numberOfValues)), floor(random(2))];

                // if there exists a value at the selected index, continue
                if (cardValue[selectIndex[0]][selectIndex[1]] != null) {

                    //temporarily stores the cardValue with the variable val
                    val = cardValue[selectIndex[0]][selectIndex[1]]

                    /* delete the cardValue at the selected index so we don't reroll it.
                    splice is a method that works with arrays
                    it requires two parameters.
                    1. the given index to start deleting,
                    2. the number of indexes to delete () */

                    //so this time  we are deleteing one index at given location
                    cardValue[selectIndex[0]].splice(selectIndex[1], 1);

                    /* generates a new Card object at position i and j
                    with the given value + 1 (since we don't want 0 but do want the max number)
                    stores that object in the 2D array cards at index i and j */
                    cards[i][j] = new Card(i, j, val + 1);
                    //console.log(selectIndex, val);
                    //cardExists = false;
                    break;
                }
            }
        }
    }
}

function draw() {
    background(255);

    for (var i = 0; i < cardsInARow; i++) {
        for (var j = 0; j < cardsInARow; j++) {
            if (pairFound[i][j] === true) {
                cards[i][j].show = true;
                cards[i][j].clr = [0, 180, 0];
            }
            cards[i][j].render();
        }
    }

    // border
    strokeWeight(4);
    stroke(0);
    noFill();
    rect(0, 0, width, height)
}

var clickNum = 0;
var idx = [];
function mouseClicked() {
    for (var i = 0; i < cardsInARow; i++) {
        for (var j = 0; j < cardsInARow; j++) {
            if (mouseX >= cards[i][j].x && mouseX < cards[i][j].x + cards[i][j].r
                && mouseY >= cards[i][j].y && mouseY < cards[i][j].y + cards[i][j].r) {
                if (clickNum < 2) {

                    idx[clickNum] = [i, j]
                    cards[i][j].show = true;
                    clickNum++;
                } else {
                    if (cards[idx[0][0]][idx[0][1]].num === cards[idx[1][0]][idx[1][1]].num) {
                        pairFound[idx[0][0]][idx[0][1]] = true;
                        pairFound[idx[1][0]][idx[1][1]] = true;
                    }

                    cards[idx[0][0]][idx[0][1]].show = false;
                    cards[idx[1][0]][idx[1][1]].show = false;

                    clickNum = 0;
                    idx = [];
                }
            }
        }
    }
}

class Card {
    constructor(col, row, num) {
        this.r = cardSize
        this.x = col * this.r;
        this.y = row * this.r;
        this.num = num;
        this.show = false
        this.clr = [0, 0, 0];
    }

    render() {
        stroke(0);
        strokeWeight(5);
        noFill();
        rect(this.x, this.y, this.r, this.r);

        if (this.show === true) {
            fill(this.clr);
        } else {
            noFill();
        }
        noStroke();
        textAlign(CENTER, CENTER)
        textSize(this.r * 0.9);
        text(str(this.num), this.x + this.r / 2, this.y + this.r / 2);
    }
}