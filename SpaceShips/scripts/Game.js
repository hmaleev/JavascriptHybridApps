/// <reference path="../kendo/js/jquery.min.js" />
var FPS = 30;
var c = document.getElementById("canvas");
var canvas = c.getContext("2d");
var textX = 50;
var textY = 50;
var direction = null;
var CANVAS_WIDTH = 270;
var CANVAS_HEIGHT = 200;
var timer = null;
var timer2 = null;

var leftArea = document.getElementById("leftControl");
var rightArea = document.getElementById("rightControl");
var shootArea = document.getElementById("shootControl");


shootArea.addEventListener("touchstart", function () {
    
    setInterval(function () {
        player.shoot();
    }, 500);

});



leftArea.addEventListener("touchstart", function () {
    direction = "left";
    clearInterval(timer2);
    timer = setInterval(function () {
        update();
        draw();
      
    }, 30);
    
});

rightArea.addEventListener("touchstart", function () {
    direction = "right";
    timer = setInterval(function () {
        update();
        draw();
    }, 30);
   
});

leftArea.addEventListener("touchend", function () {
    clearInterval(timer);
});

rightArea.addEventListener("touchend", function () {
    clearInterval(timer);
});

var player = {
    color: "#000",
    x: 5,
    y: 145,
    width: 32,
    height: 4,
    draw: function () {
       
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
};


var playerBullets = [];

player.shoot = function () {

    var bulletPosition = this.midpoint();

    playerBullets.push(Bullet({
        speed: 5,
        x: bulletPosition.x,
        y: bulletPosition.y
    }));
};

player.midpoint = function () {
    return {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2
    };
};





function update() {
    if (player.x >= 0 && player.x < 270) {
        if (direction == "left") {
            player.x -= 2;
        }

        if (direction == "right") {
            player.x += 2;
        }
    }
    else {
     //   console.log("X: "+player.x);
        if (player.x <= 0) {
            player.x = 0;
        }
        if (player.x >= 270) {
            player.x = 269;
        }
    }

    playerBullets.forEach(function (bullet) {
        bullet.update();
    });

    //playerBullets = playerBullets.filter(function (bullet) {
    //    return bullet.active;
    //});
}
draw();
function draw() {
    canvas.clearRect(0, 0, 300, 300);
    player.draw();
    playerBullets.forEach(function (bullet) {
        bullet.draw();
    });

}



// Bullets


function Bullet(I) {
    I.active = true;

    I.xVelocity = 0;
    I.yVelocity = -I.speed;
    I.width = 3;
    I.height = 3;
    I.color = "#000";

    I.inBounds = function () {
        return I.x >= 0 && I.x <= CANVAS_WIDTH &&
          I.y >= 0 && I.y <= CANVAS_HEIGHT;
    };

    I.draw = function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    };

    I.update = function () {
        I.x += I.xVelocity;
        I.y += I.yVelocity;

        I.active = I.active && I.inBounds();
    };

    I.explode = function () {
        this.active = false;
        // Extra Credit: Add an explosion graphic
    };

    return I;
}
