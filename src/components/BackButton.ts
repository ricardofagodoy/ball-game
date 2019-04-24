export default class SaveButton extends Phaser.GameObjects.GameObject {

    private text : Phaser.GameObjects.Text
    private textStyle = {font: "40px Lucida Grande", fill: "#FFF"}

    constructor(scene : Phaser.Scene, gameWidth : number) {

        super(scene, 'BackButton')

        this.text = scene.add.text(80, 10, '<--', this.textStyle)
            .setOrigin(1, 0)
            .setFill('#58D68D')

        this.text.setInteractive().on('pointerdown', () => {
            this.emit('click')
        })
    }
}