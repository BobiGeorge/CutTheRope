class Candy{ 
    constructor(x,y,r, texture){
        this.body = Bodies.circle(x,y,r);
        Body.setMass(this.body, 10);
        World.add(world, this.body);
        this.radius = r;

        this.sprite = new PIXI.Sprite(texture);   
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.width = r*2;
        this.sprite.height = r*2;

        this.float = false;
        this.bubble;

        app.stage.addChild(this.sprite);
    }

    draw(){
    const pos = this.body.position;
    this.sprite.x = pos.x;
    this.sprite.y = pos.y;
    }
    
    destroy(){
        World.remove(world, candy.body);
        app.stage.removeChild(this.sprite);
    }

    floatToggle(tg, b){
        this.float = tg;
        if(tg == false){
            Matter.Body.setVelocity(this.body, { x: 0, y: 0});

        }
        this.bubble = b;
    }

    floatUp(){
        if(!this.float){
            return;
        }
        const pos = this.body.position;
        Matter.Body.setVelocity(this.body, { x: 0, y: this.body.position.y -2  - this.body.position.y });

        this.bubble.posX = pos.x;
        this.bubble.posY = pos.y;
        this.bubble.draw();
    }
}