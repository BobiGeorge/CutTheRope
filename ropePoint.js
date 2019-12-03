class RopePoint extends GameObject{
    constructor(x,y,w,h,texture){
        super(x,y,w,h,texture);

        this.pointRadius = w/2;
        this.attachRadius = 200;
        this.isActive = false;
        this.attachRadiusSquare = this.attachRadius * this.attachRadius;
        
        this.draw();
    }

    draw(){
        this.sprite.x = this.posX;
        this.sprite.y = this.posY;
    }

    // draw(){
    //     grahics.beginFill(0xFFFF00);
    //     grahics.drawCircle(this.posX,this.posY,this.pointRadius);

    //     app.stage.addChild(grahics);
    // }

    checkIfCandyInRadius(cndy){
        if(this.isActive){
            return;
        }
        const pos = cndy.body.position;
        return((pos.x - this.posX)*(pos.x - this.posX) + (pos.y - this.posY)*(pos.y - this.posY) < this.attachRadiusSquare);
    }
}