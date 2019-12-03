class RopePoint extends GameObject{
    constructor(x,y,w,h,texture, areaTexture, ropeLength){
        super(x,y,w,h,texture);

        this.pointRadius = w/2;
        this.attachRadius = 150;
        this.isActive = false;
        this.attachRadiusSquare = this.attachRadius * this.attachRadius;

        this.ropeLength = ropeLength;
        
        this.areaSprite = new PIXI.Sprite(areaTexture);   
        this.areaSprite.anchor.x = 0.5;
        this.areaSprite.anchor.y = 0.5;
        this.areaSprite.width = this.attachRadius * 2;
        this.areaSprite.height = this.attachRadius * 2;

        stage.addChild(this.areaSprite);
        this.draw();
    }

    draw(){
        this.sprite.x = this.posX;
        this.sprite.y = this.posY;

        this.areaSprite.x = this.posX;
        this.areaSprite.y = this.posY;
    }

    connectToCandy(){
        this.isActive = true;
        stage.removeChild(this.areaSprite);
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