PIXI.utils.sayHello();
console.log(Matter);

const {Engine, World, Body, Bodies, Mouse, MouseConstraint, Constraint, Constraints, Composite, Composites} = Matter;

let screenWidth = 1400;
let screenHeight = 720;

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

// game objects
let candy;
let frog;
let ropes = [];
let ropePoints = [];
let stars = [];
let spikes = [];
let bubbles=[];
let startCollected = 0;

//defining the game objects textures
let candyTexture = PIXI.Texture.from("images/ctrCandy.png");
let blockTexture = PIXI.Texture.from("images/ropeBlock.png");
let bubbleTexture = PIXI.Texture.from("images/bubble.png");
let frogTexture =  PIXI.Texture.from("images/frog1.png");
let ropePointsTexture = PIXI.Texture.from("images/ropePoint.png");
let spikeTexture = PIXI.Texture.from("images/spike.png");
let starTexture = PIXI.Texture.from("images/star.png");
let areaRPTexture = PIXI.Texture.from("images/pointArea.png");

//start
main();

function main(){
    setupWorld();
    levelManager.setupLevel();
    loop();

    //setting up the event listener
    document.addEventListener("click", printMousePos);
}

function setupWorld(){
    renderer = new PIXI.Renderer({
        width: screenWidth,
        height: screenHeight
    })
    document.body.appendChild(renderer.view);

    stage = new PIXI.Container();

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
    Matter.Engine.update(engine);

    //looking out for candy interactions
    levelManager.trackCandyStatus()

    candy.draw();
    candy.floatUp();
    for(let i = 0; i < ropes.length;i++){
        ropes[i].draw();
    }

    //looking out for candy getting in range of rope points
    for(let i = 0; i < ropePoints.length;i++){
        if(ropePoints[i].checkIfCandyInRadius(candy)){
            levelManager.connectRopeToCandy(ropePoints[i]);
        }
    }
    requestAnimationFrame(loop);
} 

// testing purposes only
// allows to move interactable game objects
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

// PIXIjs sprite.click method does not work properly, so this is a workaround 
// it might be interfering with the Matter.js library
function printMousePos(event) {
    for(let bu of bubbles){
        if(bu.posX - bu.width <= event.clientX &&event.clientX <= bu.posX + bu.width
        && bu.posY <=event.clientY && event.clientY <= bu.posY + bu.height){
            candy.floatToggle(false, null);
            bu.destroy();
        }     
    } 
}
  
