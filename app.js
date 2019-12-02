PIXI.utils.sayHello();
console.log(Matter);

const {Engine, World, Body, Bodies, Mouse, MouseConstraint, Constraint, Constraints, Composite, Composites} = Matter;

let app;
let world ;
let engine;
let candy;
let frog;
let ropes = [];
let ropePoints = [];
let mouseConstraint;
let grahics;
let cutManager;
let levelManager;

main();

function main(){
    setupWorld();
    levelManager.setupLevel();
    loop();
}

function setupWorld(){
    app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight
    })
    document.body.appendChild(app.view);

    grahics = new PIXI.Graphics();
    engine = Engine.create();
    world = engine.world;

    let mouse = Mouse.create();
    let optionz = {mouse: mouse}
    mouseConstraint = MouseConstraint.create(engine, optionz);

    cutManager = new CutManager();
    levelManager = new LevelManager();
}


function loop(){
    grahics.clear();
    frog.checkIfCandyInRange(candy);
    Matter.Engine.update(engine);
    candy.draw();
    for(let i = 0; i < ropes.length;i++){
        ropes[i].draw();
    }
    for(let i = 0; i < ropePoints.length;i++){
        if(ropePoints[i].checkIfCandyInRadius(candy)){
            levelManager.connectRopeToCandy(ropePoints[i]);
        }
    }
    requestAnimationFrame(loop);
} 

// testing purposes only
let mouz = false;
document.addEventListener('keydown', (e) => {
    if(e.keyCode == 37){
    ropes[0].cut();
    }
    if(e.keyCode == 39){
        if(!mouz){
            World.add(world, mouseConstraint);
        }else{
            World.remove(world, mouseConstraint);

        }
        
        mouz = !mouz;
    }
    //candy.cut();
});
