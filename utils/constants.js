var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;

var currentSkin = "basic";

var TShapeImage;
var LShapeImage;
var JShapeImage;
var SShapeImage;
var ZShapeImage;
var OShapeImage;
var IShapeImage;

var heartImage;
var heartEmptyImage;

var groundImage;

var allShapes;

var highscorePanel;

const getOffset = (shape) => {
    switch (shape) {
        case 5:
            return { x: -50, y: -50 };
        case 6:
            return { x: -100, y: -25 };
        default:
            return { x: -75, y: -50 };
    }
};

function preload() {
    groundImage = loadImage("../assets/base.png", () => {
        groundImage.resize(600, 150);
    });

    TShapeImage = loadImage(
        `../assets/shapes-images-${currentSkin}/T-Shape.png`,
        () => {
            TShapeImage.resize(150, 100);
        }
    );
    LShapeImage = loadImage(
        `../assets/shapes-images-${currentSkin}/L-Shape.png`,
        () => {
            LShapeImage.resize(150, 100);
        }
    );
    JShapeImage = loadImage(
        `../assets/shapes-images-${currentSkin}/J-Shape.png`,
        () => {
            JShapeImage.resize(150, 100);
        }
    );
    SShapeImage = loadImage(
        `../assets/shapes-images-${currentSkin}/S-Shape.png`,
        () => {
            SShapeImage.resize(150, 100);
        }
    );
    ZShapeImage = loadImage(
        `../assets/shapes-images-${currentSkin}/Z-Shape.png`,
        () => {
            ZShapeImage.resize(150, 100);
        }
    );
    OShapeImage = loadImage(
        `../assets/shapes-images-${currentSkin}/O-Shape.png`,
        () => {
            OShapeImage.resize(100, 100);
        }
    );
    IShapeImage = loadImage(
        `../assets/shapes-images-${currentSkin}/I-Shape.png`,
        () => {
            IShapeImage.resize(200, 50);
        }
    );

    heartEmptyImage = loadImage("../assets/heart-empty.png", () => {
        heartEmptyImage.resize(50, 50);
    });
    heartImage = loadImage("../assets/heart.png", () => {
        heartImage.resize(50, 50);
    });

    highscorePanel = loadImage("../assets/highscorepanel.png", () => {
        highscorePanel.resize(190, 45);
    });

    allShapes = [
        TShapeImage,
        LShapeImage,
        JShapeImage,
        SShapeImage,
        ZShapeImage,
        OShapeImage,
        IShapeImage,
    ];
}