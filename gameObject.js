class GameObject{
    constructor(x,y,w,h,texture){
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;

        this.texture = texture;
        this.sprite = new PIXI.Sprite(this.texture);   
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.width = w;
        this.sprite.height = h;
        
        app.stage.addChild(this.sprite);
    }
}