import Settings from '../settings'

export default class LevelText extends Phaser.GameObjects.GameObject {

    private levelText : Phaser.GameObjects.Text
    private maxLevel : number

    constructor(scene : Phaser.Scene, currentLevel : number, maxLevel : number, size : any) {
        
        super(scene, 'LevelText')

        this.levelText = scene.add.text(size.width / 2, size.height/20, '', Settings.style.level).setOrigin(0.5)
        this.maxLevel = maxLevel

        this.updateLevel(currentLevel)

        this.levelText.setInteractive().on('pointerdown', () => this.emit('click'))
    }

    updateLevel(level : number) {
        this.levelText.setText(level + '/' + this.maxLevel)
    }
}