var game;
var WINDOW_WIDTH, WINDOW_HEIGHT;
const { BrowserWindow, ipcRenderer } = require("electron");

ipcRenderer.on("nocookie", (e, cookies) => {
    window.location.href = "./index.html";
});

var setup = () => {
    (WINDOW_WIDTH = windowWidth), (WINDOW_HEIGHT = windowHeight);
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    game = new gameController();
    // game.generateNextShape();

    ipcRenderer.send("getCookies");
};

ipcRenderer.on("cookieok", (e, cookies) => {
    var username = cookies[0]["name"];
    fetch(`http://localhost:5001/user/${username}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            game.gold = data["gold"];
            game.highscore = data["highest_score"];
            game.username = data["username"];
            currentSkin = data["current_skin"];
            preload();
            game.generateNextShape();
        });
});

var draw = () => {
    game.draw();

    if (game.isPlaying) {
        if (keyIsDown(LEFT_ARROW)) {
            game.moveShape(-1);
        } else if (keyIsDown(RIGHT_ARROW)) {
            game.moveShape(1);
        }
    }
};

// var mousePressed = () => {
//     game.dropShape();
// };

var keyPressed = () => {
    if (game.isPlaying) {
        if (keyCode === 32) {
            game.dropShape();
        }
        if (keyCode === UP_ARROW) {
            game.rotateShape();
        }
    }
};

// var windowResized = () => {
//     game.resize();
// };