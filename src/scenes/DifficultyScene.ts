const KEY = 'DifficultyScene'

import Settings from '../settings'
import BackButton from '../components/BackButton'
import Storage from '../components/Storage'
import LocalStorage from '../components/LocalStorage'

class DifficultyScene extends Phaser.Scene {

    private storage : Storage
    private buttons : Array<Phaser.GameObjects.Text>

    constructor() {
        super({key: KEY})
    }

    init() {
        this.storage = new LocalStorage()
        this.buttons = []
    }

    create () {

        const width = +this.scene.manager.game.config.width
        const height = +this.scene.manager.game.config.height


        this.buttons.push(
            this.add.text(width/2, height*(2/8), "Fácil", Settings.style.difficulty).setOrigin(0.5)
            .setData('value', 0.3)
        )

        this.buttons.push(
            this.add.text(width/2, height*(4/8), "Médio", Settings.style.difficulty).setOrigin(0.5)
            .setData('value', 0.6)
        )

        this.buttons.push(
            this.add.text(width/2, height*(6/8), "Difícil", Settings.style.difficulty).setOrigin(0.5)
            .setData('value', 1)
        )

        // Back Button
        new BackButton(this, {width, height}).on('click', () => {
            this.scene.start('HomeScene')
        })

        // Already selected difficulty
        const difficulty = this.storage.getDifficulty()

        // Attach click events
        this.buttons.forEach(e => {

            // Simulate a click on already selected
            if (e.getData('value') == difficulty)
                this.handleClick(e)

            e.setInteractive()
            .on('pointerdown', () => this.handleClick(e))
        })
    }

    handleClick(e) {

        // Fill other options back again
        this.buttons.forEach(b => { 
            if (b === e)
                return
            
            b.setFill(Settings.style.difficulty.fill)
        })

        // Set this option as chosen
        e.setFill('#DAD400')
        this.storage.setDifficulty(e.getData('value'))
    }
}

export default DifficultyScene