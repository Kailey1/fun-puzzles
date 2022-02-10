function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent('clock');
  angleMode(DEGREES);
  
}

function draw() {
  background(0);
  translate(200, 200);
  rotate(-90);

  let hr = hour();
  let min = minute();
  let sec = second();

  strokeWeight(8);
  noFill();

  stroke(255, 100, 150);
  let end1 = map(sec, 0, 60, 0, 360);  
  arc(0, 0, 300, 300, 0, end1);

  stroke(100, 150, 255);
  let end2 = map(min, 0, 60, 0, 360);  
  arc(0, 0, 280, 280, 0, end2);

  stroke(100, 255, 150);
  let end3 = map(hr % 12, 0, 12, 0, 360);  
  arc(0, 0, 260, 260, 0, end3);
  
  push();
  rotate(end1);
  stroke(255, 100, 150);
  line(0, 0, 100, 0);
  pop();

  push();
  rotate(end2);
  stroke(100, 150, 255);
  line(0, 0, 75, 0);
  pop();

  push();
  rotate(end3);
  stroke(100, 255, 150);
  line(0, 0, 50, 0);
  pop();

  push();
  setLineDash([10, 30]);
  stroke(255);
  ellipse(0, 0, 320, 320);
  pop();

  stroke(255);
  point(0,0);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}