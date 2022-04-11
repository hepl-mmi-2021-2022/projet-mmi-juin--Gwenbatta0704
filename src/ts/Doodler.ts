import {settings} from "./settings";
import {Platforms} from "./Platforms";

export class Doodler {
    private canvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    // private sprite: HTMLImageElement;
    private position: { x: number; y: number };
    public platforms : Platforms[];
    public isHeating: boolean;
    public move: {x:number, y:number};

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, platforms : Platforms[]) {
        this.canvasElement = canvasElement;
        this.ctx = ctx;
        this.platforms = platforms;
        // this.sprite = new Image();
        // this.sprite.src = settings.doodler.sprite;
        this.move = {x:settings.doodler.move.x, y:settings.doodler.move.y};
        this.isHeating = false;
        this.position = {
            x:this.canvasElement.width/2,
            y:this.canvasElement.height
        }
        this.draw();
        this.animate();
        this.checkTouchPlatforms();
    }
    animate(){
        if (this.position.x <0 || this.position.x> this.canvasElement.width){
            this.move.x = -this.move.x
        }if (this.position.y < 450 || this.position.y> this.canvasElement.height){
            this.move.y = -this.move.y
        }
        this.position.x += this.move.x;
        this.position.y += this.move.y;
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
    draw() {
        this.ctx.fillStyle = '#66c286';
        this.ctx.fillRect(this.position.x,this.position.y - 30,30, 30);
        this.ctx.restore();
    }

    checkTouchPlatforms() {
        this.platforms.forEach((platform: Platforms)=>{
            if (this.position.y + 30 > platform.position.y + platform.height){
                console.log(this.platforms[this.platforms.length-1])
             //this.position.y -=  this.canvasElement.height - platform.position.y
            }
        })
    }
}