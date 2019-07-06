const KEY = 'WinnerScene'

import BackButton from '../components/BackButton'

class WinnerScene extends Phaser.Scene {

    private textStyle = { font: "40px Lucida Grande", fill: "#FF0" }

    constructor() {
        super({key: KEY})
    }

    preload () {

        const width = +this.scene.manager.game.config.width
        const height = +this.scene.manager.game.config.height

        this.add.text(width/2, height/3, 'You are the champion!!', this.textStyle).setOrigin(0.5)
        this.add.text(width/2, height/2, 'Thanks for playing :-)', { font: "25px Lucida Grande", fill: "#FFF" }).setOrigin(0.5)

        // Back Button
        new BackButton(this, {width, height}).on('click', () => {
            this.scene.start('HomeScene')
        })
    }
}

export default WinnerScene