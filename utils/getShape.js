const getShapeFromInt = (shapeId) => {
    switch (shapeId) {
        case 0:
            return new TShape(WINDOW_WIDTH / 2);
        case 1:
            return new LShape(WINDOW_WIDTH / 2);
        case 2:
            return new JShape(WINDOW_WIDTH / 2);
        case 3:
            return new SShape(WINDOW_WIDTH / 2);
        case 4:
            return new ZShape(WINDOW_WIDTH / 2);
        case 5:
            return new OShape(WINDOW_WIDTH / 2);
        case 6:
            return new IShape(WINDOW_WIDTH / 2);
    }
};