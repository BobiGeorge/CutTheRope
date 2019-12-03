class Bubble extends GameObject{
    constructor(x,y,w,h, texture){
        super(x,y,w,h,texture);
        this.draw();
        this.hasCandy = false;
    }

    draw(){
        this.sprite.x = this.posX;
        this.sprite.y = this.posY;
    }

    attachCandy(){
        this.hasCandy = true;
    }

    destroy(){
        app.stage.removeChild(this.sprite);
    }



}