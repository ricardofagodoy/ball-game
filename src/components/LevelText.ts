export default class LevelText {

    private levelText : Phaser.GameObjects.Text
    private textStyle = {font: "25px Lucida Grande", fill: "#FFF"}
    private maxLevel : number

    constructor(scene : Phaser.Scene, currentLevel : number, maxLevel : number) {
        
        scene.add.text(15, 15, 'Level ', this.textStyle)
        
        this.levelText = scene.add.text(80, 15, '', this.textStyle)
        this.maxLevel = maxLevel

        this.updateLevel(currentLevel)

        // REMOVE ME!!!
        this.levelText.setInteractive().on('pointerdown', () => {
            window.localStorage.setItem('level', '1')
            scene.scene.restart()
        })
    }

    updateLevel(level : number) {
        this.levelText.setText(level + '/' + this.maxLevel)
    }
}