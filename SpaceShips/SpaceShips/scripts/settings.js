var deleteHighScoresBtn = document.getElementById("DeleteHighScoresBtn");
var automatiShootingSwitch = document.getElementById("AutomaticShootingSwitch");
var pernamentStorage = window.localStorage;

if (automatiShootingSwitch == true) {
    alert("True");
}

var isAutomaticShootingEnabled;

pernamentStorage.setItem
