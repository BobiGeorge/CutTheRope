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

function SetupLevel(){
    createRopePoint(310, 160, 10);
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

function candyInRopePointRange(rp){
    createRope(rp.posX, rp.posY);
}

function createRope(x,y){
    newR = new Rope(x, y, candy);
    ropes.push(newR);
}

function createRopePoint(x,y,r){
    newRP = new RopePoint(x, y, r)
    ropePoints.push(newRP);
}

function resetLevel(){
    candy = null;
    ropes = [];
    ropePoints = [];
}


document.addEventListener('keydown', (e) => {
    ropes[0].cut();
    //candy.cut();
});