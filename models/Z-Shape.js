class ZShape extends Shape {
    constructor(x) {
        super(x, [
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 50 },
            { x: 150, y: 50 },
            { x: 150, y: 100 },
            { x: 50, y: 100 },
            { x: 50, y: 50 },
            { x: 0, y: 50 },
        ]);
        this.img = ZShapeImage;
        this.offset = { x: -150, y: -100 };
    }
}