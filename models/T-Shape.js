class TShape extends Shape {
    constructor(x, rotation) {
        super(
            x, [
                { x: 0, y: 0 },
                { x: 150, y: 0 },
                { x: 150, y: 50 },
                { x: 100, y: 50 },
                { x: 100, y: 100 },
                { x: 50, y: 100 },
                { x: 50, y: 50 },
                { x: 0, y: 50 },
            ],
            rotation
        );
        this.img = TShapeImage;
        this.offset = { x: -150, y: -50 };
    }
}