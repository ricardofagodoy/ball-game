const KEY = 'WinnerScene'

import BackButton from '../components/BackButton'

class InstructionsScene extends Phaser.Scene {

    private textStyle = { font: "40px Lucida Grande", fill: "#FFF" }

    constructor() {
        super({key: KEY})
    }

    preload () {

        const width = +this.scene.manager.game.config.width
        const height = +this.scene.manager.game.config.height

        this.add.text(width/2, height/2, 'Winner!!', this.textStyle)
            .setOrigin(0.5)

        // Back Button
        new BackButton(this, width).on('click', () => {
            this.scene.start('HomeScene')
        })
    }
}

export default InstructionsScene