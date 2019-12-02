class GUIManager{
    constructor(){
        this.endLevelText;
        this.starCountText = new PIXI.Text(0);
        this.starCountText.x = 30;
        this.starCountText.y = 30;
    }

    setEndLevelScore(win){
        if(win){;
            this.endLevelText = new PIXI.Text("Level completed");
        }
        else{
            this.endLevelText = new PIXI.Text("Level failed");
        }
        this.endLevelText.x = replayButton.sprite.x - replayButton.sprite.width;
        this.endLevelText.y = replayButton.sprite.y - replayButton.sprite.height * 2;
        app.stage.addChild(this.endLevelText);
    }
  
    drawStarCounter(){
        app.stage.addChild(this.starCountText);
    }

    collectStar(){
        let st = parseInt(this.starCountText.text, 10);
        st += 1;
        this.starCountText.text = st;;
    }

    clearGui(){
        this.endLevelText.text = "";
        this.starCountText.text = 0;
    }
}