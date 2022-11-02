import { Application, Container, Graphics, Text } from "pixi.js";

import { BUTTON_STATE, ChestButton, CONSTANTS } from '../../constants/index';
import { AbstractGameScene } from "../Scene";

export class MainScene extends AbstractGameScene {
    private chests: ChestButton[] = []
    private playButton: Graphics
    private playText: Text = new Text('')
    private WIDTH: number
    private HEIGHT: number

    constructor(app: Application) {
        super(app)

        this.WIDTH = app.screen.width
        this.HEIGHT = app.screen.height

        this.playButton = this.setupPlayButton()
    }


    setup(sceneContainer: Container) {
        this.sceneContainer = sceneContainer
        this.sceneContainer.addChild(this.playButton)
        for (let i = 0; i < CONSTANTS.NUMBER_CHESTS; i++) {
            this.sceneContainer.addChild(this.chests[i].graphic)
        }
    }

    setupPlayButton() {
        this.playButton = new Graphics()
        this.playButton.buttonMode = true
        this.playText = new Text("PLAY", CONSTANTS.BUTTON_PLAY_ENABLE_STYLE)
        this.playText.x = (this.WIDTH - 100) / 2
        this.playText.y = this.HEIGHT - (this.playButton.height + (this.playText.height * 2))
        this.playText.buttonMode = true
        this.playButton.addChild(this.playText)
        this.drawPlayButton()
        this.drawChestsButtons()

        return this.playButton
    }

    drawPlayButton() {
        this.playButton.beginFill(0xcccc, 1)
        this.playButton.drawRect(
            0,
            this.HEIGHT - CONSTANTS.CHEST_HEIGHT,
            this.WIDTH,
            CONSTANTS.CHEST_HEIGHT
        )
        this.playButton.endFill()
    }

    setPlayState(state: BUTTON_STATE) {
        switch (state) {
            case BUTTON_STATE.ENABLE:
                this.drawPlayButton();
                this.playText.style = CONSTANTS.BUTTON_PLAY_ENABLE_STYLE;
                this.playButton.interactive = true;
                break;
            case BUTTON_STATE.DISABLE:
                this.drawPlayButton();
                this.playText.style = CONSTANTS.BUTTON_PLAY_DISABLE_STYLE;
                this.playButton.interactive = false;
                break;
        }
    }

    drawChestsButtons() {
        for (let i = 0; i < CONSTANTS.NUMBER_CHESTS; i++) {
            const graphic = new Graphics()
            const x = ((i + 1) % 2 ? Math.round((this.WIDTH - 1) / 2) : 0)
            const y = ((i + 1) % 2 ? Math.round(CONSTANTS.CHEST_HEIGHT * (i + 1) / 2) : Math.round(CONSTANTS.CHEST_HEIGHT * i / 2))
            const width = Math.round(this.WIDTH / 2) - 1
            const height = CONSTANTS.CHEST_HEIGHT - 1
            const text = new Text('Chest', CONSTANTS.BUTTON_PLAY_DISABLE_STYLE)
            text.anchor.set(0.5)
            text.x = x + Math.round((this.WIDTH - 750) / 2) - 1
            text.y = y + Math.round((height) / 2)
            graphic.addChild(text)

            const chestObject: ChestButton = { index: i, graphic, text, x, y, width, height, isPressed: false }
            this.chests.push(chestObject)
            this.chests[i].graphic.buttonMode = true

            this.drawChestButton(i)
        }
    }

    drawChestButton(index: number) {
        this.chests[index].graphic.beginFill(CONSTANTS.CHEST_COLOR, 1)
        this.chests[index].graphic.drawRect(this.chests[index].x, this.chests[index].y, this.chests[index].width, this.chests[index].height)
        this.chests[index].graphic.endFill()
    }

    sceneUpdate(delta: number): void {
        throw new Error("Method not implemented.");
    }

    reset() {
        this.playText.style = CONSTANTS.BUTTON_PLAY_ENABLE_STYLE
    }

    preTransitionUpdate(delta: number): void {

    }
}