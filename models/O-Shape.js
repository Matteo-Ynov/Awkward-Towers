class OShape extends Shape {
    constructor(x, rotation) {
        super(
            x, [
                { x: 0, y: 0 },
                { x: 100, y: 0 },
                { x: 100, y: 100 },
                { x: 0, y: 100 },
            ],
            rotation
        );
        this.img = OShapeImage;
        this.offset = { x: -0, y: -0 };
    }
}