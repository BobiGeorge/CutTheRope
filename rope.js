class Rope{

    constructor(x,y,cndy){
        this.prev = null;
        this.blocks = [];
        this.createRope(x,y);
        this.attachCandy(cndy);
        this.constrainToCandy;
    }

    createRope(x, y){
        for (let i = 0; i < 200; i+= 21){
            let fixed = !this.prev;
            let b1 = new Block(x + i, y + i, 10, 20, fixed);
            this.blocks.push(b1)

            if(this.prev){
                let options = {
                    bodyA: b1.body,
                    bodyB: this.prev.body,
                    length: 20,
                    stiffness: 1,
                }
                let constrain = Constraint.create(options);
                World.add(world, constrain);
            }
            this.prev = b1;
        }
    }

    attachCandy(cndy){
        let options;
        options = {
            bodyA: this.prev.body,
            bodyB: cndy.body,
            length: 50,
            stiffness: 1,
        }
        this.constrainToCandy = Constraint.create(options);
        World.add(world, this.constrainToCandy);
    }

    draw(){
        for (let i = 0; i < this.blocks.length; i++){
            this.blocks[i].draw();
        }
    }

    cut(){
        console.log(this.blocks[1]);

        for(var i = 0; i < this.blocks.length; i++){
            Matter.World.remove(world, this.blocks[i].body, true);
        }
        Matter.World.remove(world, this.constrainToCandy);
        this.blocks = [];
    }
}