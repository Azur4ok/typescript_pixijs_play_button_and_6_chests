import { Application, Container, Graphics, Text } from "pixi.js";

import { CONSTANTS } from '../constants/index';

export class MainScene {
    private app: Application
    private sceneContainer: Container
    private chests: Graphics[] = []
    private chestsText: Text[] = []
    private playButton: Graphics
    private playText: Text = new Text('')
    private WIDTH: number
    private HEIGHT: number

    constructor(app: Application) {
        this.app = app
        this.WIDTH = app.screen.width
        this.HEIGHT = app.screen.height

        this.sceneContainer = new Container()

        this.playButton = new Graphics()
        this.playButton.buttonMode = true
        this.playText = new Text("PLAY", CONSTANTS.BUTTON_PLAY_ENABLE_STYLE)
        this.playText.x = (this.WIDTH - 100) / 2
        this.playText.y = this.HEIGHT - (this.playButton.height + this.playText.height + this.playText.height)
        this.playText.buttonMode = true
        this.playButton.addChild(this.playText)
        this.drawPlayButton()
        this.drawChestsButtons()
    }

    getSceneContainer() {
        return this.sceneContainer
    }

    setup() {
        this.sceneContainer.addChild(this.playButton)
        for (let i = 0; i < CONSTANTS.NUMBER_CHESTS; i++) {
            this.sceneContainer.addChild(this.chests[i])

        }
    }

    drawPlayButton() {
        this.playButton.beginFill(0xcccc, 1)
        this.playButton.drawRect(
            0,
            this.app.screen.height - CONSTANTS.CHEST_HEIGHT,
            this.app.screen.width,
            CONSTANTS.CHEST_HEIGHT
        )
        this.playButton.endFill()
    }

    drawChestsButtons() {
        for (let i = 0; i < CONSTANTS.NUMBER_CHESTS; i++) {
            this.chests.push(new Graphics())
            this.chests[i].buttonMode = true

            this.chestsText.push(new Text('Chest', CONSTANTS.BUTTON_PLAY_ENABLE_STYLE))
            this.chestsText[i].anchor.set(0.5)
            this.chestsText[i].x = ((i + 1) % 2 ? Math.round((this.WIDTH - 50) / 2) : 0) + Math.round((this.WIDTH - 750) / 2) - 1;
            this.chestsText[i].y = ((i + 1) % 2 ? Math.round(CONSTANTS.CHEST_HEIGHT * (i + 1) / 2) : Math.round(CONSTANTS.CHEST_HEIGHT * i / 2)) + Math.round((CONSTANTS.CHEST_HEIGHT - 1) / 2);
            this.chests[i].addChild(this.chestsText[this.chestsText.length - 1]);

            this.drawChestButton(i)
        }
    }

    drawChestButton(index: number) {
        this.chests[index].beginFill(CONSTANTS.CHEST_COLOR, 1)
        this.chests[index].drawRect(((index + 1) % 2 ? Math.round(this.WIDTH / 2) : 0), ((index + 1) % 2 ? Math.round(CONSTANTS.CHEST_HEIGHT * (index + 1) / 2) : Math.round(CONSTANTS.CHEST_HEIGHT * index / 2)), Math.round(this.WIDTH / 2) - 1, CONSTANTS.CHEST_HEIGHT - 1)
        this.chests[index].endFill()
    }
}