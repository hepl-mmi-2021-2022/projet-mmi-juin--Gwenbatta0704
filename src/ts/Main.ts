import {Canvas} from "./Canvas";
import {Animation} from "./Animation";
import {GameController} from "./GameController";

class Main{
    private canvas: Canvas;
    private animation: Animation;
    private gameController: GameController;

    constructor() {
        this.canvas = new Canvas();
        this.animation = new Animation(this.canvas);
        this.gameController = new GameController(this.animation);
    }
}
new Main();