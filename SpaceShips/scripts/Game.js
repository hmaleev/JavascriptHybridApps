/// <reference path="../kendo/js/jquery.min.js" />
var FPS = 30;
var c = document.getElementById("canvas");
var canvas = c.getContext("2d");
var textX = 50;
var textY = 50;
var direction = null;
var CANVAS_WIDTH = c.width;
var CANVAS_HEIGHT = c.height;

var highscores = [];
var permanentStorage = window.localStorage;

var res = permanentStorage.getItem("score");
if (res!==null) {
    console.log(highscores);

}
highscoresLength = 5;


var timer = null;
var timer2 = null;
var timer3 = null;

var leftArea = document.getElementById("leftControl");
var rightArea = document.getElementById("rightControl");

var playerBullets = [];

var enemies = [];

var player = {
    // color: "#000",
    x: 125,
    y: 130,
    width: 45,
    height: 15,
    score: 0,
    active: true,
    draw: function () {

        //canvas.fillStyle = this.color;
        //canvas.fillRect(this.x, this.y, this.width, this.height);
        canvas.drawImage(ship, 0, 9, 95, 87, player.x, player.y, player.width, player.height);

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
    },
    explode: function () {
        this.active = false;

        navigator.notification.confirm(
        'You are dead!',
         onConfirm,
        'Game Over',
        ['Restart', 'Exit']);

        highscores.sort(function (a, b) {
            return b.score - a.score
        })
        console.log("Higs Scores Length: " + highscores.length);
        if (highscores.length < 5) {
            highscores.push({ name: 'Pesh', score: player.score });
        }
        else {
            for (var i = 0; i < highscores.length; i++) {
                if (highscores[i].score<player.score) {
                    highscores.splice(i,0,{ name: 'Pesho11' + i, score: player.score });
                    highscores.pop();
                    break;
                }
            }
        }
        player.score = 0;
        permanentStorage.setItem("score", JSON.stringify(highscores));
       
      //  console.log( JSON.parse(res));
    }
    
};

setInterval(function () {
    if (player.active == true) {
        update();
        draw();
    }

}, 30);

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

    handleCollisions();

}

// Bullets

function Bullet(I) {
    I.active = true;

    I.xVelocity = 0;
    I.yVelocity = -I.speed;
    I.width = 3;
    I.height = 3;
    I.color = "#0F0";

    I.inBounds = function () {
        return I.x >= 0 && I.x <= CANVAS_WIDTH &&
          I.y >= 0 && I.y <= CANVAS_HEIGHT;
    };

    I.draw = function () {
        //canvas.fillStyle = this.color;
        //canvas.fillRect(this.x, this.y, this.width, this.height);
        canvas.drawImage(ship, 350, 803, 10, 19, this.x, this.y, 5, 5);
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

    I.x = Math.random() * 200;
    I.y = 0;
    I.xVelocity = 0;
    I.yVelocity = Math.random() * 2;

    I.width = 20;
    I.height = 10;

    I.inBounds = function () {
        return I.x >= 0 && I.x <= CANVAS_WIDTH &&
          I.y >= 0 && I.y <= CANVAS_HEIGHT;
    };

    I.draw = function () {
        //    canvas.fillStyle = this.color;
        //    canvas.fillRect(this.x, this.y, this.width, this.height);
        canvas.drawImage(asteroid, 7, 5, 50, 50, this.x, this.y, this.width, this.height);

    };

    I.update = function () {
        I.x += I.xVelocity;
        I.y += I.yVelocity;

        //    I.xVelocity = 3;

        //   I.age++;

        I.active = I.active && I.inBounds();
    };
    I.explode = function () {
        this.active = false;
        player.score += 100;
        // Extra Credit: Add an explosion graphic
    };


    return I;
};

//Collision

function collides(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function handleCollisions() {
    playerBullets.forEach(function (bullet) {
        enemies.forEach(function (enemy) {
            if (collides(bullet, enemy)) {
                enemy.explode();
                bullet.active = false;
            }
        });
    });

    enemies.forEach(function (enemy) {
        if (collides(enemy, player)) {
            enemy.explode();
            player.explode();
        }
    });
}

//acceleration


// The watch id references the current `watchAcceleration`
var watchID = null;

// Wait for PhoneGap to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() {
    startWatch();
}

function onConfirm(buttonIndex) {
    if (buttonIndex == 1) {
        player.active = true;
        enemies = [];
    }
    else {
        window.location = "index.html";
    }
}


// Start watching the acceleration
//
function startWatch() {


    var options = { frequency: 250 };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccess(acceleration) {
    //  var element = document.getElementById('accelerometer');
    /* element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                         'Acceleration Y: ' + acceleration.y + '<br />' +
                         'Acceleration Z: ' + acceleration.z + '<br />' +
                         'Timestamp: '      + acceleration.timestamp + '<br />';*/
    if (acceleration.x > 2) {
        direction = "left";
        player.shoot();
    }
    else if (acceleration.x < -2) {
        direction = "right";
        player.shoot();
    }

    else {
        direction = "none";
        player.shoot();

    }
}
// onError: Failed to get the acceleration
//
function onError() {
    //    alert('onError!');

}

