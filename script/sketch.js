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

function setup() {
    createCanvas(windowWidth, windowHeight);

    engine = Engine.create();
    world = engine.world;
    Matter.Common.setDecomp(require("poly-decomp"));
    ground = Bodies.rectangle(0, windowHeight - 50, windowWidth * 2, 50, {
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
    push();
    translate(mouseX, 100);
    rotate((currentRotation * PI) / 180);
    image(allShapes[nextShape], -75, -50);
    pop();

    rect(ground.position.x, ground.position.y - 25, windowWidth, 50);
    for (var i = 0; i < objects.length; i++) {
        objects[i].show();
    }
}

function mousePressed() {
    // objects.push(new ZShape(mouseX, currentRotation));
    objects.push(getShapeFromInt(nextShape, mouseX, currentRotation));
    nextShape = Math.floor(Math.random() * allShapes.length);

    currentRotation = Math.round(Math.random() * 4) * 90;
}

function windowResized() {
    ground = Bodies.rectangle(0, windowHeight - 50, windowWidth, 10, {
        isStatic: true,
    });
    resizeCanvas(windowWidth, windowHeight);
}