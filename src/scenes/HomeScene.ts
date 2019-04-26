const KEY = 'HomeScene'
let hasShownWinnerScreen = false

import Storage from '../components/Storage'
import LocalStorage from '../components/LocalStorage'

class HomeScene extends Phaser.Scene {

    private LEVEL_TIME = {
        1: 3.0,
        2: 7.0,
        3: 11.0,
        4: 11.0,
        5: 11.0,
        6: 11.0,
        7: 20.0
    }

    private MAX_LEVEL : number = Object.keys(this.LEVEL_TIME).length
    private textStyle = { font: "25px Lucida Grande", fill: "#FFF" }
    private level : number
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
        graphics.lineStyle(2, 0xffffff, 1);
    
        const globalYPadding = 50
        const padding = 20
        const levelsPerRow = 3
        const boxWidth = (width - padding*(levelsPerRow+1)) / levelsPerRow
    
        let levelsGotPro = 0

        // Draw grid
        for (let level = 1; level <= this.MAX_LEVEL; level++) {
    
            const x = (padding + boxWidth) *((level-1)%levelsPerRow) + padding
            const y = (padding + boxWidth) * (Math.trunc((level-1)/levelsPerRow)) + padding + globalYPadding
            
            graphics.strokeRect(x, y, boxWidth, boxWidth)

            // Fill on current level and already played
            graphics.fillStyle(0x58A910, 0.5);

            // Draw level numbers
            this.add.text(x + boxWidth/2, y + boxWidth/4, level.toString() , this.textStyle)
                .setOrigin(0.5)
                
            // Time record
            const best = this.storage.getTime(level)
            const levelTime = this.LEVEL_TIME[level]

            this.add.text(x + boxWidth/2, y + boxWidth/2, 'Best: ' + (best ? best + 's' : '--') , { font: "14px Lucida Grande", fill: "#FFF" })
                .setOrigin(0.5)

            this.add.text(x + boxWidth/2, y + boxWidth/1.4, 'Pro: ' + (levelTime ? levelTime + 's' : '--') , { font: "14px Lucida Grande", fill: "#FFF" })
                .setOrigin(0.5)

            if (level <= this.level) {

                if (level == this.level)
                    graphics.fillStyle(0x64ACF0, 0.5);

                // If user has Pro'ed a level
                if (best <= levelTime) {
                    graphics.fillStyle(0xDAD400, 0.5)
                    levelsGotPro++
                }

                graphics.fillRect(x, y, boxWidth, boxWidth)

                // You can also click them to play
                this.add.zone(x, y, boxWidth, boxWidth).setInteractive()
                    .on('pointerdown', () => {
                        this.scene.stop(KEY)
                        this.scene.start('GameScene', {level: level, maxLevel: this.MAX_LEVEL})
                     })
            }
        }

        // When player pro all levels, it's over :)
        if (levelsGotPro == this.MAX_LEVEL && !hasShownWinnerScreen) {
            hasShownWinnerScreen = true
            this.scene.start('WinnerScene')
        }
    }
}

export default HomeScene