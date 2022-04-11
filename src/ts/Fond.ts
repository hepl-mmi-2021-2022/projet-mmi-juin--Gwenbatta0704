import {settings} from "./settings";
import {random2} from "./helpers";

export class Fond{
    canvasElement : HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvasElement = canvasElement;
        this.ctx = ctx;
         this.draw();
    }
     draw(){
        this.ctx.fillStyle = '#E9E9D0';
         this.ctx.fillRect(0,0,this.canvasElement.width, this.canvasElement.height);
     }
}