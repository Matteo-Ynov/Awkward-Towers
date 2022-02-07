var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;

var engine;
var ground;
var world;

let objects = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;
    ground = Bodies.rectangle(0, windowHeight - 50, windowWidth * 2, 50, {
        isStatic: true,
    });
    World.add(world, ground);
    var runner = Runner.create();
    Runner.run(runner, engine);
    console.log(ground);
}

function draw() {
    background(0);
    fill(255);
    rect(mouseX - 25, 50, 50, 50);
    rect(ground.position.x, ground.position.y, windowWidth, 50);
    for (var i = 0; i < objects.length; i++) {
        objects[i].show();
    }
}

function mousePressed() {
    objects.push(new Box(mouseX - 25));
}

function windowResized() {
    ground = Bodies.rectangle(0, windowHeight - 50, windowWidth, 10, {
        isStatic: true,
    });
    resizeCanvas(windowWidth, windowHeight);
}