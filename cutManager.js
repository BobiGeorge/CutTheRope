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
                let contx = renderer.view.getBoundingClientRect();

                //adjusting the mouse input to the centered canvas
                let actualX = e2.clientX - contx.left;
                let actualY = e2.clientY - contx.top;

                //a line defined by the point previousPoint and the current mouse click position e2
                //comparing if the line intersects a rope
                if(this.previousPoint){
                    let currentPoint = {x: actualX, y: actualY};
                    ropes.forEach(rope => {
                        if(rope.checkForCut(currentPoint, this.previousPoint)){
                            rope.cut();
                        }
                    });
                }
                this.previousPoint = { x: actualX, y:actualY}
            }
        })
        
        document.addEventListener('mouseup', (e) =>{
            this.isMouseDown = false;
            this.previousPoint = null;
        })
    }
}