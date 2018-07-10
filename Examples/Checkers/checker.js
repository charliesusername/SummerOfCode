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
        var availableMoves = [];

        if (this.piece === 0) { // white
            // Left-Right edge conditions
            if (col === 0) {
                availableMoves[0] = board[row+1][col+1];
            } else if (col === gridSide) {
                availableMoves[0] = board[row+1][col-1];
            } else  {
                availableMoves[0] = board[row+1][col+1];
                availableMoves[1] = board[row+1][col-1];
            }
        }

        for(var i = 0; i < availableMoves.length; i++){
            console.log(availableMoves[i]);
            if(availableMoves[i].piece === -1){
                availableMoves[i].shaded = true;
            }
        }


    }

}