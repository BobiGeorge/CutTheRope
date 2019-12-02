class RopePoint{
    constructor(x,y, r){
        this.posX = x;
        this.posY = y;
        this.pointRadius = r;
        this.attachRadius = 200;
        this.isActive = false;
        this.attachRadiusSquare = this.attachRadius * this.attachRadius;

        this.texture = PIXI.Texture.from("images/ropePoint.png");
        this.sprite = new PIXI.Sprite(this.texture);   
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.width = r*2;
        this.sprite.height = r*2;

        app.stage.addChild(this.sprite);
         
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