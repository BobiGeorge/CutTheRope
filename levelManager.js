class LevelManager{

    setupLevel(){
        this.setBackground();

        //define the game objects that will be in the level
        //this is where you design the level
        candy = new Candy(310,280,40, candyTexture);
        frog = new Frog(1150, 200, 80,80, frogTexture);
        stars.push(new Star(460, 40, 40, 40, starTexture));
        stars.push(new Star(820, 450, 40, 40, starTexture));
        stars.push(new Star(1150, 300, 40, 40, starTexture));
        spikes.push(new Spike(880, 400, 80,40, spikeTexture));
        spikes.push(new Spike(960, 400, 80,40, spikeTexture));
        bubbles.push(new Bubble(960, 600, 100,100, bubbleTexture));
        bubbles.push(new Bubble(1170, 600, 100,100, bubbleTexture));
        this.createRopePointWithCandy(310, 50, 20,20,120);
        this.createRopePointWithCandy(290, 400, 20,20,50);
        this.createRopePointWithCandy(650,140,20,20, 200);
        this.createRopePoint(1070, 500, 20,20,100);

        //set up GUI
        guiManager.drawStarCounter();
        replayButton = new ReplayButton();
    }

    //sets the background sprite 
    setBackground(){
        let backgroudTexture = PIXI.Texture.from("images/background.png");
        let backSprite = new PIXI.Sprite(backgroudTexture);   
        backSprite.height = screenHeight;
        backSprite.width = screenWidth;
        stage.addChild(backSprite);
    }
    
    connectRopeToCandy(rp){
        this.createRope( rp);
        rp.connectToCandy();
    }
    
    // a rope cannot be created without being attached to the candy
    //the rope length is defined in its rope point
    createRope(rp){
        let newR = new Rope(rp.posX, rp.posY, candy,rp.ropeLength);
        ropes.push(newR);
    }
    
    //defining the length of the rope happens in the rope point
    createRopePoint(x,y,w,h,rpLength){
        let newRP = new RopePoint(x, y, w,h,ropePointsTexture, areaRPTexture,rpLength);
        ropePoints.push(newRP);
        return newRP;
    }
    
    //allows to attach a rope to the candy outside of the rope point range
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

    // this is where the candy checks if it's in range to interract with other objects
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

    //checks if game object that is passed is in range of candy
    checkIfCandyInRange(obj){
        let pos = candy.body.position;
        // range is extended to not be too precise
       return(obj.posX - obj.width/2 <= pos.x && pos.x <= obj.posX + obj.width/2
            && obj.posY <= pos.y && pos.y <= obj.posY + obj.height);
    }

    //checks if candy is outside of the screen
    //causes losing the level
    checkIfCandyOutside(){
        let pos = candy.body.position;
        if(0 > pos.x || pos.x > screenWidth
            || -50 > pos.y || pos.y > screenHeight + 10){
                this.endLevel(false);
        }
    }

    //win is a boolean
    //win tells if the level is successfull or failed
    endLevel(win){
        guiManager.setEndLevelScore(win);
        replayButton.draw();
        this.cutRopesToCandy();
        candy.destroy();
        this.popBubleWithCandy();
    }

    //whenever candy gets a star
    getStar(st){
        guiManager.collectStar();
        st.destroy();
    }

    //cuts all ropes connected to candy
    cutRopesToCandy(){
        for(let rp of ropes){
            if(rp.constrainToCandy){
                rp.cut();
            }
        }
    }

    //if a bubble holds candy, it will be destroyed
    popBubleWithCandy(){
        for(let bb of bubbles){
            if(bb.hasCandy){
                bb.destroy();
            }
        }
    }
}