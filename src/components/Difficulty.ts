import Settings from '../settings'

export default class Difficulty extends Phaser.GameObjects.GameObject {

    private text : Phaser.GameObjects.Text

    constructor(scene : Phaser.Scene, size : any) {

        super(scene, 'Difficulty')

        this.text = scene.add.text(size.width/2.1, size.height/20, 'Dificuldade', Settings.style.home)
        .setOrigin(0.5)

        this.text.setInteractive().on('pointerdown', () => {
            this.emit('click')
        })
    }
}