import Map from '../sprites/Map'
import Ball from '../sprites/Ball'
import Adventurer from '../sprites/Ball'

class GameScene extends Phaser.Scene {

    private map : Map;
    private player : Adventurer;
    private cursors;

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
    
        this.map = new Map(this)
        const ground = this.map.createGround()

        this.player = new Ball(this, 200, 20)

        const graphics = this.add.graphics();
        graphics.strokeRect(0, 0, 400, 700)

        // Collisions
        //this.physics.add.collider(this.player, ground);
        //this.physics.add.overlap(this.player, doors, this.player.respawn.bind(this.player), null, this);
        //this.map.addSpikesCollision(this.player.respawn.bind(this.player))

        // Basic controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
    
        if (this.cursors.left.isDown)
            this.player.moveLeft()
        else if (this.cursors.right.isDown)
            this.player.moveRight()
        else
            this.player.idle()
    }
}

export default GameScene;