class gameController {
    constructor() {
        this.isPlaying = true;
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

        this.cumulOffset = 0;
        this.currentOffset = 0;
        this.offSetTarget = 0;
        this.currentOffsetLoop;

        this.currentScore = 0;

        this.gold = 0;
        this.highscore = 0;
        this.username = "";

        this.scoreDiv = document.getElementById("score");
    }

    convertHighscoreToYCoords() {
        return WINDOW_HEIGHT + this.cumulOffset - this.highscore;
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
        if (this.highscore > 0) {
            strokeWeight(4);
            line(
                0,
                this.convertHighscoreToYCoords(),
                WINDOW_WIDTH,
                this.convertHighscoreToYCoords()
            );
            strokeWeight(1);
            image(
                highscorePanel,
                20,
                this.convertHighscoreToYCoords() - highscorePanel.height / 2
            );
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
                var minY;
                for (var i = 0; i < this.objects.length; i++) {
                    if (!minY || minY > this.objects[i].body.position.y) {
                        minY = this.objects[i].body.position.y;
                    }
                }

                this.currentScore = WINDOW_HEIGHT - minY + this.cumulOffset;

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

                var minY;
                for (var i = 0; i < this.objects.length; i++) {
                    if (!minY || minY > this.objects[i].body.position.y) {
                        minY = this.objects[i].body.position.y;
                    }
                }
                this.currentScore = WINDOW_HEIGHT - minY + this.cumulOffset;

                clearInterval(this.cooldownInterval);
                clearTimeout(this.shutdownCooldown);
            } else if (
                this.objects[this.objects.length - 1].body.position.y > WINDOW_HEIGHT
            ) {
                this.lives -= 1;
                if (this.lives === 0) {
                    this.isPlaying = false;
                    document.getElementById("container").classList.remove("hide");
                    this.scoreDiv.innerHTML =
                        "Your score : " + Math.round(this.currentScore);
                    document.getElementById("gold").innerHTML =
                        "+ " + Math.round(this.currentScore) + " Gold";
                    if (this.currentScore > this.highscore) {
                        document.getElementById("highscore").classList.remove("hide");
                        this.highscore = Math.round(this.currentScore);
                    }
                    this.updateGoldAndHighScore();
                } else {
                    this.generateNextShape();
                }
                this.removeLastShape();
                this.cooldown = false;
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
            this.cumulOffset += 1;
            if (this.currentOffset >= this.offSetTarget) {
                this.offSetTarget = 0;
                this.currentOffset = 0;
                clearInterval(this.currentOffsetLoop);
            }
        }, 10);
    }

    updateGoldAndHighScore() {
        this.gold += Math.round(this.currentScore);

        var req_headers = {
            gold: this.gold,
            highest_score: this.highscore,
        };
        console.log(req_headers);
        fetch(`http://localhost:5001/user/${this.username}`, {
            method: `PATCH`,
            headers: req_headers,
        });
    }
}