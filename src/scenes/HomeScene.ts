const KEY = 'HomeScene'

import Storage from '../components/Storage'
import LocalStorage from '../components/LocalStorage'

class HomeScene extends Phaser.Scene {

    private textStyle = { font: "25px Lucida Grande", fill: "#FFF" }

    private level : number
    private MAX_LEVEL : number = 7
    private storage : Storage

    constructor() {
        super({key: KEY})
    }

    init() {

        this.storage = new LocalStorage()

        // Retrieve current level
        this.level = this.storage.getLevel()

        // First time lauching
        if (!this.level) {
            this.level = 1
            this.storage.setLevel(this.level)
        }
    }

    preload () {

        const width = +this.scene.manager.game.config.width
        const height = +this.scene.manager.game.config.height

        // Instructions button
        this.add.text(width - 85, 30, 'Instructions', this.textStyle)
            .setOrigin(0.5)
            .setFill('#58D68D')
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.stop(KEY)
                this.scene.start('InstructionsScene')
            })

        const graphics = this.add.graphics()

        // Levels table
        graphics.lineStyle(4, 0xffffff, 1);
    
        const globalYPadding = 50
        const padding = 20
        const levelsPerRow = 3
        const boxWidth = (width - padding*(levelsPerRow+1)) / levelsPerRow
    
        // Draw grid
        for (let level = 1; level <= this.MAX_LEVEL; level++) {
    
            const x = (padding + boxWidth) *((level-1)%levelsPerRow) + padding
            const y = (padding + boxWidth) * (Math.trunc((level-1)/levelsPerRow)) + padding + globalYPadding
            graphics.strokeRect(x, y, boxWidth, boxWidth)

            // Fill on current level and already played
            graphics.fillStyle(0x58A910, 0.5);

            if (level <= this.level) {

                if (level == this.level)
                    graphics.fillStyle(0x64ACF0, 0.5);

                graphics.fillRect(x, y, boxWidth, boxWidth)
            }

            // Draw level numbers and handle clicks
            const levelText = this.add.text(x + boxWidth/2, y + boxWidth/4, level.toString() , this.textStyle)
            .setOrigin(0.5)
            
            levelText.setInteractive()
                .on('pointerdown', () => {
                    this.scene.stop(KEY)
                    this.scene.start('GameScene', {level: level, maxLevel: this.MAX_LEVEL})
                })
        }
    }
}

export default HomeScene