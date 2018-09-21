export default class LevelText {

    private levelText : Phaser.GameObjects.Text
    private textStyle = {font: "20px Lucida Grande", fill: "#FFF"}
    private maxLevel : number

    constructor(scene : Phaser.Scene, currentLevel : number, maxLevel : number) {
        scene.add.text(15, 15, 'Level ', this.textStyle)
        this.levelText = scene.add.text(70, 15, '', this.textStyle)
        
        this.maxLevel = maxLevel

        this.updateLevel(currentLevel)
    }

    updateLevel(level : number) {
        this.levelText.setText(level + '/' + this.maxLevel)
    }
}