var gridSide = 8;
var gridWidth;
var board = [];
var colour;
var piece = 2;

function setup() {
    createCanvas(400, 400);
    gridWidth = floor(width / gridSide);

    for (var i = 0; i < gridSide; i++) {
        board[i] = [];
        for (var j = 0; j < gridSide; j++) {
            var checkerPattern =
                (i % 2 === 0 && j % 2 === 0
                    || i % 2 === 1 && j % 2 === 1);

            //checker pattern requirements
            if (checkerPattern) {
                var colour = [130, 0, 0];

            } else {
                colour = [220, 220, 220];
            }
            if (j < 3 && checkerPattern) {
                piece = 0;
            } else if (j > 4 && checkerPattern) {
                piece = 1;
            } else {
                piece = -1;
            }

            board[i][j] = new Checker(i, j, colour, piece);
        }
    }
}

function draw() {
    background(0);

    for (var i = 0; i < gridSide; i++) {
        for (var j = 0; j < gridSide; j++) {
            var d = dist(mouseX, mouseY,
                board[i][j].x + gridWidth / 2, board[i][j].y + gridWidth / 2);
            if (d < board[i][j].radius) {
                board[i][j].pieceStroke = [0, 140, 0]
                if (mouseIsPressed && board[i][j].piece != -1) {
                    board[i][j].select(i, j);
                }
            } else {
                board[i][j].pieceStroke = [0, 0, 0]
            }

            board[i][j].render();


        }
    }
}

class Checker {
    constructor(row, col, color, type) {
        this.x = row * gridWidth;
        this.y = col * gridWidth;
        this.alpha = 255;
        this.gridColor = color;
        this.piece = type;
        this.radius = gridWidth * 0.3
        this.pieceStroke = [0, 0, 0]
        this.gridStroke = [0, 0, 0]
        this.selected = false;
        this.shaded = false;
    }

    render() {
        fill(this.gridColor);

        stroke(this.gridStroke);
        strokeWeight(4);
        rect(this.x, this.y, gridWidth, gridWidth);


        if (this.piece === 0) {
            fill(55, 55, 55, this.alpha);

            stroke(this.pieceStroke);
        } else if (this.piece === 1) {
            fill(160, 160, 0, this.alpha);

            stroke(this.pieceStroke);
        } else {
            noStroke();
        }

        if (this.shaded = true) {
            alpha(150);
        }


        ellipse(this.x + gridWidth / 2, this.y + gridWidth / 2,
            this.radius * 2, this.radius * 2);
    }

    select(row, col) {
        this.selected = true;
        console.log(row, col);
        if(this.piece === 0){ // black pieces can only go downward
            for(var i = -1; i < 2; i+=2){                
                if(board[row + i][col + 1].piece === -1){
                    board[row + i][col + 1].piece = 0;
                    board[row + i][col + 1].shaded = true;
                }
            }            

        }


    }

}