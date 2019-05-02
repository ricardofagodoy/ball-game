import Settings from '../settings'

export default class LevelText extends Phaser.GameObjects.GameObject {

    private levelText : Phaser.GameObjects.Text
    private maxLevel : number

    constructor(scene : Phaser.Scene, currentLevel : number, maxLevel : number, screenWidth : number) {
        
        super(scene, 'LevelText')

        this.levelText = scene.add.text(screenWidth / 2, 30, '', Settings.style.level).setOrigin(0.5)
        this.maxLevel = maxLevel

        this.updateLevel(currentLevel)

        this.levelText.setInteractive().on('pointerdown', () => this.emit('click'))
    }

    updateLevel(level : number) {
        this.levelText.setText(level + '/' + this.maxLevel)
    }
}