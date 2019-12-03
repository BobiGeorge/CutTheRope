class Frog extends GameObject{
    constructor(x,y,w,h,texture){
        super(x,y,w,h,texture);

        this.draw();
    }

    draw(){
        this.sprite.x = this.posX;
        this.sprite.y = this.posY;
    }
}