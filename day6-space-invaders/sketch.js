let ship;
let flowers = [];
let drops = [];

function setup() {
    createCanvas(600, 400);
    ship = new Ship();
    
    for (let i = 0; i < 6; i++) {
        flowers[i] = new Flower(i*80+80, 50);
    }
}

function draw() {
    background(0);
    ship.show();
    ship.move();
    for (let i = drops.length - 1; i >= 0; i--) {
        drops[i].show();
        drops[i].move();
        for (let j = flowers.length - 1; j >= 0 ; j--) {
            if (drops[i].hits(flowers[j])) {
                flowers[j].grow();
                drops[i].disappear();
            }
            if (flowers[j].hits(ship)) {
                console.log('dead');
            }
            if (flowers[j].toDelete) {
                flowers.splice(j, 1);
            }
        }

        if (drops[i].toDelete) {
            drops.splice(i, 1);
        }
    }

    let edge = false;
    for (let i = 0; i < flowers.length; i++) {
        flowers[i].show();
        flowers[i].move();

        if (flowers[i].x > width || flowers[i].x < 0) {
            edge = true;
        }
    }
    if (edge) {
        for (let i = 0; i < flowers.length; i++) {
            flowers[i].shiftDown();
        }
    }
}

function keyReleased() {
    if(key != ' ') {
        ship.setDir(0);
    }
}

function keyPressed() {
    if (key === ' ') {
        let drop = new Drop(ship.x, height - 50);
        drops.push(drop);
    }
    if (keyCode === RIGHT_ARROW) {
        ship.setDir(1);
    } 
    if (keyCode === LEFT_ARROW) {
        ship.setDir(-1);
    }
}