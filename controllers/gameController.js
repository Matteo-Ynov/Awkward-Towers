class gameController {
    constructor() {
        this.engine = Engine.create();
        this.runner = Runner.create();
        this.world = this.engine.world;
        this.ground = Bodies.rectangle(WINDOW_WIDTH / 2, WINDOW_HEIGHT, 600, 150, {
            isStatic: true,
        });
        World.add(this.world, this.ground);
        Runner.run(this.runner, this.engine);

        this.objects = [];

        this.nextShape;

        this.currentRotation = 0;

        this.cooldown = 0;

        this.cooldownInterval;
        this.shutdownCooldown;

        Matter.Common.setDecomp(require("poly-decomp"));
        this.generateNextShape();
    }

    generateNextShape() {
        this.nextShape = Math.floor(Math.random() * allShapes.length);
    }

    draw() {
        clear();
        fill(255);
        if (!this.cooldown) {
            push();
            translate(mouseX, 100);
            rotate((this.currentRotation * PI) / 180);
            image(allShapes[this.nextShape], -75, -50);
            pop();
        }
        image(groundImage, WINDOW_WIDTH / 2 - 300, WINDOW_HEIGHT - 75, 600, 150);
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].show();
        }
    }

    dropShape() {
        if (!this.cooldown) {
            this.objects.push(
                getShapeFromInt(this.nextShape, mouseX, this.currentRotation)
            );
            this.generateNextShape();
            this.cooldown = true;
            setTimeout(() => {
                this.updateCooldown();
            }, 300);

            this.currentRotation = Math.round(Math.random() * 4) * 90;
        }
    }

    shutdownCooldownHandler() {
        this.shutdownCooldown = setTimeout(() => {
            if (
                this.objects.length > 0 &&
                this.objects[this.objects.length - 1].body.speed < 0.4
            ) {
                this.objects[this.objects.length - 1].body.isStatic = true;
                this.cooldown = false;
                clearInterval(this.cooldownInterval);
            } else {
                this.shutdownCooldownHandler();
            }
        }, 3000);
    }

    updateCooldown() {
        this.shutdownCooldownHandler();
        this.cooldownInterval = setInterval(() => {
            if (
                this.cooldown == true &&
                this.objects.length > 0 &&
                this.objects[this.objects.length - 1].body.speed < 0.28
            ) {
                this.objects[this.objects.length - 1].body.isStatic = true;
                this.cooldown = false;
                clearInterval(this.cooldownInterval);
                clearTimeout(this.shutdownCooldown);
            } else if (
                this.objects[this.objects.length - 1].body.position.y > WINDOW_HEIGHT
            ) {
                this.removeLastShape();
                this.cooldown = false;
                clearInterval(this.cooldownInterval);
                clearTimeout(this.shutdownCooldown);
            }
        }, 100);
    }

    resize() {
        this.ground = Bodies.rectangle(WINDOW_WIDTH / 2, WINDOW_HEIGHT, 600, 150, {
            isStatic: true,
        });
        resizeCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    }

    removeLastShape() {
        var e = this.objects.pop();
        World.remove(this.world, e.body);
    }
}