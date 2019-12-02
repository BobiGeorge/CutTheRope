class Candy{
    constructor(x,y,r){
        this.body = Bodies.circle(x,y,r);
        Body.setMass(this.body, 10);
        World.add(world, this.body);
        this.radius = r;

        this.texture = PIXI.Texture.from("images/ctrCandy.png");
        this.sprite = new PIXI.Sprite(this.texture);   
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.width = r*2;
        this.sprite.height = r*2;

        app.stage.addChild(this.sprite);
    }

    // draw(){
    //     grahics.beginFill(0xFFFF00);

    //     const pos = this.body.position;
    //     grahics.drawCircle(pos.x,pos.y,this.radius);

    //     app.stage.addChild(grahics);
    // }

    draw(){
    const pos = this.body.position;
    this.sprite.x = pos.x;
    this.sprite.y = pos.y;
    }
    
    destroy(){
        app.stage.removeChild(this.sprite);
    }
}