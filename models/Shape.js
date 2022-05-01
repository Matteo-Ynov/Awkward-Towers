class Shape {
    constructor(x, vertices) {
        this.body = Bodies.fromVertices(x, 100, vertices, {}, false, 1);
        this.body.isStatic = true;
        this.img = createImage(100, 100);
        this.body.friction = 0.9;
        this.body.restitution = 0;

        World.add(game.world, this.body);

        this.offset = { x: -100, y: -50 };
    }
    show() {
        var angle = this.body.angle;

        //        For debug Purposes
        // for (var i = 0; i < this.body.vertices.length; i++) {
        //     fill(255, 0, 0);
        //     ellipse(this.body.vertices[i].x, this.body.vertices[i].y, 5);
        // }

        push();
        translate(this.body.vertices[0].x, this.body.vertices[0].y);
        rotate(angle);
        image(this.img, this.offset.x, this.offset.y);
        pop();
    }

    drop() {
        this.body.isStatic = false;
    }

    rotate(rotation) {
        Matter.Body.rotate(this.body, (rotation * PI) / 180);
    }

    move(direction) {
        Matter.Body.translate(this.body, { x: direction * 10, y: 0 });
    }
}