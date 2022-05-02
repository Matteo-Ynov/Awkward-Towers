class LShape extends Shape {
    constructor(x) {
        super(x, [
            { x: 0, y: 50 },
            { x: 100, y: 50 },
            { x: 100, y: 0 },
            { x: 150, y: 0 },
            { x: 150, y: 100 },
            { x: 0, y: 100 },
        ]);
        this.img = LShapeImage;
        this.offset = { x: -150, y: -100 };
    }
}