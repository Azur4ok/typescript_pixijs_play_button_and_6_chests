import { Application, Container } from 'pixi.js';
import { AbstractGameScene } from '../Scene/Scene';
import { SceneSettings, TransitionType } from './../constants/index';


export class Game {
    private app: Application
    private currentScene: SceneSettings
    private sceneSettings: SceneSettings[]
    private mainScene: SceneSettings
    private bonusScene: SceneSettings

    constructor(app: Application, scenes: SceneSettings[]) {
        this.app = app

        this.sceneSettings = scenes
        this.sceneSettings.forEach((sceneSettings: SceneSettings) => {
            sceneSettings.gameScene.init(this.app, this.sceneSwitcher)
        })

        this.mainScene = scenes[0]
        this.bonusScene = scenes[1]

        this.currentScene = this.mainScene

        this.setupScene(this.currentScene)
    }

    sceneSwitcher = (sceneName: string) => {
        this.currentScene.gameScene.setFinalizing(() => {
            const scene = this.sceneSettings.find((sceneSettings) => {
                return sceneSettings.name === sceneName;
            });

            if (scene) {
                this.setupScene(scene);
                this.currentScene = scene;
            } else {
                console.error("SCENE NOT FOUND: " + sceneName);
            }
        });
    }

    // createScene(sceneSettings: SceneSettings) {
    //     const gameScene: AbstractGameScene = sceneSettings.gameScene
    //     const sceneContainer = gameScene.getSceneContainer()
    //     gameScene.setup(sceneContainer)
    //     this.app.stage.addChild(sceneContainer)
    // }

    setupScene(sceneSettings: SceneSettings) {
        this.app.stage.removeChildren();
        const sceneContainer = new Container();
        this.app.stage.addChild(sceneContainer);

        const gameScene: AbstractGameScene = sceneSettings.gameScene;

        gameScene.setup(sceneContainer);

        sceneSettings.fadeInTransition.init(TransitionType.FADE_IN, sceneContainer);
        sceneSettings.fadeOutTransition.init(TransitionType.FADE_OUT, sceneContainer);

        gameScene.fadeInTransition = sceneSettings.fadeOutTransition;
        gameScene.fadeOutTransition = sceneSettings.fadeInTransition;
    }

    update(delta: number) {
        this.currentScene.gameScene.update(delta)
    }

}