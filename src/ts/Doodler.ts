import {settings} from "./settings";
import {Platforms} from "./Platforms";
import {getDistance} from "./helpers";

export class Doodler {
    private canvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    public sprite: HTMLImageElement;
    // private sprite: HTMLImageElement;
    public position: { x: number; y: number };
    public platforms: Platforms[];
    public isHeating: boolean;
    public move: { x: number, y: number };
    private counterInterval: number;
    private maxInterval: number;
    private maxAnimationStep: number;
    public animationStep: number;
    private iCount: number;
    private jump: number;
    private isGoingDown: boolean;

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
        this.iCount = 3;
        this.jump = settings.doodler.jump;
        this.isGoingDown = false;
        this.animate();

    }

    animate() {
        if (this.position.x < -40) {
            this.move.x = -this.move.x
            this.position.x = this.canvasElement.width;
        }
        if (this.position.x > this.canvasElement.width + 35) {
            this.move.x = -this.move.x
            this.position.x = -35;
        }
        if (this.jump > settings.doodler.Maxjump || this.jump < 0) {
            this.isGoingDown = !this.isGoingDown
        }
        if (!this.isGoingDown) {
            this.jump += this.move.y
            this.position.y -= this.jump;
        } else {
            this.position.y += this.jump;
            this.jump -= this.move.y
        }
        this.position.x += this.move.x
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.draw();
        this.checkTouchPlatforms();
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x + settings.doodler.frames[this.animationStep].width / 26, this.position.y - settings.doodler.frames[this.animationStep].height / 2);
        this.ctx.scale(0.5, 0.5);
        this.ctx.fillRect(this.position.x + settings.doodler.frames[this.animationStep].width / 26, this.position.y - settings.doodler.frames[this.animationStep].height / 2,78,78 )
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
                x: Math.floor(platform.position.x - settings.doodler.frames[0].width / 2),
                y: Math.floor(platform.position.y),
            };
            const platformTopR = {
                x: Math.floor(platform.position.x + platform.width + settings.doodler.frames[0].width / 2),
                y: Math.floor(platform.position.y),

            };
            // console.log(this.position.x, this.position.y)
            // console.log(platformTopL.x,platformTopR.x)

            if ((bottomDoodlerL.x >= platformTopL.x) && (bottomDoodlerR.x <= platformTopR.x)) {
                console.log('TEST')
                if (platform.color === 'rgba(173,98,44,1)') {
                    this.platforms.splice(index, 1);
                }
                if (bottomDoodlerL.y >= platformTopL.y) {
                    this.position.y = platform.position.y
                    console.log('TITO')
                }else{
                    this.position.y = this.canvasElement.height
                }
            }
            // if(bottomDoodlerR.y >= platformTopR.y){
            // console.log('ICI')
            // if ((bottomDoodlerR.x >= platformTopL.x) && (bottomDoodlerL.x <= platformTopR.x)) {
            //     console.log('touche')
            //     // this.position.y = platform.position.y;

            //     }
            // }
        })
    }
}

