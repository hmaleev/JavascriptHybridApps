/// <reference path="../kendo/js/jquery.min.js" />
function show(e) {
    var FPS = 30;
    var c = document.getElementById("canvas");
    var canvas = c.getContext("2d");
    var direction = null;
    var CANVAS_WIDTH = c.width;
    var CANVAS_HEIGHT = c.height;

    var permanentStorage = window.localStorage;
    var playerName = permanentStorage.getItem("playerName");
    if (playerName == null) {
        playerName = "Player 1";
    }

    var automaticShooting = permanentStorage.getItem("automaticShooting");
    if (automaticShooting == null) {

        automaticShooting = "true";
    }
    highscoresLength = 5;

    var timer2 = null;

    var playerBullets = [];
    var enemies = [];

    var player = {
        name: playerName,
        x: 125,
        y: 130,
        width: 45,
        height: 15,
        score: 0,
        active: true,
        draw: function () {
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

            navigator.notification.vibrate(400);
            navigator.notification.confirm(
            'You are dead!',
             onConfirm,
            'Game Over',
            ['Restart', 'Exit']);
        }
    };

    var timer = setInterval(function () {
        if (player.active == true) {
            update();
            draw();
        }

    }, 1000 / FPS);

    c.addEventListener("touchstart", function () {
        if (automaticShooting == "false") {
            timer2 = setInterval(function () {
                player.shoot();
            }, 200);
        }
    });

    c.addEventListener("touchend", function () {
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
            canvas.drawImage(ship, 350, 803, 10, 19, this.x, this.y, 5, 5);
        };

        I.update = function () {
            I.x += I.xVelocity;
            I.y += I.yVelocity;

            I.active = I.active && I.inBounds();
        };

        I.explode = function () {
            this.active = false;
        };

        return I;
    }

    //Enemies

    function Enemy(I) {
        I = I || {};

        I.active = true;

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
                Score();
                enemy.explode();
                player.explode();
            }
        });
    }


    var backButton = document.getElementById("backBtn");
    backButton.addEventListener('click', function () {

        enemies = [];
        player.active = false;


    });

    //acceleration

    // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is ready
    //
    function onDeviceReady() {
        startWatch();
        document.addEventListener("pause", onPause, false);
        //    document.addEventListener("resume", onResume, false);
        navigator.geolocation.getCurrentPosition(
                function (position) {
                  
                    position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    alert(position);
                    map.panTo(position);
                    that._putMarker(position);

                    that._isLoading = false;
                    that.hideLoading();
                },
                function (error) {
                    //default map coordinates                    
                    position = new google.maps.LatLng(43.459336, -80.462494);
                    map.panTo(position);

                    that._isLoading = false;
                    that.hideLoading();

                    navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                        function () { }, "Location failed", 'OK');
                },
                {
                    timeout: 30000,
                    enableHighAccuracy: true
                }
            );


    }
    window.addEventListener("batterycritical", onBatteryCritical, false);


    function onNavigationSuccess(position) {
        var element = document.getElementById('geolocation');

        element.innerHTML = 
                            'Test: ' + Position.toLocaleString() + '<br />';
    } 

    // onError Callback receives a PositionError object
    //
    function onNavigationError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }



    //Score
    function Score() {

        var res = permanentStorage.getItem("localScore");
        if (res == null) {
            var highscores = [];

            console.log("highscores: empty");
            highscores.sort(function (a, b) {
                return b.score - a.score
            })
        }
        else {
            highscores = JSON.parse(res);
            console.log(highscores);
            highscores.sort(function (a, b) {
                return b.score - a.score
            })
        }
        highscores.sort(function (a, b) {
            return b.score - a.score
        })

        console.log("Higs Scores Length: " + highscores.length);
        if (highscores.length < 5) {
            highscores.push({ name: player.name, score: player.score });
        }
        else {
            for (var i = 0; i < highscores.length; i++) {
                if (highscores[i].score < player.score) {
                    highscores.splice(i, 0, { name: player.name, score: player.score });
                    highscores.pop();
                    break;
                }
            }
        }
        player.score = 0;
        permanentStorage.setItem("localScore", JSON.stringify(highscores));

    }

    function onConfirm(buttonIndex) {


        if (buttonIndex == 1) {
            player.active = true;
            enemies = [];
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

        if (acceleration.x > 1.8) {
            direction = "left";
            if (automaticShooting == "true") {
                player.shoot();
            }
        }
        else if (acceleration.x < -1.8) {
            direction = "right";
            if (automaticShooting == "true") {
                player.shoot();
            }
        }

        else {
            direction = "none";
            if (automaticShooting == "true") {
                player.shoot();
            }
        }
    }
    // onError: Failed to get the acceleration
    function onError() {
        //    alert('onError!');
    }
    // Handle the pause event

    function onPause() {
        alert("Paused");
    }

    function onBatteryCritical() {

        permanentStorage.setItem("enemies", JSON.stringify(enemies));
        pernamentStorage.setItem("playerBullets", JSON.stringify(playerBullets));
    }
}