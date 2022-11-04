import { Container, Graphics, TextStyle, Text } from "pixi.js";

import { AbstractGameScene } from "../Scene/Scene";


export enum BUTTON_STATE {
    ENABLE,
    DISABLE,
}
export interface ChestButton {
    index: number,
    graphic: Graphics,
    text: Text,
    x: number,
    y: number,
    width: number,
    height: number,
    isPressed: boolean
}

const BUTTON_PLAY_DISABLE_STYLE = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: ['#aaad', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
})

const BUTTON_PLAY_ENABLE_STYLE = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
})

export const CONSTANTS = {
    NUMBER_CHESTS: 6,
    CHEST_HEIGHT: 150,
    CHEST_COLOR: 0x999fdf,
    BUTTON_PLAY_ENABLE_STYLE,
    BUTTON_PLAY_DISABLE_STYLE,
}

export interface SceneTransition {
    init(type: TransitionType, sceneContainer: Container): void
    update(delta: number, callback: () => void): void
}

export enum TransitionType {
    FADE_OUT = 'hide_mask',
    FADE_IN = 'show_mask'
}

export interface GameScene {
    sceneUpdate(delta: number): void
}

export enum SceneState {
    LOAD,
    PROCESS,
    FINALIZE,
    DONE
}

export interface SceneSettings {
    index: number;
    name: string,
    gameScene: AbstractGameScene;
    fadeInTransition: SceneTransition;
    fadeOutTransition: SceneTransition;
}

export interface ResultData {
    chestWin: number
    bonusWin: number
    totalWin: number
}
