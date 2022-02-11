function Ship() {
    this.x = width / 2;
    this.xdir = 0;
    this.r = 20;

    this.show = function() {
        fill(255);
        rectMode(CENTER);
        rect(this.x, height - 50, this.r * 2, this.r * 2);
    }

    this.move = function(dir) {
        this.x += this.xdir * 5;
    }

    this.setDir = function(dir) {
        this.xdir = dir;
    }
}