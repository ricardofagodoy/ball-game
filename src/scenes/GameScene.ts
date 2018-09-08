import Map from '../sprites/Map'
import Ball from '../sprites/Ball'

class GameScene extends Phaser.Scene {

    private map : Map
    private ball : Ball
    private cursors : CursorKeys

    private levelText : Phaser.GameObjects.Text
    private textStyle = {font: "20px Arial", fill: "#000"}
    private level = 1
    private groundSpeed = 0.1

    constructor() {
        super({key: 'GameScene'});
    }

    preload () {

        // Map and tiles
        this.load.image('tiles', 'assets/tiles.png');
        this.load.tilemapTiledJSON('map', 'assets/level1.json');

        // Main character
        this.load.spritesheet('ball', 'assets/ball.png',
        { frameWidth: 60, frameHeight: 60 })
    }
    
    create () {
        
        // Screen (adjust)
        this.add.graphics().strokeRect(0, 0, 420, 700)
        this.add.text(10, 10, 'Level ', this.textStyle)
        this.levelText = this.add.text(65, 10, this.level.toString(), this.textStyle)
        
        this.map = new Map(this)
        this.ball = new Ball(this, 200, 50)

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

    nextLevel() {
        this.levelText.setText((++this.level).toString())
        this.ball.respawn()
    }
}

export default GameScene;