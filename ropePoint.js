class RopePoint{
    constructor(x,y, rad){
        this.posX = x;
        this.posY = y;
        this.pointRadius = rad;
        this.attachRadius = 200;
        this.isCut = false;
        this.attachRadiusSquare = this.attachRadius * this.attachRadius;
    }

    draw(){
        grahics.beginFill(0xFFFF00);
        grahics.drawCircle(this.posX,this.posY,this.pointRadius);

        app.stage.addChild(grahics);
    }

    checkIfCandyInRadius(cndy){
        if(this.isCut){
            return;
        }
        const pos = cndy.body.position;
        if((pos.x - this.posX)*(pos.x - this.posX) + (pos.y - this.posY)*(pos.y - this.posY) < this.attachRadiusSquare){
            connectRopeToCandy(this);
        }
    }
}