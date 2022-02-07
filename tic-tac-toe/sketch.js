let ticTacToe = function(p) {
    p.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
      
    p.players = ['X', 'O'];
    p.currPlayer;
    p.availSpot = [];
    
    p.setup = function() {
        let cnv = p.createCanvas(500, 500);
        cnv.parent('tic');
        p.frameRate(5);
        p.currPlayer = p.random(p.players).length;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                p.availSpot.push([i,j]);
            }
        }
    }
    
    p.nextTurn = function() {
        let index = p.floor(p.random(p.availSpot.length))
        let spot = p.availSpot.splice(index, 1)[0];
        p.board[spot[0]][spot[1]] = p.players[p.currPlayer];
        p.currPlayer = (p.currPlayer + 1) % p.players.length;
    }
    
    p.equals3 = function(a,b,c) {
        return (a==b && b==c && a != '');
    }
    
    p.checkWinner = function() {
        let winner = null;
        
        // check for vertical winner
        for (let i = 0; i < 3; i++) {
            if (p.equals3(p.board[i][0], p.board[i][1], p.board[i][2])) {
            winner = p.board[i][0];
            }
        }
        
        // check for horizontal winner
        for (let i = 0; i < 3; i++) {
            if (p.equals3(p.board[0][i], p.board[1][i], p.board[2][i])) {
            winner = p.board[0][i];
            }
        }
        if (p.equals3(p.board[0][0], p.board[1][1], p.board[2][2])) {
            winner = p.board[1][1];
        }
        if (p.equals3(p.board[0][2], p.board[1][1], p.board[2][0])) {
            winner = p.board[1][1];
        }
        if (winner == null && p.availSpot.length == 0) {
            return 'Tie';
        } else {
            return winner;
        }
    }
    
    p.draw = function() {
        p.background(0);
        let w = p.width / 6;
        let h = p.height / 6;
        p.stroke(255);
        p.line(w * 2, 0, w * 2, p.height);
        p.line(w * 4, 0, w * 4, p.height);
        p.line(0, h * 2, p.width, h * 2);
        p.line(0, h * 4, p.width, h * 4);
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
            let x = w * (i * 2 + 1);
            let y = h * (j * 2 + 1);
            let spot = p.board[i][j];
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(32);
            p.fill(255);
            p.text(spot, x, y);
            }
        }
        
        
        let result = p.checkWinner();
        if (result != null) {
            p.noLoop();
            p.createP(result);
        } else {
            p.nextTurn();
        }
    }
}

let canvas = new p5(ticTacToe);