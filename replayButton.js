class ReplayButton{
    constructor(){

        this.texture = PIXI.Texture.from("images/btnRestart.png");
        this.sprite = new PIXI.Sprite(this.texture);   
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.interactive = false;
        this.sprite.buttonMode = false;
        this.sprite.visible = false;
        this.sprite.on("pointerdown", this.performAction);

        app.stage.addChild(this.sprite);
 
    }

    performAction(){
    // this.lvlManager is undefined and I have no idea why
    // it is defined in the contructor
       levelManager.resetLevel();
    }

    draw(){
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.visible = true;
        this.sprite.x = window.innerWidth/2;
        this.sprite.y = window.innerHeight/2;
    }
}