const KEY = 'InstructionsScene'

import BackButton from '../components/BackButton'
import Control from '../components/Control'
import KeyboardControl from '../components/KeyboardControl'
import PointerControl from '../components/PointerControl'

class InstructionsScene extends Phaser.Scene {

    private message : string
    private textStyle = { font: "40px Lucida Grande", fill: "#FFF" }
    private control : Control
    private width : number
    private ball : Phaser.GameObjects.Image

    constructor() {
        super({key: KEY})
    }

    init() {

        // Touch controls if possible, else keyboards arrows
        if (this.sys.game.device.input.touch) {
            this.control = new PointerControl(this)
            this.message = 'Para mover a bolinha clique no lado direito ou esquerdo da tela'
        } else {
            this.control = new KeyboardControl(this)
            this.message = 'Para mover a bolinha use as setas de direita e esquerda do teclado'
        }
    }

    preload () {

        const width = this.width = +this.scene.manager.game.config.width
        const height = +this.scene.manager.game.config.height

        this.add.text(width/2, height/4, 
            this.message, 
            { wordWrap: {width: width/1.1}, align: 'center', ...this.textStyle }
        ).setOrigin(0.5)

        // Example ball
        this.add.graphics().fillStyle(0xffffff, 1)
            .fillCircle(width/2, height/1.8, 20)
            .generateTexture('ball-example')
            .destroy()

        this.ball = this.add.image(width/2, height/2, 'ball-example')

        // Back Button
        new BackButton(this, {width, height}).on('click', () => {
            this.scene.start('HomeScene')
        })
    }

    update() {

        let new_x = this.ball.x - this.control.update() * 5

        if (new_x < 40)
            new_x = 40
        else if (new_x > this.width - 40)
            new_x = this.width - 40

        this.ball.setX(new_x)
    }
}

export default InstructionsScene