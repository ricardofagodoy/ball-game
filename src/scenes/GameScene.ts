import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin"

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

    plugins() {
        return [{
            plugin: PhaserMatterCollisionPlugin, // The plugin class
            key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
            mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
        }]
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

        this.player = new Ball(this, 200, 20)

        // Basic controls
        this.cursors = this.input.keyboard.createCursorKeys();

        this.matter.world.on("collisionstart", event => {
            event.pairs.forEach(pair => {

                const { bodyA, bodyB } = pair;
        
                const gameObjectA = bodyA.gameObject;
                const gameObjectB = bodyB.gameObject;
                
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

    collide(ball : Phaser.Physics.Matter.Sprite, tile : Phaser.Physics.Matter.TileBody) {
        
        if (ball != null && tile != null) {
            console.log(tile.tile.index)
            ball.setVelocityY(-3)
        }
    }
}

export default GameScene;