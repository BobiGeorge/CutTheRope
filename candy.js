class Candy{
    constructor(x,y,r){
        this.body = Bodies.circle(x,y,r);
        Body.setMass(this.body, this.body.mass*8);
        World.add(world, this.body);
        this.radius = r;
    }

    draw(){
        grahics.beginFill(0xFFFF00);

        const pos = this.body.position;
        grahics.drawCircle(pos.x,pos.y,this.radius);

        app.stage.addChild(grahics);
    }

    otherDraw(){
    var texture = PIXI.Texture.from("images/candy.png");
    var sprite = new PIXI.Sprite(texture);

    const pos = this.body.position;

    sprite.x = pos.x;
    sprite.y = pos.y;

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    app.stage.addChild(sprite);
    }
}