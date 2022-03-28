class IShape extends Shape {
    constructor(x, rotation) {
        super(
            x, [
                { x: 0, y: 0 },
                { x: 200, y: 0 },
                { x: 200, y: 50 },
                { x: 0, y: 50 },
            ],
            rotation
        );
        this.img = IShapeImage;
        this.offset = { x: -0, y: -0 };
    }
}