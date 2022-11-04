import { Application, Container, DisplayObject, Graphics, Sprite } from 'pixi.js'

import { SceneTransition, TransitionType } from '../constants'

export class SimpleFadeTransition implements SceneTransition {
  private app: Application
  private type: TransitionType
  private transitionSprite: Sprite = new Sprite()
  private updateStep: number

  constructor(app: Application, type: TransitionType, updateStep: number) {
    this.app = app
    this.updateStep = updateStep
    this.type = type

    this.initTransitionSprite()
  }

  init(type: TransitionType, sceneContainer: Container<DisplayObject>) {
    this.type = type
    this.createTransitionSprite(this.type)
    sceneContainer.addChild(this.transitionSprite)
  }

  private initTransitionSprite = () => {
    const graphics = new Graphics()
    graphics.beginFill(0x00000)
    graphics.drawRect(0, 0, this.app.renderer.width, this.app.renderer.height)
    graphics.endFill()

    this.transitionSprite = new Sprite(
      this.app.renderer.generateTexture(graphics, { resolution: 1, scaleMode: 1 }),
    )
  }

  private createTransitionSprite(type: TransitionType) {
    const alpha = type === TransitionType.FADE_OUT ? 1 : 0
    this.transitionSprite.alpha = alpha
  }

  update(delta: number, callback: () => void) {
    switch (this.type) {
      case TransitionType.FADE_OUT:
        if (this.transitionSprite.alpha > 0) {
          this.transitionSprite.alpha -= this.updateStep * delta
        } else {
          this.transitionSprite.alpha = 0
          callback()
        }
        break
      case TransitionType.FADE_IN:
        if (this.transitionSprite.alpha < 1) {
          this.transitionSprite.alpha += this.updateStep * delta
        } else {
          this.transitionSprite.alpha = 1
          callback()
        }
        break
    }
  }
}
