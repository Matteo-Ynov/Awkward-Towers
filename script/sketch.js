var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;

var engine;
var ground;
var world;

var nextShape;

var currentRotation = 0;

let objects = [];

var cooldown = false;

var cooldownInterval;
var shutdownCooldown;

var shutdownCooldownHandler = () => {
    shutdownCooldown = setTimeout(() => {
        if (objects.length > 0 && objects[objects.length - 1].body.speed < 0.4) {
            objects[objects.length - 1].body.isStatic = true;
            cooldown = false;
            clearInterval(cooldownInterval);
        } else {
            shutdownCooldownHandler();
        }
    }, 3000);
};

var updateCooldown = () => {
    shutdownCooldownHandler();
    cooldownInterval = setInterval(() => {
        if (
            cooldown == true &&
            objects.length > 0 &&
            objects[objects.length - 1].body.speed < 0.28
        ) {
            objects[objects.length - 1].body.isStatic = true;
            cooldown = false;
            clearInterval(cooldownInterval);
            clearTimeout(shutdownCooldown);
        } else if (objects[objects.length - 1].body.position.y > windowHeight) {
            objects.pop();
            cooldown = false;
            clearInterval(cooldownInterval);
            clearTimeout(shutdownCooldown);
        }
    }, 100);
};

function setup() {
    createCanvas(windowWidth, windowHeight);

    engine = Engine.create();
    world = engine.world;
    Matter.Common.setDecomp(require("poly-decomp"));
    ground = Bodies.rectangle(windowWidth / 2, windowHeight, 600, 150, {
        isStatic: true,
    });
    World.add(world, ground);
    var runner = Runner.create();
    Runner.run(runner, engine);

    nextShape = Math.floor(Math.random() * allShapes.length);
}

function draw() {
    background(0);
    fill(255);

    if (!cooldown) {
        push();
        translate(mouseX, 100);
        rotate((currentRotation * PI) / 180);
        image(allShapes[nextShape], -75, -50);
        pop();
    }
    image(groundImage, windowWidth / 2 - 300, windowHeight - 75, 600, 150);
    for (var i = 0; i < objects.length; i++) {
        objects[i].show();
    }
}

function mousePressed() {
    if (!cooldown) {
        objects.push(getShapeFromInt(nextShape, mouseX, currentRotation));
        nextShape = Math.floor(Math.random() * allShapes.length);
        cooldown = true;
        setTimeout(() => {
            updateCooldown();
        }, 300);

        currentRotation = Math.round(Math.random() * 4) * 90;
    }
}

function windowResized() {
    ground = Bodies.rectangle(windowWidth / 2, windowHeight, 600, 150, {
        isStatic: true,
    });
    resizeCanvas(windowWidth, windowHeight);
}