import {Canvas} from "./Canvas";
import {Platforms} from "./Platforms";

export class Animation{
    canvas: Canvas;

    constructor(canvasElement: Canvas) {
        this.canvas = canvasElement;
        this.animate();
    }
    animate(){
        requestAnimationFrame(()=>this.animate());

        this.canvas.platforms.forEach((platform:Platforms)=>{
            platform.animate();
        });
        this.canvas.doodler.animate()
        this.canvas.draw();
    }
}