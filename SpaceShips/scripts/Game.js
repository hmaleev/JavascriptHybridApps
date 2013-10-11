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
var timer3 = null;

var leftArea = document.getElementById("leftControl");
var rightArea = document.getElementById("rightControl");

var playerBullets = [];

var enemies = [];

var player = {
    color: "#000",
    x: 5,
    y: 145,
    width: 32,
    height: 4,
    draw: function () {

        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    },
    shoot: function () {
        var bulletPosition = this.midpoint();

        playerBullets.push(Bullet({
            speed: 5,
            x: bulletPosition.x,
            y: bulletPosition.y
        }));
    },
    midpoint: function () {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    }
};

setInterval(function () {
    update();
    draw();
}, 20);

leftArea.addEventListener("touchstart", function () {
    direction = "left";
    clearInterval(timer2);
    timer2 = setInterval(function () {
        player.shoot();
    }, 200);
});

rightArea.addEventListener("touchstart", function () {
    direction = "right";
    timer2 = setInterval(function () {
        player.shoot();
    }, 200);

});

leftArea.addEventListener("touchend", function () {
    direction = null;
    clearInterval(timer2);
});

rightArea.addEventListener("touchend", function () {
    direction = null;
    clearInterval(timer2);

});



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
        if (player.x >= 269) {
            player.x = 269;
        }
    }

    playerBullets.forEach(function (bullet) {
        bullet.update();
    });


    enemies.forEach(function (enemy) {
        enemy.update();
    });

    enemies = enemies.filter(function (enemy) {
        return enemy.active;
    });

    if (Math.random() < 0.1) {
        enemies.push(Enemy());
    }


}
draw();
function draw() {
    canvas.clearRect(0, 0, 300, 300);
    player.draw();

    playerBullets.forEach(function (bullet) {
        bullet.draw();
    });

    enemies.forEach(function (enemy) {
        enemy.draw();
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



//Enemies


function Enemy(I) {
    I = I || {};

    I.active = true;
  //  I.age = Math.floor(Math.random() * 128);

    I.color = "#A2B";

    I.x = Math.random() *10;
    I.y = Math.random() * 33;
    I.xVelocity = Math.random() * 2;
    I.yVelocity = Math.random() * 2;

    I.width = 32;
    I.height = 2;

    I.inBounds = function() {
        return I.x >= 0 && I.x <= CANVAS_WIDTH &&
          I.y >= 0 && I.y <= CANVAS_HEIGHT;
    };

    I.draw = function() {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    };

    I.update = function() {
        I.x += I.xVelocity;
        I.y += I.yVelocity;

    //    I.xVelocity = 3;

     //   I.age++;

        I.active = I.active && I.inBounds();
    };

    return I;
};
