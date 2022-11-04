import { Application, Container, DisplayObject, Graphics, Text } from 'pixi.js'

import { BUTTON_STATE, ChestButton, CONSTANTS, SceneState } from '../../constants/index'
import { RandomChestController } from '../../RandomChestController'
import { AbstractGameScene } from '../Scene'

export class MainScene extends AbstractGameScene {
  private chests: ChestButton[] = []
  private playButton: Graphics = new Graphics()
  private playText: Text = new Text('')
  private currentChest: Text = new Text('')
  private WIDTH: number
  private HEIGHT: number
  private _pressedButtons: number = 0

  private set pressedButtons(value: number) {
    this._pressedButtons = value
  }

  private get pressedButtons() {
    this.pressedButtons = this.chests.filter((chest) => chest.isPressed).length

    return this._pressedButtons
  }

  getSceneContainer(): Container<DisplayObject> {
    return this.sceneContainer
  }

  constructor(app: Application) {
    super(app)

    this.WIDTH = app.screen.width
    this.HEIGHT = app.screen.height

    this.setupPlayButton()
    this.bindAllListeners()
  }

  setup(sceneContainer: Container<DisplayObject>): void {
    this.sceneState = SceneState.LOAD
    this.sceneContainer = sceneContainer
    this.sceneContainer.addChild(this.playButton)
    for (let i = 0; i < CONSTANTS.NUMBER_CHESTS; i++) {
      this.sceneContainer.addChild(this.chests[i].graphic)
    }
    this.reset()
  }

  setupPlayButton(): void {
    this.playButton = new Graphics()
    this.playButton.buttonMode = true
    this.playText = new Text('PLAY', CONSTANTS.BUTTON_PLAY_ENABLE_STYLE)
    this.playText.x = (this.WIDTH - 100) / 2
    this.playText.y = this.HEIGHT - (this.playButton.height + this.playText.height * 2)
    this.playText.buttonMode = true
    this.playButton.addChild(this.playText)
    this.setPlayButtonState(BUTTON_STATE.ENABLE)
    this.drawChestsButtons()
  }

  drawPlayButton(): void {
    this.playButton.beginFill(0xcccc, 1)
    this.playButton.drawRect(
      0,
      this.HEIGHT - CONSTANTS.CHEST_HEIGHT,
      this.WIDTH,
      CONSTANTS.CHEST_HEIGHT,
    )
    this.playButton.endFill()
  }

  setPlayButtonState(state: BUTTON_STATE): void {
    switch (state) {
      case BUTTON_STATE.ENABLE:
        this.drawPlayButton()
        this.playText.style = CONSTANTS.BUTTON_PLAY_ENABLE_STYLE
        this.playButton.interactive = true
        break
      case BUTTON_STATE.DISABLE:
        this.drawPlayButton()
        this.playText.style = CONSTANTS.BUTTON_PLAY_DISABLE_STYLE
        this.playButton.interactive = false
        break
    }
  }

  drawChestsButtons(): void {
    for (let i = 0; i < CONSTANTS.NUMBER_CHESTS; i++) {
      const graphic = new Graphics()
      const x = (i + 1) % 2 ? Math.round((this.WIDTH - 1) / 2) : 0
      const y =
        (i + 1) % 2
          ? Math.round((CONSTANTS.CHEST_HEIGHT * (i + 1)) / 2)
          : Math.round((CONSTANTS.CHEST_HEIGHT * i) / 2)
      const width = Math.round(this.WIDTH / 2) - 1
      const height = CONSTANTS.CHEST_HEIGHT - 1
      const text = new Text('Chest', CONSTANTS.BUTTON_PLAY_DISABLE_STYLE)
      text.anchor.set(0.5)
      text.x = x + Math.round((this.WIDTH - 750) / 2) - 1
      text.y = y + Math.round(height / 2)
      graphic.addChild(text)

      const chestObject: ChestButton = {
        index: i,
        graphic,
        text,
        x,
        y,
        width,
        height,
        isPressed: false,
      }
      this.chests.push(chestObject)
      this.chests[i].graphic.buttonMode = true

      this.drawChestButton(i)
    }
  }

  drawChestButton(index: number): void {
    this.chests[index].graphic.beginFill(CONSTANTS.CHEST_COLOR, 1)
    this.chests[index].graphic.drawRect(
      this.chests[index].x,
      this.chests[index].y,
      this.chests[index].width,
      this.chests[index].height,
    )
    this.chests[index].graphic.endFill()
  }

  bindAllListeners(): void {
    this.bindChestsListener()
    this.playButton.addListener('pointerdown', () => {
      this.setPlayButtonState(BUTTON_STATE.DISABLE)
      for (let i = 0; i < CONSTANTS.NUMBER_CHESTS; i++) {
        this.chests[i].isPressed = false
        this.chests[i].graphic.interactive = true
        this.chests[i].text.style = CONSTANTS.BUTTON_PLAY_ENABLE_STYLE
      }
    })
  }

  bindChestsListener(): void {
    for (let i = 0; i < CONSTANTS.NUMBER_CHESTS; i++) {
      this.chests[i].graphic.addListener('pointerdown', () => {
        this.chests[i].isPressed = true
        this.checkWin(i)
      })

      this.chests[i].graphic.addListener('pointerout', () => {
        this.chests[i].text.interactive = true
      })
    }
  }

  checkWin(index: number) {
    const result = RandomChestController.play()

    this.chests[index].text.text = String(result.totalWin)

    this.currentChest = this.chests[index].text
    this.chests[index].graphic.interactive = false

    if (result.bonusWin) {
      this.chests[index].text.text = `${this.chests[index].text.text} + Bonus win ${String(
        result.bonusWin,
      )}`
    }
  }

  sceneUpdate(delta: number): void {
    if (this.currentChest.text === '' && this.pressedButtons < CONSTANTS.NUMBER_CHESTS) return

    this.currentChest.rotation += 0.1 * delta

    if (this.currentChest.text !== '0') this.currentChest.scale.set(this.currentChest.rotation / 4)

    if (this.currentChest.rotation > Math.PI * 2) {
      this.currentChest.rotation = 0
      this.currentChest.scale.set(1)

      this.currentChest = new Text('')

      if (RandomChestController.getCurrentData().bonusWin > 0) this.sceneSwitcher('bonusScene')

      if (this.pressedButtons >= this.chests.length) this.reset()
      else this.updateData()
    }
  }

  reset() {
    this.setPlayButtonState(BUTTON_STATE.ENABLE)

    for (let i = 0; i < CONSTANTS.NUMBER_CHESTS; i++) {
      this.chests[i].isPressed = false
      this.chests[i].text.style = CONSTANTS.BUTTON_PLAY_DISABLE_STYLE
      this.chests[i].graphic.interactive = false
      this.chests[i].text.text = 'Chest'
    }
  }

  updateData() {
    for (let i = 0; i < CONSTANTS.NUMBER_CHESTS; i++) {
      if (this.chests[i].isPressed) {
        this.chests[i].text.style = CONSTANTS.BUTTON_PLAY_DISABLE_STYLE
      }

      this.currentChest = new Text('')
      if (this.pressedButtons >= CONSTANTS.NUMBER_CHESTS) {
        this.reset()
      }
    }
  }

  preTransitionUpdate(delta: number): void {}
}
