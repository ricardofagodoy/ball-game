import Settings from '../settings'
import Storage from '../components/Storage'
import LocalStorage from '../components/LocalStorage'

const KEY = 'HomeScene'
let hasShownWinnerScreen = false

class HomeScene extends Phaser.Scene {

    private MAX_LEVEL : number = Object.keys(Settings.times).length
    private currentLevel : number
    private storage : Storage

    constructor() {
        super({key: KEY})
    }

    init() {

        this.storage = new LocalStorage()

        // Retrieve current level
        this.currentLevel = this.storage.getLevel()

        // First time lauching
        if (!this.currentLevel) {
            this.currentLevel = 1
            this.storage.setLevel(this.currentLevel)
        }
    }

    preload () {

        const width = +this.scene.manager.game.config.width

        // Instructions button
        this.add.text(width - 85, 30, 'Instructions', Settings.style.home)
            .setOrigin(0.5)
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

            // Draw level numbers
            this.add.text(x + boxWidth/2, y + boxWidth/4, level.toString() , Settings.style.levelGrid).setOrigin(0.5)
                
            // Time record
            const best = this.storage.getTime(level)
            const levelTime = Settings.times[level]

            this.add.text(x + boxWidth/2, y + boxWidth/2, Settings.best + ': ' + (best ? best + 's' : '--') , Settings.style.levelGrid)
                .setOrigin(0.5)

            this.add.text(x + boxWidth/2, y + boxWidth/1.4, Settings.pro + ': ' + (levelTime ? levelTime + 's' : '--') , Settings.style.levelGrid)
                .setOrigin(0.5)

            // Has already passed level
            if (level <= this.currentLevel) {

                // Fill on current level and already played
                graphics.fillStyle(Settings.levelColorPassed, 0.5);

                if (level == this.currentLevel)
                    graphics.fillStyle(Settings.levelColorActual, 0.5);

                // If user has Pro'ed a level
                if (best <= levelTime) {
                    graphics.fillStyle(Settings.levelColorPro, 0.5)
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