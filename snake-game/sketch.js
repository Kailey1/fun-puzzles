let snake;
let scl = 20;
let food;

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent('snake');
  snake = new Snake();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width / scl);
  let rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(50);
  
  if (snake.eat(food)) {
    pickLocation();
  }

  snake.death();
  snake.update();
  snake.show();

  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW && snake.isBackwards(0, -1)) {
    snake.dir(0, -1);
  } else if (keyCode == DOWN_ARROW && snake.isBackwards(0, 1)) {
    snake.dir(0, 1);
  } else if (keyCode == RIGHT_ARROW && snake.isBackwards(1, 0)) {
    snake.dir(1, 0);
  } else if (keyCode == LEFT_ARROW && snake.isBackwards(-1, 0)) {
    snake.dir(-1, 0);
  }
}