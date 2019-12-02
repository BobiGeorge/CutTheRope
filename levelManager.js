class LevelManager{


    setupLevel(){
        this.setBackground();
        candy = new Candy(310,350,40);
        frog = new Frog(1200, 600, 80,80);
        this.createRopePointWithCandy(310, 160, 10);
        this.createRopePoint(500, 350, 10);
        this.createRopePoint(700,140,10);
        this.createRopePoint(1000, 150, 10);
    }
    setBackground(){
        let backgroudTexture = PIXI.Texture.from("images/background.png");
        let backSprite = new PIXI.Sprite(backgroudTexture);   
        backSprite.height = window.innerHeight;
        backSprite.width = window.innerWidth;
        app.stage.addChild(backSprite);
    }
    
    connectRopeToCandy(rp){
        this.createRope(rp.posX, rp.posY);
        rp.isActive = true;
    }
    
    createRope(x,y){
        let newR = new Rope(x, y, candy);
        ropes.push(newR);
    }
    
    createRopePoint(x,y,r){
        let newRP = new RopePoint(x, y, r)
        ropePoints.push(newRP);
        return newRP;
    }
    
    createRopePointWithCandy(x,y, r){
        this.connectRopeToCandy(this.createRopePoint(x, y, r));
    }
    
    resetLevel(){
        candy = null;
        ropes = [];
        ropePoints = [];
    }
}