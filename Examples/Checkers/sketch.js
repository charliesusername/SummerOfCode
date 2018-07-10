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

            // initial piece placement
            if (j < 3 && checkerPattern) {
                piece = 0; // white
            } else if (j > 4 && checkerPattern) {
                piece = 1; // black
            } else {
                piece = -1; // none
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

