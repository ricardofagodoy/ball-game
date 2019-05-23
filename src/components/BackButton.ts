import Settings from '../settings'

export default class SaveButton extends Phaser.GameObjects.GameObject {

    private text : Phaser.GameObjects.Text

    constructor(scene : Phaser.Scene, size : any) {

        super(scene, 'BackButton')

        this.text = scene.add.text(size.width*0.04, size.height/45, '<--', Settings.style.back).setOrigin(0, 0)

        this.text.setInteractive().on('pointerdown', () => {
            this.emit('click')
        })

        document.addEventListener("backbutton", () => {
            this.emit('click')
        }, false);
    }
}