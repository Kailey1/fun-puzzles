function Flower(x,y) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.xdir = 1;
    this.toDelete = false;

    this.grow = function() {
        this.r = this.r + 2;
        if (this.r == 40) {
            this.toDelete = true;
        }
    }

    this.show = function() {
        fill(255, 100, 100);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    this.move = function(dir) {
        this.x = this.x + this.xdir;
    }

    this.shiftDown = function() {
        this.xdir *= -1;
        this.y += this.r;
    }

    this.hits = function(ship) {
        let d = dist(this.x, this.y, ship.x, ship.y);
        if (d < this.r + ship.r) {
            return true;
        }
        return false;
    }
}