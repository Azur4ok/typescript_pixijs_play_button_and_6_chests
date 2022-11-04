import { GameScene, SceneState, SceneTransition, TransitionType } from '../constants'
import { Application, Container } from 'pixi.js'
import { SimpleFadeTransition } from '../Transition'

export abstract class AbstractGameScene implements GameScene {
  protected sceneState: SceneState
  protected app: Application
  protected sceneContainer: Container
  protected fadeInSceneTransition: SceneTransition
  protected fadeOutSceneTransition: SceneTransition
  protected sceneSwitcher: (sceneName: string) => void
  private onDone: () => void

  constructor(app: Application) {
    this.sceneState = SceneState.LOAD
    this.app = app
    this.sceneContainer = new Container()
    this.sceneSwitcher = (sceneName: string) => {}
    this.onDone = () => {}

    this.fadeInSceneTransition = new SimpleFadeTransition(app, TransitionType.FADE_IN, 0.1)
    this.fadeOutSceneTransition = new SimpleFadeTransition(app, TransitionType.FADE_OUT, 0.1)
  }

  set fadeInTransition(fadeInSceneTransition: SceneTransition) {
    this.fadeInSceneTransition = fadeInSceneTransition
  }

  set fadeOutTransition(fadeOutSceneTransition: SceneTransition) {
    this.fadeOutSceneTransition = fadeOutSceneTransition
  }

  init(app: Application, sceneSwitcher: (sceneName: string) => void): void {
    this.app = app
    this.sceneSwitcher = sceneSwitcher
  }

  getSceneContainer() {
    return this.sceneContainer
  }

  abstract updateData(): void 

  abstract setup(sceneContainer: Container): void

  abstract preTransitionUpdate(delta: number): void

  abstract sceneUpdate(delta: number): void

  update(delta: number): void {
    switch (this.sceneState) {
      case SceneState.LOAD:
        this.fadeInSceneTransition.update(delta, () => {
          this.sceneState = SceneState.PROCESS
        })
        this.preTransitionUpdate(delta)
        break
      case SceneState.PROCESS:
        this.sceneUpdate(delta)
        break
      case SceneState.FINALIZE:
        this.fadeOutSceneTransition.update(delta, () => {
          this.sceneState = SceneState.LOAD
          if (this.onDone) {
            this.onDone()
          }
        })
        break
    }
  }

  setFinalizing(onDone: () => void) {
    this.onDone = onDone
    this.sceneState = SceneState.FINALIZE
  }
}
