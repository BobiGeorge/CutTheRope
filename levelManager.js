class LevelManager{
    setupLevel(){
        this.setBackground();
        candy = new Candy(310,180,40, candyTexture);
        candy.isStatic = true;
        frog = new Frog(1200, 600, 80,80, frogTexture);
        stars.push(new Star(450, 40, 40, 40, starTexture));
        spikes.push(new Spike(1000, 400, 80,40, spikeTexture));
        bubbles.push(new Bubble(950, 600, 100,100, bubbleTexture));
        this.createRopePointWithCandy(310, 50, 20,20,80);
        this.createRopePointWithCandy(290, 400, 20,20,50);
        this.createRopePointWithCandy(650,140,20,20, 200);
        this.createRopePoint(1200, 500, 20,20,120);

        candy.isStatic = false;
        guiManager.drawStarCounter();
        replayButton = new ReplayButton();
    }
    setBackground(){
        let backgroudTexture = PIXI.Texture.from("images/background.png");
        let backSprite = new PIXI.Sprite(backgroudTexture);   
        backSprite.height = window.innerHeight;
        backSprite.width = window.innerWidth;
        stage.addChild(backSprite);
    }
    
    connectRopeToCandy(rp){
        this.createRope( rp);
        rp.connectToCandy();
    }
    
    createRope(rp){
        let newR = new Rope(rp.posX, rp.posY, candy,rp.ropeLength);
        ropes.push(newR);
    }
    
    createRopePoint(x,y,w,h,rpLength){
        let newRP = new RopePoint(x, y, w,h,ropePointsTexture, areaRPTexture,rpLength);
        ropePoints.push(newRP);
        return newRP;
    }
    
    createRopePointWithCandy(x,y, w,h, rpLength){
        this.connectRopeToCandy(this.createRopePoint(x, y, w, h, rpLength));
    }
    
    resetLevel(){
        candy = null;
        ropes = [];
        ropePoints = [];
        guiManager.clearGui();
        while(stage.children[0]) {
            stage.removeChild(stage.children[0]); 
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
        if(0 > pos.x || pos.x > window.innerWidth
            || -50 > pos.y || pos.y > window.innerHeight + 10){
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