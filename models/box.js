class Box {
    constructor(x) {
        this.body = Bodies.rectangle(x, 50, 50, 50);
        World.add(world, this.body);
    }
    show() {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x + 25, pos.y + 25);
        rotate(angle);
        rect(-25, -25, 50, 50);
        pop();
    }
}