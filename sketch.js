let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let players = ['X', 'O'];
let currPlayer;
let availSpot = [];

function setup() {
  createCanvas(500, 500);
  frameRate(5);
  currPlayer = random(players).length;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      availSpot.push([i,j]);
    }
  }
}

function nextTurn() {
  let index = floor(random(availSpot.length))
  let spot = availSpot.splice(index, 1)[0];
  board[spot[0]][spot[1]] = players[currPlayer];
  currPlayer = (currPlayer + 1) % players.length;
}

function equals3(a,b,c) {
  return (a==b && b==c && a != '');
}

function checkWinner() {
  let winner = null;

  // check for vertical winner
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // check for horizontal winner
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[1][1];
  }
  if (equals3(board[0][2], board[1][1], board[2][0])) {
    winner = board[1][1];
  }
  if (winner == null && availSpot.length == 0) {
    return 'Tie';
  } else {
    return winner;
  }
}

function draw() {
  background(0);
  let w = width / 6;
  let h = height / 6;
  stroke(255);
  line(w*2 ,0,w*2 ,height);
  line(w*4, 0,w*4,height);
  line(0,h*2,width, h*2);
  line(0,h*4,width,h*4);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = w * (i * 2 + 1);
      let y = h * (j * 2 + 1);
      let spot = board[i][j];
      textAlign(CENTER, CENTER);
      textSize(32);
      fill(255);
      text(spot, x, y);
    }
  }

  
  let result = checkWinner();
  if (result != null) {
    noLoop();
    createP(result);
  } else {
    nextTurn();
  }
}
