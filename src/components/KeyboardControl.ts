import Control from './Control'

export default class KeyboardControl implements Control {

    private readonly scene : Phaser.Scene
    private cursors : CursorKeys

    constructor(scene : Phaser.Scene) {
        this.scene = scene
    }

    create() : void {

        this.scene.input.keyboard.removeKey('left')
        this.scene.input.keyboard.removeKey('right')

        this.cursors = this.scene.input.keyboard.addKeys({
            left: 'left',
            right: 'right'
        })
    }

    update() : number {

        let movement : number = 0

        if (this.cursors.left.isDown)
            movement = 1
        else if (this.cursors.right.isDown)
            movement = -1

        return movement
    }
}