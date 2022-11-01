import { Application, Container, Graphics, Text } from 'pixi.js'
import { Game } from './Game'
import { CONSTANTS } from './constants'

import { MainScene } from './MainScene'

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
    const game = new Game(app, mainScene)

    // app.ticker.add((delta) => {
    //     mainScene.setup()
    // })
}

window.onload = setup

