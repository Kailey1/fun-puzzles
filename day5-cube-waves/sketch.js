let angle = 0;
let w = 30;
let arcAngle;
let maxDist;

function setup() {
  createCanvas(400, 400, WEBGL);
  arcAngle = atan(1/sqrt(2));
  maxDist = dist(0, 0, 200, 200);
}

function draw() {
  background(0);
  ortho(-400, 400, -400, 400, 0, 1000);


  rotateX(-QUARTER_PI);
  rotateY(arcAngle);

  let offset = 0;
  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxDist, -PI, PI);
      let a = angle + offset;
      
      let h = map(sin(a), -1, 1, 100, 300);
      translate(x - width / 2, 0, z - height / 2);
      normalMaterial();
      box(w - 2, h, w - 2);

      
      pop();
    }
  }
  angle -= 0.1;
}
