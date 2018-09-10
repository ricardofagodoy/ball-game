import Map from '../sprites/Map'
import Ball from '../sprites/Ball'

class GameScene extends Phaser.Scene {

    private map : Map
    private ball : Ball
    private cursors : CursorKeys

    private levelText : Phaser.GameObjects.Text
    private textStyle = {font: "20px Arial", fill: "#FFF"}
    private level = 1
    private groundSpeed = 5

    constructor() {
        super({key: 'GameScene'});
    }

    preload () {

        // Map and tiles
        this.load.image('tiles', 'assets/tiles2.png');
        this.load.tilemapTiledJSON('map', 'assets/level2.json');

        // Main character
        this.load.spritesheet('ball', 'assets/ball.png',
        { frameWidth: 29, frameHeight: 29 })
    }
    
    create () {
        
        // Text (adjust)
        this.add.text(10, 10, 'Level ', this.textStyle)
        this.levelText = this.add.text(65, 10, this.level.toString(), this.textStyle)
        
        this.map = new Map(this)
        this.ball = new Ball(this, 450/2, 50)

        // Basic controls
        this.cursors = this.input.keyboard.createCursorKeys();

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
    }

    update () {
    
        if (this.cursors.left.isDown) {
            this.map.moveGroundX(-this.groundSpeed)
        } else if (this.cursors.right.isDown) {
            this.map.moveGroundX(this.groundSpeed)
        } 

        this.ball.update()
    }

    killed() {
        this.map.respawn()
        this.ball.respawn()
    }

    nextLevel() {
        this.levelText.setText((++this.level).toString())
        this.ball.respawn()
        this.scene.restart()
    }
}

export default GameScene;