import Map from '../sprites/Map'
import Ball from '../sprites/Ball'

const KEY = 'GameScene'

class GameScene extends Phaser.Scene {

    private width
    private height

    private map : Map
    private ball : Ball

    private levelText : Phaser.GameObjects.Text
    private textStyle = {font: "20px Lucida Grande", fill: "#FFF"}
    private level = 1

    private cursors : CursorKeys
    private groundSpeed = 5

    constructor() {
        super({key: KEY})
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
        
        // Text
        this.add.text(10, 10, 'Level ', this.textStyle)
        this.levelText = this.add.text(65, 10, this.level.toString(), this.textStyle)
        
        // Map and Ball
        this.map = new Map(this, this.level)
        this.ball = new Ball(this, this.width/2, this.height/this.map.getHeight())

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
        //this.input.on('pointerdown', () => this.isDown = true)
        //this.input.on('pointerup', () => this.isDown = false)

        /*this.input.on('pointermove', (pointer : Phaser.Input.Pointer) => {

            if (pointer.x < this.lastX)
                this.map.moveGroundX(-this.groundSpeed)
            else
                this.map.moveGroundX(this.groundSpeed)

            this.lastX = pointer.x
        });*/
    }

    update () {
    
        if (this.cursors.left.isDown)
            this.map.moveGroundX(-this.groundSpeed)
        else if (this.cursors.right.isDown)
            this.map.moveGroundX(this.groundSpeed)

        this.ball.update()
    }

    killed() {
        this.map.respawn()
        this.ball.respawn()
    }

    nextLevel() {

        this.level++

        if (this.level > this.map.getNumberOfLayers())
            return // TODO: YOU WIN

        this.levelText.setText((this.level).toString())
        this.scene.restart()
    }
}

export default GameScene;