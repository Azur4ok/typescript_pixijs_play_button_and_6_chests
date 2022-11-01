import { TextStyle } from "pixi.js";

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