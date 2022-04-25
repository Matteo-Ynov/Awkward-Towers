class JShape extends Shape {
    constructor(x) {
        super(x, [
            { x: 0, y: 0 },
            { x: 50, y: 0 },
            { x: 50, y: 50 },
            { x: 150, y: 50 },
            { x: 150, y: 100 },
            { x: 0, y: 100 },
        ]);
        this.img = JShapeImage;
        this.offset = { x: -150, y: -100 };
    }
}