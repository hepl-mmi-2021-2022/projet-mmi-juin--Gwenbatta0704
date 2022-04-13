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
        if (this.position.y < this.canvasElement.height - settings.doodler.jump || this.position.y > this.canvasElement.height) {
            this.move.y = -this.move.y
        }
        this.position.x += this.move.x;
        this.position.y += this.move.y;
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.draw();
        this.checkTouchPlatforms();

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

                    this.move.y = -this.move.y
                    if (platform.active) {
                        settings.doodler.jump += 50 * index
                        this.position.y += this.move.y
                        console.log('ici')
                        platform.active = false
                        if (platform.color === 'rgba(173,98,44,1)') {
                            this.platforms.splice(index, 1);
                        }
                    } else {
                        // settings.doodler.jump -= 50 * index
                        //this.move.y += this.move.y
                        platform.active = true
                    }
                    this.position.y = platformTopL.y
                }
                //this.position.y += this.move.y
                console.log(settings.doodler.jump)
                console.log(platform.active, index)
                settings.doodler.jump = 100
            }
        })
    }
}

