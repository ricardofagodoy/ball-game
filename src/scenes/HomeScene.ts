import levels_json from '../../assets/levels.json' 
import Settings from '../settings'
import Storage from '../components/Storage'
import LocalStorage from '../components/LocalStorage'
import BackButton from '../components/BackButton'
import Difficulty from '../components/Difficulty'

const KEY = 'HomeScene'

class HomeScene extends Phaser.Scene {

    private MAX_LEVEL : number = levels_json.layers.length
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

    create () {

        const width = +this.scene.manager.game.config.width
        const height = +this.scene.manager.game.config.height

        // Back Button
        new BackButton(this, {width, height}).on('click', () => {
            
            if (navigator['app'])
                navigator['app'].exitApp()
            else
                window.close()
        })

        // Instructions button
        this.add.text(width/1.2, height/20, 'Controles', Settings.style.home)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.stop(KEY)
                this.scene.start('InstructionsScene')
            })

        // Choose Difficulty
        new Difficulty(this, {width, height}).on('click', () => {
            this.scene.stop(KEY)
            this.scene.start('DifficultyScene')
        })

        // Levels available (removing Pro timed)
        const levels = this.get_available_levels()

        // If player got pro at all levels, we have a winner!
        if (levels.length === 0)
            this.scene.start('WinnerScene')
        else
            this.draw_levels_grid(levels, width, height)
    }

    get_available_levels() {
        
        const levels = []
        const times = levels_json.layers.map((e) => e.properties.time).reverse()

        for (let level = 1; level <= this.MAX_LEVEL; level++) {

            const player_time = this.storage.getTime(level)
            const pro_time = times[level - 1]

            // Level is still available
            if (!player_time || player_time > pro_time)
                levels.push({level, player_time, pro_time})
        }

        return levels
    }

    draw_levels_grid(levels : Array<any>, width : number, height: number) {
        
        // Draw levels grid
        const graphics = this.add.graphics()

        // Levels table
        graphics.lineStyle(2, 0xffffff, 1);

        const globalYPadding = height/12
        const padding = 20
        const levelsPerRow = 3
        const boxWidth = (width - padding*(levelsPerRow+1)) / levelsPerRow

        let levels_shown = 0

        // Draw grid
        for (let level_obj of levels) {

            // Only show 12 levels
            if (levels_shown >= 12)
                break

            const level = level_obj.level
            const x = (padding + boxWidth) *((levels_shown)%levelsPerRow) + padding
            const y = (padding + boxWidth) * (Math.trunc((levels_shown)/levelsPerRow)) + padding + globalYPadding
            
            graphics.strokeRect(x, y, boxWidth, boxWidth)
            levels_shown++;

            // Draw level numbers
            this.add.text(x + boxWidth/2, y + boxWidth/4, level.toString() , Settings.style.levelGrid).setOrigin(0.5)
                
            // Time record
            const best = level_obj.player_time
            const levelTime = level_obj.pro_time

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

                graphics.fillRect(x, y, boxWidth, boxWidth)

                // You can also click them to play
                this.add.zone(x, y, boxWidth, boxWidth).setInteractive()
                    .on('pointerdown', () => {
                        this.scene.stop(KEY)
                        this.scene.start('GameScene', {level: level, maxLevel: this.MAX_LEVEL})
                    })
            }
        }
    }
}

export default HomeScene