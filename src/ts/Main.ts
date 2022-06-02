import {Canvas} from "./Canvas";
import {Animation} from "./Animation";
import {GameController} from "./GameController";
import {settings} from "./settings";

class Main{
    private canvas: Canvas;
    private animation: Animation;
    private gameController: GameController;
    private sprite: HTMLImageElement;

    constructor() {
        this.sprite = new Image();
        this.sprite.src = settings.doodler.sprite;
        this.sprite.addEventListener("load", ()=>{
        this.canvas = new Canvas(this.sprite);
        this.animation = new Animation(this.canvas);
        this.gameController = new GameController(this.animation);

        })
    }
}
new Main();