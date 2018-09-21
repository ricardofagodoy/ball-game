export default class SaveButton extends Phaser.GameObjects.GameObject {

    private saved : boolean
    private saveText : Phaser.GameObjects.Text
    private textStyle = {font: "20px Lucida Grande", fill: "#FFF"}

    constructor(scene : Phaser.Scene, gameWidth : number) {

        super(scene, 'SaveButton')

        this.saved = false
        this.saveText = scene.add.text(gameWidth - 15, 15, 'Save', this.textStyle)
            .setOrigin(1, 0)
            .setFill('#58D68D')

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