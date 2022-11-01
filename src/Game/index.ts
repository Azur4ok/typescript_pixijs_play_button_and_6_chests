import { Application, Container } from 'pixi.js';
import { MainScene } from '../MainScene';


export class Game {
    private app: Application
    private mainScene: MainScene;
    private currentScene: MainScene;

    constructor(app: Application, scenes: any) {
        this.app = app
        this.mainScene = scenes

        this.currentScene = this.mainScene
        this.createScene(this.mainScene)
    }

    createScene(scene: MainScene) {
        const sceneContainer = this.mainScene.getSceneContainer()
        this.mainScene.setup()
        this.app.stage.addChild(sceneContainer)

    }


}