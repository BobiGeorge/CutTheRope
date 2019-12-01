class Block{
    constructor(x,y,w,h, fixed){
        this.body = Bodies.rectangle(x,y,w,h);
        World.add(world, this.body);
        this.w = w;
        this.h = h;
        this.body.isStatic = fixed;
    }

    draw(){
        grahics.beginFill(0xFFFF00);

        const pos = this.body.position;
        grahics.drawRect(pos.x,pos.y,this.w, this.h);

        app.stage.addChild(grahics);
    }
}