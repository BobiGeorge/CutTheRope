PIXI.utils.sayHello();
console.log(Matter);

const {Engine, World, Body, Bodies, Mouse, MouseConstraint, Constraint, Constraints, Composite, Composites} = Matter;

let screenWidth;
let screenHeight;

let app;
let world ;
let engine;
let mouseConstraint;
let grahics;

let cutManager;
let levelManager;
let guiManager;
let replayButton;

let candy;
let frog;
let ropes = [];
let ropePoints = [];
let stars = [];
let spikes = [];
let bubbles=[];
let startCollected = 0;

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

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    grahics = new PIXI.Graphics();
    engine = Engine.create();
    world = engine.world;

    let mouse = Mouse.create();
    let optionz = {mouse: mouse}
    mouseConstraint = MouseConstraint.create(engine, optionz);

    cutManager = new CutManager();
    levelManager = new LevelManager();
    guiManager = new GUIManager();
}

function loop(){
    //grahics.clear();
    levelManager.trackCandyStatus()
    Matter.Engine.update(engine);
    candy.draw();
    candy.floatUp();
    for(let i = 0; i < ropes.length;i++){
        ropes[i].draw();
    }
    for(let i = 0; i < ropePoints.length;i++){
        if(ropePoints[i].checkIfCandyInRadius(candy)){
            levelManager.connectRopeToCandy(ropePoints[i]);
        }
    }
  //  replayButton.draw();
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
});

// PIXIjs sprite.click method does not work properly, so I doing a workaround 
function printMousePos(event) {
    for(let bu of bubbles){
        if(bu.posX - bu.width <= event.clientX &&event.clientX <= bu.posX + bu.width
        && bu.posY <=event.clientY && event.clientY <= bu.posY + bu.height){
            candy.floatToggle(false, null);
            bu.destroy();
        }     
    } 
    console.log("floatsu " +  candy.float);
  }
  
  document.addEventListener("click", printMousePos);
