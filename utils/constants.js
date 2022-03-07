var TShapeImage;
var LShapeImage;
var JShapeImage;
var SShapeImage;
var ZShapeImage;
var OShapeImage;
var IShapeImage;

var allShapes;

function preload() {
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

    allShapes = [
        TShapeImage,
        LShapeImage,
        JShapeImage,
        SShapeImage,
        ZShapeImage,
        // OShapeImage,
        // IShapeImage,
    ];
}