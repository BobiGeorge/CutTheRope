PIXI.utils.sayHello();
console.log(Matter);

const {Engine, World, Body, Bodies, Mouse, MouseConstraint, Constraint, Constraints, Composite, Composites} = Matter;

let screenWidth;
let screenHeight;

let renderer;
let stage;
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

let candyTexture = PIXI.Texture.from("images/ctrCandy.png");
let blockTexture = PIXI.Texture.from("images/ropeBlock.png");
let bubbleTexture = PIXI.Texture.from("images/bubble.png");
let frogTexture =  PIXI.Texture.from("images/frog1.png");
let ropePointsTexture = PIXI.Texture.from("images/ropePoint.png");
let spikeTexture = PIXI.Texture.from("images/spike.png");
let starTexture = PIXI.Texture.from("images/star.png");
let areaRPTexture = PIXI.Texture.from("images/pointArea.png");

console.log(candyTexture);
main();

function main(){
    setupWorld();
    levelManager.setupLevel();
    loop();
    console.log(renderer.view);
}

function setupWorld(){
    renderer = new PIXI.Renderer({
        width: window.innerWidth,
        height: window.innerHeight
    })
    document.body.appendChild(renderer.view);

    stage = new PIXI.Container();

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
    renderer.render(stage);
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
