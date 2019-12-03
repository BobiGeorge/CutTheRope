class Star extends GameObject{
    constructor(x,y, h, w, texture){
        super(x,y,w,h,texture);

        this.draw();
    }
    draw(){
        this.sprite.x = this.posX;
        this.sprite.y = this.posY;
    }

    destroy(){
        stage.removeChild(this.sprite);  
        this.posX = 0;
        this.posY = 0;
    }
}