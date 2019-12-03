class LevelManager{
    setupLevel(){
        this.setBackground();
        candy = new Candy(310,350,40, candyTexture);
        frog = new Frog(1200, 600, 80,80, frogTexture);
        stars.push(new Star(500, 200, 40, 40, starTexture));
        spikes.push(new Spike(600, 400, 80,40, spikeTexture));
        bubbles.push(new Bubble(400, 600, 100,100, bubbleTexture));
        this.createRopePointWithCandy(310, 160, 20,20);
        this.createRopePoint(500, 350, 20,20);
        this.createRopePoint(700,140,20,20);
        this.createRopePoint(1000, 150, 20,20);

        guiManager.drawStarCounter();
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
    
    createRopePoint(x,y,w,h){
        let newRP = new RopePoint(x, y, w,h,ropePointsTexture)
        ropePoints.push(newRP);
        return newRP;
    }
    
    createRopePointWithCandy(x,y, w,h){
        this.connectRopeToCandy(this.createRopePoint(x, y, w, h));
    }
    
    resetLevel(){
        candy = null;
        ropes = [];
        ropePoints = [];
        guiManager.clearGui();
        while(app.stage.children[0]) {
             app.stage.removeChild(app.stage.children[0]); 
        }
        Matter.World.clear(world);
        Matter.Engine.clear(engine);
        this.setupLevel();
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
        //check if player hits spikes
        for(let spike of spikes){
            if(this.checkIfCandyInRange(spike)){
                this.endLevel(false);
            }
        } 
        //check if player enters bubble
        for(let bu of bubbles){
            if(this.checkIfCandyInRange(bu)){
                if(!bu.hasCandy){
                    candy.floatToggle(true, bu);
                    bu.attachCandy();
                }
            }
        } 
    }

    checkIfCandyInRange(obj){
        let pos = candy.body.position;
        // range is extended to not be too precise
       return(obj.posX - obj.width <= pos.x && pos.x <= obj.posX + obj.width
            && obj.posY <= pos.y && pos.y <= obj.posY + obj.height);
    }

    checkIfCandyOutside(){
        let pos = candy.body.position;
        if(0 > pos.x || pos.x > screenWidth
            || -50 > pos.y || pos.y > screenHeight + 10){
                this.endLevel(false);
        }
    }

    endLevel(win){
        guiManager.setEndLevelScore(win);
        replayButton.draw();
        this.cutRopesToCandy();
        candy.destroy();
    }

    getStar(st){
        guiManager.collectStar();
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