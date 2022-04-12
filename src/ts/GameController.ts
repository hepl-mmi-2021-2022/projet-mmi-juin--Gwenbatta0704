import {Animation} from "./Animation";

export class GameController {
    private isStart: boolean;
    private animation: Animation;

    constructor(animation: Animation) {
        this.animation = animation;
        this.isStart = false;
        this.addEventListeners()

    }
    addEventListeners() {
        window.addEventListener('load', (key: KeyboardEvent) => {
            if (!this.isStart) {
                this.isStart = true;
                this.animation.animate();
            }
            if (this.isStart) {
                this.animation.canvas.doodler.isHeating = true;
            }
        })
        window.addEventListener('keydown', (key: KeyboardEvent) => {
            if (this.isStart) {
                this.animation.canvas.doodler.isHeating = true;
            }
            if (key.key === 'ArrowLeft'){
                this.animation.canvas.doodler.move.x = -0.8;
                this.animation.canvas.doodler.animate();
                this.animation.canvas.doodler.animationStep = 1;
            }if (key.key === 'ArrowRight'){
                this.animation.canvas.doodler.move.x = 0.8;
                this.animation.canvas.doodler.animate();
                this.animation.canvas.doodler.animationStep = 0;
            }
        })
        window.addEventListener('keyup', (key: KeyboardEvent) => {
            if (this.isStart && key.code === 'ArrowLeft' || this.isStart && key.code === 'ArrowRight') {
                this.animation.canvas.doodler.isHeating = false;
                this.animation.canvas.doodler.move.x = 0;
                this.animation.canvas.doodler.animate();
            }
        })
    }
}
