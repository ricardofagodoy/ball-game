import Control from './Control'

export default class PointerControl implements Control {

    private scene : Phaser.Scene
    private width : number
    private movement : number

    constructor(scene : Phaser.Scene) {

        this.scene = scene
        this.movement = 0
        this.width = +scene.scene.manager.game.config.width

        if (!scene.input.activePointer)
            scene.input.addPointer(1);

        scene.input.on('pointerdown', this.handlePointerDown.bind(this))
        scene.input.on('pointerup', this.handlePointerUp.bind(this))
    }

    update() : number {
        return this.movement
    }

    private handlePointerDown(pointer : Phaser.Input.Pointer) {
            
        // Text above level does not move ball (ugly)
        if (pointer.y < 50)
            return

        this.movement = (pointer.x < this.width / 2) ? 1 : -1
    }

    private handlePointerUp(pointer : Phaser.Input.Pointer) {
        if (!this.scene.input.pointer1.isDown && !this.scene.input.pointer2.isDown)
            this.movement = 0
    }
}