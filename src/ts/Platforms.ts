import {random, random2} from "./helpers";
import {settings} from "./settings";

export class Platforms {
    private canvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    public position: { x: number; y: number };
    private platforms: Platforms[];
    public sprite: HTMLImageElement;
    public width: number;
    public height: number;
    public active : boolean;
    public color: string;
    public stroke: string;
    private randomColor: number;
    private move: { x: number; y: number };
    private randomSpring: number;


    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, platforms: Platforms[], sprite: HTMLImageElement) {
        this.canvasElement = canvasElement;
        this.ctx = ctx;
        this.platforms = platforms;
        this.sprite = sprite;
        this.move = {
            x: settings.platform.move.x,
            y: settings.platform.move.y,
        }
        this.active = false;
        this.position = {
            x: this.canvasElement.width - random2(settings.platform.horizontalGap),
            y: this.platforms.length === 0 ? this.canvasElement.height-(settings.platform.verticalStart * this.canvasElement.height)  : this.platforms[this.platforms.length - 1].position.y - random2(settings.platform.verticalGap) * this.canvasElement.height,
        }
        this.width = settings.platform.width;
        this.height = settings.platform.height;
        this.randomColor = Math.random();
        this.randomSpring = Math.random();
        if (this.randomColor < settings.platform.ratioColor) {
            this.color = settings.platform.platforms.green
        } else {
            this.color = settings.platform.platforms.color[random(0, settings.platform.platforms.color.length, false)];
        }
        this.stroke = settings.platform.platforms.stroke
        this.draw();
        this.animate();
    }
    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.strokeStyle = this.stroke
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.arc(this.width, this.height / 2, this.height / 2, 0, Math.PI * 2)
        this.ctx.arc(0, this.height / 2, this.height / 2, 0, Math.PI * 2)
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        if ((this.randomSpring < settings.platform.ratioSpring) && (this.color === settings.platform.platforms.green)){
            this.ctx.scale(0.5,0.5)
            this.ctx.drawImage(this.sprite,settings.spring.frames[0].sx, settings.spring.frames[0].sy,settings.spring.frames[0].width,settings.spring.frames[0].height,this.width*0.5,-this.height*2,settings.spring.frames[0].width,settings.spring.frames[0].height)
        }
        this.ctx.restore();
    }

    animate() {
        if (this.color === settings.platform.platforms.color[0]) {
            if (this.position.x < 7 || this.position.x > this.canvasElement.width - (this.width +7)) {
                this.move.x = -this.move.x
            }
            this.position.x += this.move.x;
            this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }
    }
}