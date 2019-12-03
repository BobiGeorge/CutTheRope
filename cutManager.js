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
                let actualX = e2.clientX - contx.left;
                let actualY = e2.clientY - contx.top;
                if(this.previousPoint){
                    console.log("conutextu");
                    console.log(contx.top);
                    console.log(e2.clientY);
                    console.log(e2.clientY - contx.top);
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