class GUIManager{
    constructor(){
        this.endLevelText;
        this.scoreText = new PIXI.Text("hai hai");
        this.setScore(10);
        app.stage.addChild(this.scoreText);
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

    setScore(sc){
        this.scoreText.text = sc;
        this.scoreText.x = 222;
        this.scoreText.y = 222;
        console.log("wat");
    }
}