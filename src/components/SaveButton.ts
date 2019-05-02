import Settings from '../settings'

export default class SaveButton extends Phaser.GameObjects.GameObject {

    private saved : boolean
    private saveText : Phaser.GameObjects.Text

    constructor(scene : Phaser.Scene, gameWidth : number) {

        super(scene, 'SaveButton')

        this.saved = false
        this.saveText = scene.add.text(gameWidth - 15, 15, 'Save', Settings.style.save).setOrigin(1, 0)

        this.saveText.setInteractive().on('pointerdown', () => {

            if (!this.saved) {
                this.saved = true
                this.saveText.setFill('#F4D03F')
            } else {
                // SHOW AD
            }

            this.emit('saved')
        })
    }
}