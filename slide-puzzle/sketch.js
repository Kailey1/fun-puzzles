let source;
let tiles = [];
let board = [];
let cols = 4;
let rows = 4;
let w, h;

function preload() {
  source = loadImage('slide-puzzle/olym-pic.jpg');
}

function setup() {
  let cnv = createCanvas(512, 512);
  cnv.parent('slide');
  w = width / cols;
  h = height / rows;

  // cutting the image into tiles
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(w,h);
      img.copy(source, x, y, w, h, 0, 0, w, h);
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      tiles.push(tile);
    }
  }
  tiles.pop();
  board.pop();
  board.push(-1);
  simpShuffle(board);
}

function swap(a, b, arr) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function randomMove(arr) {
  let r1 = floor(random(cols));
  let r2 = floor(random(rows));
  move(r1, r2, arr);
}

function simpShuffle(arr) {
  for (let i = 0; i < 1000; i++) {
    randomMove(arr);
  }
}

function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);
  move(i,j,board);
}

function draw() {
  background(255);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = i + j * cols;
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex != -1) {
        let img = tiles[tileIndex].img;
        image(img, x, y, w, h);
      }
      strokeWeight(2);
      noFill();
      rect(x,y,w,h);
    }
  }

  if (isSolved()) {
    // createP('Complete!');
    noLoop();
  }
}

function isSolved() {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== tiles[i].index) {
      return false;
    }
  }
  return true;
}

function isNeighbour(i, j, x, y) {
  if (i !== x && j !== y) {
    return false;
  }

  if (abs(i - x) == 1 || abs(j - y) == 1) {
    return true
  }

  return false;
}

function move(i, j, arr) {
  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = floor(blank / rows);

  if (isNeighbour(i,j,blankCol,blankRow)) {
    swap(blank, i + j * cols, arr);
  }
}

function findBlank() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == -1) return i;
  }
}