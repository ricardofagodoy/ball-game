import Map from '../sprites/Map'
import Ball from '../sprites/Ball'
import Adventurer from '../sprites/Ball'

class GameScene extends Phaser.Scene {

    private ground : Phaser.Tilemaps.DynamicTilemapLayer
    private player : Adventurer
    private cursors

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
    
        this.ground = new Map(this).createGround()
        this.add.graphics().strokeRect(0, 0, 400, 700)

        this.player = new Ball(this, 200, 50)

        // Basic controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Collision
        this.matter.world.on("collisionstart", event => {
            event.pairs.forEach(pair => {

                const { bodyA, bodyB } = pair;
        
                const gameObjectA = bodyA.gameObject;
                const gameObjectB = bodyB.gameObject;

                if (gameObjectA == null || gameObjectB == null)
                    return
                
                if (gameObjectA instanceof Phaser.Physics.Matter.TileBody)
                    this.collide(gameObjectB, gameObjectA)
                else
                    this.collide(gameObjectA, gameObjectB)
            })
        })
    }

    update () {
    
        if (this.cursors.left.isDown) {
            this.player.moveLeft()
        } else if (this.cursors.right.isDown) {
            this.player.moveRight()
        } 
            
        this.player.update()
    }

    collide(ball : Ball, tile : Phaser.Physics.Matter.TileBody) {
        if (tile.tile.index == 1) // spike
            ball.respawn()
    }
}

export default GameScene;