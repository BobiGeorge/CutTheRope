class Rope{

    constructor(x,y,cndy, ropeLength){
        this.prev = null;
        this.blocks = [];
        this.ropeLength = ropeLength;
        this.createRope(x,y);
        this.attachCandy(cndy);
        this.constrainToCandy;
    }

    createRope(x, y){
        for (let i = 0; i < this.ropeLength; i+= 20){
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
                let newConstraint = Constraint.create(options);
                World.add(world, newConstraint);
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
        for(let block of this.blocks){
            Matter.World.remove(world, block.body, true);
            block.destroy();
        }
        Matter.World.remove(world, this.constrainToCandy);
        this.blocks = [];
    }

    checkForCut(p1,p2){
        for(let i = 0; i < this.blocks.length-1;i++){
            let first = this.blocks[i].body.position;
            let second = this.blocks[i+1].body.position;
            if(this.intersectRect(this.createRect(p1, p2), this.createRect(first, second))){
                console.log("Yes i am");
                return true;
            }
        }
        return false;
    }

    intersectRect(r1, r2) {
        return !(r2.left > r1.right || 
                r2.right < r1.left || 
                r2.top > r1.bottom ||
                r2.bottom < r1.top);
    }

    createRect(p1,p2){
        let left = 0;
        let right = 0;
        let top = 0;
        let bottom = 0;

        if (p1.x<p2.x){
            left = p1.x;
            right = p2.x;
        }else{
            right = p1.x;
            left = p2.x;
        }

        if (p1.y<p2.y){
            top = p1.y;
            bottom = p2.y;
        }else{
            bottom = p1.y;
            top = p2.y;
        }

        return {left: left, right:right, top:top, bottom:bottom}
    }
}