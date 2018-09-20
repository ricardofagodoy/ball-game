const KEY = 'InstructionsScene'

class InstructionsScene extends Phaser.Scene {

    private textStyle = { font: "40px Lucida Grande", fill: "#FFF" }

    constructor() {
        super({key: KEY})
    }

    preload () {

        const width = +this.scene.manager.game.config.width
        const height = +this.scene.manager.game.config.height

        const graphics = this.add.graphics()

        graphics.lineStyle(8, 0xffffff, 1);
        graphics.strokeRect(0, 0, width, height)

        this.add.text(width/2, height/2, 'Instruções!', this.textStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.stop(KEY)
                this.scene.wake('GameScene')
            })
    }
}

export default InstructionsScene