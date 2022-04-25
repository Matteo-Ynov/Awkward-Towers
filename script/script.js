var game;
var WINDOW_WIDTH, WINDOW_HEIGHT;

var setup = () => {
    (WINDOW_WIDTH = windowWidth), (WINDOW_HEIGHT = windowHeight);
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    game = new gameController();
    game.generateNextShape();
};

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