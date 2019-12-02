class LevelManager{
    setupLevel(){
        this.setBackground();
        candy = new Candy(310,350,40);
        frog = new Frog(1200, 600, 80,80);
        this.createRopePointWithCandy(310, 160, 10);
        this.createRopePoint(500, 350, 10);
        this.createRopePoint(700,140,10);
        this.createRopePoint(1000, 150, 10);

        replayButton = new ReplayButton();
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
        console.log("imma mario");
        candy = null;
        ropes = [];
        ropePoints = [];
        Matter.World.clear(world);
        Matter.Engine.clear(engine);
        this.setupLevel();
    }

    trackCandyStatus(){
        this.checkIfCandyInRange();
        this.checkIfCandyOutside();
    }

    checkIfCandyInRange(){
        let pos = candy.body.position;
        if(frog.posX <= pos.x && pos.x <= frog.posX + frog.width
            && frog.posY <= pos.y && pos.y <= frog.posY + frog.height){
                this.endLevel(true);
        }
    }

    checkIfCandyOutside(){
        let pos = candy.body.position;
        if(0 > pos.x || pos.x > screenWidth
            || 0 > pos.y || pos.y > screenHeight){
                this.endLevel(false);
        }
    }

    endLevel(win){
        let scoreText;
        if(win){
            World.remove(world, candy.body);
            this.cutRopesToCandy();
            candy.destroy();
            replayButton.draw();
            scoreText = new PIXI.Text("Level completed");
        }
        else{
            replayButton.draw();
            scoreText = new PIXI.Text("Level failed");
        }
        app.stage.addChild(scoreText);
        scoreText.x = replayButton.sprite.x - replayButton.sprite.width;
        scoreText.y = replayButton.sprite.y - replayButton.sprite.height * 2;
    }

    cutRopesToCandy(){
        for(let rp of ropes){
            if(rp.constrainToCandy){
                rp.cut();
            }
        }
    }
}