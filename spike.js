class Spike{
    constructor(x,y,w,h){
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;

        this.texture = PIXI.Texture.from("images/spike.png");
        this.sprite = new PIXI.Sprite(this.texture);   
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.width = w;
        this.sprite.height = h;
        
        app.stage.addChild(this.sprite);
        this.draw();
    }
    draw(){
        this.sprite.x = this.posX;
        this.sprite.y = this.posY;
    }
}