import Map from '../sprites/Map'
import Ball from '../sprites/Ball'

const KEY = 'GameScene'

class GameScene extends Phaser.Scene {

    private width
    private height

    private map : Map
    private ball : Ball

    private textStyle = {font: "20px Lucida Grande", fill: "#FFF"}
    private levelText : Phaser.GameObjects.Text
    private level

    private saveText : Phaser.GameObjects.Text
    private saved = false

    private cursors : CursorKeys
    private pointerMove : number
    private groundSpeed = 5

    constructor() {
        super({key: KEY})
    }

    init() {
        this.level = +window.localStorage.getItem('level') || 1

        if (this.level == 1)
            this.scene.switch('InstructionsScene')
    }

    preload () {

        this.width = +this.scene.manager.game.config.width
        this.height = +this.scene.manager.game.config.height

        // Map and tiles
        this.load.image('tiles', 'assets/tiles.png');
        this.load.tilemapTiledJSON('map', 'assets/levels.json');

        // Main character
        this.load.spritesheet('ball', 'assets/ball.png',
        { frameWidth: 29, frameHeight: 29 })
    }
    
    create () {
        
        // Map and Ball
        this.map = new Map(this, this.level)
        this.ball = new Ball(this, this.width/2, this.height/this.map.getHeight())

        // Level Text
        this.add.text(15, 15, 'Level ', this.textStyle)
        this.levelText = this.add.text(70, 15, this.level + '/' + this.map.getNumberOfLayers(), this.textStyle)
                
        // Save Button
        this.saved = false
        this.saveText = this.add.text(this.width - 15, 15, 'Save', this.textStyle)
            .setOrigin(1, 0)
            .setFill('#58D68D')

        this.saveText.setInteractive().on('pointerdown', () => {

            if (!this.saved) {
                this.saved = true
                this.saveText.setFill('#F4D03F')
            } else {
                // SHOW AD
            }

            this.ball.savePosition()
            this.map.savePosition()
        })
                
        // Ball Collision
        this.matter.world.on("collisionstart", event => {
            event.pairs.forEach(pair => {

                const { bodyA, bodyB } = pair;
        
                const gameObjectA = bodyA.gameObject;
                const gameObjectB = bodyB.gameObject;

                if (gameObjectA == null || gameObjectB == null)
                    return
                
                if (gameObjectA instanceof Ball)
                    (<Ball>gameObjectA).collide(gameObjectB)
                else if (gameObjectB instanceof Ball)
                    (<Ball>gameObjectB).collide(gameObjectA)
            })
        })

        // Basic controls (arrows)
        this.cursors = this.input.keyboard.createCursorKeys();

        // Pointer movement
        this.input.on('pointerdown', (pointer : Phaser.Input.Pointer) => {
            
            if (pointer.y < 50)
                return

            if (pointer.x < this.width/2)
                this.pointerMove = this.groundSpeed
            else
                this.pointerMove = -this.groundSpeed
        })

        this.input.on('pointerup', (pointer : Phaser.Input.Pointer) => {
            this.pointerMove = 0
        })
    }

    update () {
    
        if (this.cursors.left.isDown)
            this.map.moveGroundX(-this.groundSpeed)
        else if (this.cursors.right.isDown)
            this.map.moveGroundX(this.groundSpeed)

        this.map.moveGroundX(this.pointerMove)
        this.ball.update()
    }

    killed() {
        this.map.respawn()
        this.ball.respawn()
    }

    nextLevel() {

        this.level++
        window.localStorage.setItem('level', this.level)
        
        this.levelText.setText(this.level + '/' + this.map.getNumberOfLayers())
        this.scene.restart()

        if (this.level > this.map.getNumberOfLayers() - 1) {
            this.scene.switch('GameOverScene')
        }
    }
}

export default GameScene;