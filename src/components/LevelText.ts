export default class LevelText {

    private levelText : Phaser.GameObjects.Text
    private textStyle = {font: "25px Lucida Grande", fill: "#FFF"}
    private maxLevel : number

    constructor(scene : Phaser.Scene, currentLevel : number, maxLevel : number, screenWidth : number) {
        
        this.levelText = scene.add.text(screenWidth / 2, 30, '', this.textStyle)
        this.levelText.setOrigin(0.5)

        this.maxLevel = maxLevel

        this.updateLevel(currentLevel)
    }

    updateLevel(level : number) {
        this.levelText.setText(level + '/' + this.maxLevel)
    }
}