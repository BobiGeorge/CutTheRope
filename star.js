class Star{
    constructor(x,y, h, w, p){
        this.posX = x;
        this.posY = y;
        this.height = h;
        this.width = w;
        this.points = p;

        this.texture = PIXI.Texture.from("images/star.png");
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

    destroy(){
        app.stage.removeChild(this.sprite);  
    }
}