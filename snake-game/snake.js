function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.size = 0;
    this.tail = [];

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.size++;
            return true;
        } else {
            return false;
        }
    }

    this.isBackwards = function(x, y) {
        if (x == 0 && y == -1) { // up
            if (this.xspeed == 0 && this.yspeed == 1) { // down
                return false;
            }
        } else if (x == 0 && y == 1) { 
            if (this.xspeed == 0 && this.yspeed == -1) { 
                return false;
            }
        } else if (x == 1 && y == 0) { // right
            if (this.xspeed == -1 && this.yspeed == 0) { // left
                return false;
            }
        } else if (x == -1 && y == 0) { // left
            if (this.xspeed == 1 && this.yspeed == 0) { // right
                return false;
            }
        }
        
        return true;
    }

    this.death = function() {
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1 || this.x == width - scl || this.x == 0
                || this.y == height - scl || this.y == 0) {
                // createP('You died :(');
                this.size = 0;
                this.tail = [];
                this.xspeed = 0;
                this.yspeed = 0;
            }
        }
    } 

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        if (this.size >= 1) {
            this.tail[this.size - 1] = createVector(this.x, this.y);
        }
        
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }
  
    this.show = function() {
        
        fill(255);
        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }

        rect(this.x, this.y, scl, scl);
        }
  }