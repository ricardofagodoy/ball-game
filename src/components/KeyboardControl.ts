import Control from './Control'

export default class KeyboardControl implements Control {

    private readonly cursors : CursorKeys

    constructor(scene : Phaser.Scene) {
        this.cursors = scene.input.keyboard.createCursorKeys()
    }

    update() : number {

        let movement : number = 0

        if (this.cursors.left.isDown)
            movement = -1
        else if (this.cursors.right.isDown)
            movement = 1

        return movement
    }
}