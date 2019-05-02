import Settings from '../settings'

export default class SaveButton extends Phaser.GameObjects.GameObject {

    private text : Phaser.GameObjects.Text

    constructor(scene : Phaser.Scene, gameWidth : number) {

        super(scene, 'BackButton')

        this.text = scene.add.text(80, 10, '<--', Settings.style.back).setOrigin(1, 0)

        this.text.setInteractive().on('pointerdown', () => {
            this.emit('click')
        })
    }
}