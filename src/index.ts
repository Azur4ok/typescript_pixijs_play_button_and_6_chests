import { Application, Container, Graphics, Text } from 'pixi.js'
import { Game } from './Game'
import { CONSTANTS, TransitionType } from './constants'

import { MainScene } from './Scene/MainScene'
import { SimpleFadeTransition } from './Transition'
import { BonusScene } from './Scene/BonuScene/index';

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio || 1,
    backgroundColor: 0x100ab,
    antialias: true
})

app.stage.interactive = true
const playButton = new Graphics()

const container = new Container()

document.body.appendChild(app.view)

function setup(): void {
    const mainScene = new MainScene(app)
    const game = new Game(app, [
        {
            index: 0,
            name: "mainScene",
            gameScene: new MainScene(app),
            fadeInTransition: new SimpleFadeTransition(app, TransitionType.FADE_IN, 0.1),
            fadeOutTransition: new SimpleFadeTransition(app, TransitionType.FADE_OUT, .1)
        },
        {
            index: 1,
            name: "bonusScene",
            gameScene: new BonusScene(app),
            fadeInTransition: new SimpleFadeTransition(app, TransitionType.FADE_IN, 0.1),
            fadeOutTransition: new SimpleFadeTransition(app, TransitionType.FADE_OUT, .1)
        }]);

    app.ticker.add((delta) => {
        game.update(delta)
    })
}

window.onload = setup

