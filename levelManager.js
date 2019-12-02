class LevelManager{
    setupLevel(){
        this.setBackground();
        candy = new Candy(310,350,40);
        frog = new Frog(1200, 600, 80,80);
        stars.push(new Star(500, 200, 40, 40, 10));
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
        while(app.stage.children[0]) {
             app.stage.removeChild(app.stage.children[0]); 
        }
        Matter.World.clear(world);
        Matter.Engine.clear(engine);
        this.setupLevel();
        this.replayButton.sprite.interactive = false;
    }

    trackCandyStatus(){
        //check if the player reaches the frog
        if(this.checkIfCandyInRange(frog)){
            this.endLevel(true);
        }
        //check if the player goes out of boundaries
        this.checkIfCandyOutside();
        //check if the player encounters a star
        for(let star of stars){
            if(this.checkIfCandyInRange(star)){
                this.getStar(star);
                console.log(star);

            }
        }
    }

    checkIfCandyInRange(obj){
        let pos = candy.body.position;
       return(obj.posX <= pos.x && pos.x <= obj.posX + obj.width
            && obj.posY <= pos.y && pos.y <= obj.posY + obj.height);
    }

    checkIfCandyOutside(){
        let pos = candy.body.position;
        if(0 > pos.x || pos.x > screenWidth
            || 0 > pos.y || pos.y > screenHeight){
                this.endLevel(false);
        }
    }

    endLevel(win){
        guiManager.setEndLevelScore(win);
        replayButton.draw();
        World.remove(world, candy.body);
        this.cutRopesToCandy();
        candy.destroy();
    }

    getStar(st){
        guiManager.setScore(st.points);
        st.destroy();
    }

    cutRopesToCandy(){
        for(let rp of ropes){
            if(rp.constrainToCandy){
                rp.cut();
            }
        }
    }
}