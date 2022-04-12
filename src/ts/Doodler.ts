import {settings} from "./settings";
import {Platforms} from "./Platforms";

export class Doodler {
    private canvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    public sprite: HTMLImageElement;
    // private sprite: HTMLImageElement;
    private position: { x: number; y: number };
    public platforms: Platforms[];
    public isHeating: boolean;
    public move: { x: number, y: number };
    private counterInterval: number;
    private maxInterval: number;
    private maxAnimationStep: number;
    public animationStep: number;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, platforms: Platforms[], sprite: HTMLImageElement) {
        this.canvasElement = canvasElement;
        this.ctx = ctx;
        this.platforms = platforms;
        this.sprite = sprite;
        this.move = {x: settings.doodler.move.x, y: settings.doodler.move.y};
        this.isHeating = false;
        this.position = {
            x: this.canvasElement.width / 2,
            y: this.canvasElement.height
        }
        this.counterInterval = 0;
        this.maxInterval = 5;
        this.maxAnimationStep = settings.doodler.frames.length - 1;
        this.animationStep = 0

        this.animate();
        //this.draw();
        this.checkTouchPlatforms();
    }

    animate() {
        if (this.position.x < -35) {
            this.move.x = -this.move.x
            this.position.x = this.canvasElement.width;
        }
        if (this.position.x > this.canvasElement.width + 35) {
            this.move.x = -this.move.x
            this.position.x = 0;
        }
        if (this.position.y < this.canvasElement.height - settings.doodler.jump || this.position.y > this.canvasElement.height) {
            this.move.y = -this.move.y
        }
        this.position.x += this.move.x;
        this.position.y += this.move.y;
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.draw();
    }

    draw() {
        console.log(this.animationStep);
        this.ctx.save();
        this.ctx.translate(this.position.x + settings.doodler.frames[this.animationStep].width/26, this.position.y - settings.doodler.frames[this.animationStep].height / 2);
        this.ctx.scale(0.5, 0.5);
        this.ctx.drawImage(this.sprite, settings.doodler.frames[this.animationStep].sx, settings.doodler.frames[this.animationStep].sy, settings.doodler.frames[this.animationStep].width, settings.doodler.frames[this.animationStep].height, 0, 0, settings.doodler.frames[this.animationStep].width, settings.doodler.frames[this.animationStep].height);
        this.ctx.restore();

    }

    checkTouchPlatforms() {
        this.platforms.forEach((platform: Platforms) => {
            if (this.position.y + 30 > platform.position.y + platform.height) {
                //console.log(this.platforms[this.platforms.length - 1])
                // this.position.y -=  this.canvasElement.height - platform.position.y;
                //   this.animate();
            }
        })
    }
}