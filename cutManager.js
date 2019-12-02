class CutManager{
    constructor(){
        this.isMouseDown = false;
        this.previousPoint = undefined;
        this.setInput();
    }

    setInput(){
        document.addEventListener('mousedown', (e) =>{
            this.isMouseDown = true;
        })
        
        document.addEventListener('mousemove', (e2) => {
            if (this.isMouseDown){
                if(this.previousPoint){
                    let currentPoint = {x: e2.clientX, y: e2.clientY};
                    ropes.forEach(rope => {
                        if(rope.checkForCut(currentPoint, this.previousPoint)){
                            rope.cut();
                        }
                    });
                }
                this.previousPoint = { x: e2.clientX, y:e2.clientY}
            }
        })
        
        document.addEventListener('mouseup', (e) =>{
            this.isMouseDown = false;
            this.previousPoint = null;
        })
    }
}