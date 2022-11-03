import { Container, DisplayObject, Application, Text } from 'pixi.js';

import { RandomChestController } from '../../RandomChestController';
import { AbstractGameScene } from '../Scene';
import { CONSTANTS } from './../../constants/index';

export class BonusScene extends AbstractGameScene {
    private titleText: Text
    private animationText: Text
    private amountText: Text
    private counter: number = 0
    private WIDTH: number
    private HEIGHT: number

    constructor(app: Application) {
        super(app)

        this.WIDTH = app.screen.width
        this.HEIGHT = app.screen.height

        this.titleText = new Text("Bonus Screen", CONSTANTS.BUTTON_PLAY_ENABLE_STYLE)
        this.titleText.anchor.set(0.5)
        this.titleText.x = Math.round(this.WIDTH / 2)
        this.titleText.y = Math.round(this.HEIGHT / 6)

        this.animationText = new Text("You win bonus animation", CONSTANTS.BUTTON_PLAY_ENABLE_STYLE)
        this.animationText.anchor.set(.5)
        this.animationText.x = Math.round(this.WIDTH / 2)
        this.animationText.y = Math.round(this.HEIGHT / 2)

        this.amountText = new Text("Bonus win amount", CONSTANTS.BUTTON_PLAY_ENABLE_STYLE)
        this.amountText.anchor.set(.5)
        this.amountText.x = Math.round(this.WIDTH / 2)
        this.amountText.y = Math.round(this.HEIGHT / 1.2)
    }

    update() {
        this.amountText.text = `Bonus win amount ${RandomChestController.getCurrentData().bonusWin}$`
    }

    sceneUpdate(delta: number): void {
        this.animationText.scale.set(
            this.counter > 75 ? this.animationText.scale.x - .02 * delta : this.animationText.scale.x + .02 * delta
        )
        this.counter++
        if (this.counter > 200) {
            this.counter = 0
            this.animationText.scale.set(1)
            this.sceneSwitcher('mainScene')
        }
    }

    setup(sceneContainer: Container<DisplayObject>): void {
        this.sceneContainer = sceneContainer

        this.update()

        this.sceneContainer.addChild(this.titleText)
        this.sceneContainer.addChild(this.animationText)
        this.sceneContainer.addChild(this.amountText)
    }
    preTransitionUpdate(delta: number): void {
    }

}