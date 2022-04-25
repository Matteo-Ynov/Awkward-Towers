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

        this.shapeToPlace = WINDOW_WIDTH / 2;

        Matter.Common.setDecomp(require("poly-decomp"));

        this.lives = 5;

        this.currentOffset = 0;
        this.offSetTarget = 0;
        this.currentOffsetLoop;
    }

    generateNextShape() {
        if (
            this.objects.length > 0 &&
            this.objects[this.objects.length - 1].body.position.y < WINDOW_HEIGHT / 2
        ) {
            this.addOffset(
                WINDOW_HEIGHT / 2 -
                this.objects[this.objects.length - 1].body.position.y
            );
            // console.log(this.objects[-1].body.position.y);
        }
        this.nextShape = Math.floor(Math.random() * allShapes.length);
        this.currentShape = getShapeFromInt(this.nextShape);
    }

    draw() {
        clear();
        fill(255);
        if (!this.cooldown) {
            this.currentShape.show();
        }
        image(
            groundImage,
            WINDOW_WIDTH / 2 - 300,
            this.ground.position.y - 75,
            600,
            150
        );
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].show();
        }

        for (var i = 5; i > 0; i--) {
            image(
                i > this.lives ? heartEmptyImage : heartImage,
                WINDOW_WIDTH - 65 * 5 + (i - 1) * 65,
                10,
                60,
                60
            );
        }
    }

    dropShape() {
        if (!this.cooldown) {
            this.currentShape.drop();
            this.objects.push(this.currentShape);
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
                this.objects[this.objects.length - 1].body.speed < 0.8
            ) {
                this.objects[this.objects.length - 1].body.isStatic = true;
                this.cooldown = false;
                this.generateNextShape();
                this.currentRotation = 0;
                clearInterval(this.cooldownInterval);
            } else {
                this.shutdownCooldownHandler();
            }
        }, 5000);
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
                this.generateNextShape();
                this.currentRotation = 0;
                clearInterval(this.cooldownInterval);
                clearTimeout(this.shutdownCooldown);
            } else if (
                this.objects[this.objects.length - 1].body.position.y > WINDOW_HEIGHT
            ) {
                this.lives -= 1;
                this.removeLastShape();
                this.cooldown = false;
                this.generateNextShape();
                this.currentRotation = 0;
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

    moveShape(direction) {
        if (!this.cooldown) {
            this.currentShape.move(direction);
        }
    }
    rotateShape() {
        if (!this.cooldown) {
            // this.currentRotation += 90;
            // if (this.currentRotation == 360) {
            //     this.currentRotation = 0;
            // }
            this.currentShape.rotate(90);
        }
    }

    addOffset(value) {
        this.offSetTarget = value;
        this.currentOffsetLoop = setInterval(() => {
            Matter.Body.translate(this.ground, { x: 0, y: 1 });
            for (var i = 0; i < this.objects.length; i++) {
                Matter.Body.translate(this.objects[i].body, { x: 0, y: 1 });
            }
            this.currentOffset += 1;
            if (this.currentOffset >= this.offSetTarget) {
                this.offSetTarget = 0;
                this.currentOffset = 0;
                clearInterval(this.currentOffsetLoop);
            }
        }, 10);
    }
}