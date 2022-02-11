function Drop(x,y) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.toDelete = false;

    this.show = function() {
        noStroke();
        fill(50, 100, 200);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    this.move = function(dir) {
        this.y -= 4;
    }

    this.hits = function(flower) {
        let d = dist(this.x, this.y, flower.x, flower.y);
        if (d < this.r + flower.r) {
            return true;
        }
        return false;
    }

    this.disappear = function() {
        this.toDelete = true;
    }
}