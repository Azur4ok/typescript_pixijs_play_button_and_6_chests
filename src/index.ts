import { Application } from 'pixi.js'

import { Game } from './Game'
import { TransitionType } from './constants'
import { MainScene } from './Scene/MainScene'
import { BonusScene } from './Scene/BonuScene'
import { SimpleFadeTransition } from './Transition'

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: window.devicePixelRatio || 1,
  backgroundColor: 0x100ab,
  antialias: true,
})

app.stage.interactive = true

document.body.appendChild(app.view)

function setup(): void {
  const mainScene = new MainScene(app)
  const bonusScene = new BonusScene(app)

  const game = new Game(app, [
    {
      index: 0,
      name: 'mainScene',
      gameScene: mainScene,
      fadeInTransition: new SimpleFadeTransition(app, TransitionType.FADE_IN, 0.1),
      fadeOutTransition: new SimpleFadeTransition(app, TransitionType.FADE_OUT, 0.1),
    },
    {
      index: 1,
      name: 'bonusScene',
      gameScene: bonusScene,
      fadeInTransition: new SimpleFadeTransition(app, TransitionType.FADE_IN, 0.1),
      fadeOutTransition: new SimpleFadeTransition(app, TransitionType.FADE_OUT, 0.1),
    },
  ])

  app.ticker.add((delta) => {
    game.update(delta)
  })
}

window.onload = setup
