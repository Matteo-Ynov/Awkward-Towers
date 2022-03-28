const getShapeFromInt = (shapeId, mouseX, rotation) => {
    switch (shapeId) {
        case 0:
            return new TShape(mouseX, rotation);
        case 1:
            return new LShape(mouseX, rotation);
        case 2:
            return new JShape(mouseX, rotation);
        case 3:
            return new SShape(mouseX, rotation);
        case 4:
            return new ZShape(mouseX, rotation);
        case 5:
            return new OShape(mouseX, rotation);
        case 6:
            return new IShape(mouseX, rotation);
    }
};