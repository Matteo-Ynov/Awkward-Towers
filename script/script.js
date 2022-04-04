var game;
var WINDOW_WIDTH, WINDOW_HEIGHT;

var setup = () => {
    (WINDOW_WIDTH = windowWidth), (WINDOW_HEIGHT = windowHeight);
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    game = new gameController();
};

var draw = () => {
    game.draw();
};

var mousePressed = () => {
    game.dropShape();
};

// var windowResized = () => {
//     game.resize();
// };