import Map from '../sprites/Map'

import Ball from '../sprites/Ball'
import Adventurer from '../sprites/Ball'

class GameScene extends Phaser.Scene {

    private map : Map;
    private player : Adventurer;
    private cursors;

    constructor() {

        super({
            key: 'GameScene'
        });
    }

    preload () {

        // Map and tiles
        //this.load.image('tiles', 'assets/tiles2.png');
        //this.load.tilemapTiledJSON('map', 'assets/map2.json');

        // Main character
        this.load.spritesheet('ball', 'assets/ball.png',
        { frameWidth: 60, frameHeight: 60 })
    }
    
    create () {
    
        this.map = new Map(this)
        //const ground = this.map.createGround()
        //const doors = this.map.createDoors()

        this.player = new Ball(this, 200, 20)

        var graphics = this.add.graphics();

        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(300, 0);
        graphics.lineTo(300, 600);
        graphics.lineTo(0, 600);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.strokePath();

        // Collisions
        this.physics.add.collider(this.player, graphics);
        //this.physics.add.collider(this.player, ground);
        //this.physics.add.overlap(this.player, doors, this.player.respawn.bind(this.player), null, this);
        //this.map.addLavaCollision(this.player.respawn.bind(this.player))

        // Camera to follow player
        //this.cameras.main.startFollow(this.player);
    
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
    
        if (this.cursors.up.isDown)
            this.player.jump()
    }
}

export default GameScene;