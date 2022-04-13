import {settings} from "./settings";
import {Platforms} from "./Platforms";
import {getDistance} from "./helpers";

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
    private test: number;

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
        this.test = settings.doodler.jump;
        this.animate();
        //this.draw();

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
        if (this.position.y < this.canvasElement.height - this.test || this.position.y > this.canvasElement.height) {
            console.log(this.canvasElement.height - this.test)
            this.move.y = -this.move.y
        }
        this.position.x += this.move.x;
        this.position.y += this.move.y;
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.checkTouchPlatforms();
        this.draw();

    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x + settings.doodler.frames[this.animationStep].width / 26, this.position.y - settings.doodler.frames[this.animationStep].height / 2);
        this.ctx.scale(0.5, 0.5);
        this.ctx.drawImage(this.sprite, settings.doodler.frames[this.animationStep].sx, settings.doodler.frames[this.animationStep].sy, settings.doodler.frames[this.animationStep].width, settings.doodler.frames[this.animationStep].height, 0, 0, settings.doodler.frames[this.animationStep].width, settings.doodler.frames[this.animationStep].height);
        this.ctx.restore();


    }

    checkTouchPlatforms() {
        this.platforms.forEach((platform: Platforms, index) => {

            const bottomDoodlerL = {
                x: this.position.x,
                y: Math.floor(this.position.y),
            };
            const bottomDoodlerR = {
                x: this.position.x + settings.doodler.frames[0].width,
                y: Math.floor(this.position.y),
            };
            const platformTopL = {
                x: Math.floor(platform.position.x + settings.doodler.frames[0].width / 2),
                y: Math.floor(platform.position.y),

            };
            const platformTopR = {
                x: Math.floor(platform.position.x + platform.width),
                y: Math.floor(platform.position.y),

            };
            if ((bottomDoodlerL.y === platformTopL.y) || (bottomDoodlerL.y === platformTopR.y) || (bottomDoodlerR.y === platformTopL.y) || (bottomDoodlerR.y === platformTopR.y)) {
                if ((bottomDoodlerR.x >= platformTopL.x) && (bottomDoodlerL.x <= platformTopR.x)) {
                    //console.log(this.platforms.indexOf(platform) , index)
                    if (this.platforms.indexOf(platform) === index) {
                        //this.position.y -= this.position.y +Math.floor(platform.position.y);
                        console.log(Math.floor(platform.position.y))
                        this.test -= platform.width
                        this.test -= platform.width
                        this.move.y = -this.move.y;
                    }
                    settings.doodler.jump += platform.width
                    this.position.y += this.move.y;
                    //console.log(settings.doodler.jump )
                }
            }
        })
    }
}

