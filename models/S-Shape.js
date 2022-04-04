class SShape extends Shape {
    constructor(x, rotation) {
        super(
            x, [
                { x: 0, y: 50 },
                { x: 50, y: 50 },
                { x: 50, y: 0 },
                { x: 150, y: 0 },
                { x: 150, y: 50 },
                { x: 100, y: 50 },
                { x: 100, y: 100 },
                { x: 0, y: 100 },
            ],
            rotation
        );
        this.img = SShapeImage;
        this.offset = { x: -150, y: -50 };
    }
}