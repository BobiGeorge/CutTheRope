PIXI.utils.sayHello();
console.log(Matter);

const {Engine, World, Body, Bodies, Mouse, MouseConstraint, Constraint, Constraints, Composite, Composites} = Matter;

let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
})
document.body.appendChild(app.view);

let world ;
let engine;
let candy;
let ropes = [];
let ropePoints = [];
let mouseConstraint;

engine = Engine.create();
world = engine.world;

let grahics = new PIXI.Graphics();

candy = new Candy(310,350,40);

SetupLevel();
Loop();

const mouse = Mouse.create();
const optionz = {mouse: mouse}
mouseConstraint = MouseConstraint.create(engine, optionz);

function SetupLevel(){
    createRopePointWithCandy(310, 160, 10);
    createRopePoint(500, 350, 10);
    createRopePoint(700,140,10);
    createRopePoint(1000, 150, 10);
}

function Loop(){
    grahics.clear();
    Matter.Engine.update(engine);
   // candy.draw();
    candy.otherDraw();
    for(let i = 0; i < ropes.length;i++){
        ropes[i].draw();
    }
    for(let i = 0; i < ropePoints.length;i++){
        ropePoints[i].draw();
        ropePoints[i].checkIfCandyInRadius(candy);
    }
    requestAnimationFrame(Loop);
}

function connectRopeToCandy(rp){
    createRope(rp.posX, rp.posY);
    rp.isCut = true;
}

function createRope(x,y){
    newR = new Rope(x, y, candy);
    ropes.push(newR);
}

function createRopePoint(x,y,r){
    newRP = new RopePoint(x, y, r)
    ropePoints.push(newRP);
    return newRP;
}

function createRopePointWithCandy(x,y, r){
    connectRopeToCandy(createRopePoint(x, y, r));
}

function resetLevel(){
    candy = null;
    ropes = [];
    ropePoints = [];
}

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

let isMouseDown = false;
document.addEventListener('mousedown', (e) =>{
    isMouseDown = true;
})

let previousPoint = undefined;
document.addEventListener('mousemove', (e2) => {
    if (isMouseDown){
        if(previousPoint){
            let currentPoint = {x: e2.clientX, y: e2.clientY};
            ropes.forEach(rope => {
                if(rope.checkForCut(currentPoint, previousPoint)){
                    rope.cut();
                }
            });
        }
        previousPoint = { x: e2.clientX, y:e2.clientY}
    }
})

document.addEventListener('mouseup', (e) =>{
    isMouseDown = false;
})