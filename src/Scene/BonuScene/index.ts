
import { Container, DisplayObject, Application } from 'pixi.js';
import { AbstractGameScene } from '../Scene';

export class BonusScene extends AbstractGameScene {

    constructor(app: Application) {
        super(app)
    }


    sceneUpdate(delta: number): void {
        throw new Error('Method not implemented.');
    }
    setup(sceneContainer: Container<DisplayObject>): void {
        throw new Error('Method not implemented.');
    }
    preTransitionUpdate(delta: number): void {
        throw new Error('Method not implemented.');
    }

}