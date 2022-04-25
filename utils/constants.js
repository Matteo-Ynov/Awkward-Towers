var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;

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

    TShapeImage = loadImage("../assets/shapes-images/T-Shape.png", () => {
        TShapeImage.resize(150, 100);
    });
    LShapeImage = loadImage("../assets/shapes-images/L-Shape.png", () => {
        LShapeImage.resize(150, 100);
    });
    JShapeImage = loadImage("../assets/shapes-images/J-Shape.png", () => {
        JShapeImage.resize(150, 100);
    });
    SShapeImage = loadImage("../assets/shapes-images/S-Shape.png", () => {
        SShapeImage.resize(150, 100);
    });
    ZShapeImage = loadImage("../assets/shapes-images/Z-Shape.png", () => {
        ZShapeImage.resize(150, 100);
    });
    OShapeImage = loadImage("../assets/shapes-images/O-Shape.png", () => {
        OShapeImage.resize(100, 100);
    });
    IShapeImage = loadImage("../assets/shapes-images/I-Shape.png", () => {
        IShapeImage.resize(200, 50);
    });

    heartEmptyImage = loadImage("../assets/heart-empty.png", () => {
        heartEmptyImage.resize(50, 50);
    });
    heartImage = loadImage("../assets/heart.png", () => {
        heartImage.resize(50, 50);
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