class Block{
    constructor(x,y,w,h, fixed){
        this.body = Bodies.rectangle(x,y,w,h);
        World.add(world, this.body);
        this.w = w;
        this.h = h;
        this.body.isStatic = fixed;

        this.texture = PIXI.Texture.from("images/ropeBlock.png");
        this.sprite = new PIXI.Sprite(this.texture);   
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.width = w;
        this.sprite.height = h;

        app.stage.addChild(this.sprite);
    }

    draw(){
        const pos = this.body.position;
        this.sprite.x = pos.x;
        this.sprite.y = pos.y;
    }

    destroy(){
        app.stage.removeChild(this.sprite);
    }
    // draw(){
    //     grahics.beginFill(0xFFFF00);

    //     const pos = this.body.position;
    //     grahics.drawRect(pos.x,pos.y,this.w, this.h);

    //     app.stage.addChild(grahics);
    // }
}