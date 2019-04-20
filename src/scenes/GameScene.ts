import Map from '../sprites/Map'
import Ball from '../sprites/Ball'

import Storage from '../components/Storage'
import LocalStorage from '../components/LocalStorage'
import CollisionHandler from '../components/CollisionHandler'
import PointerHandler from '../components/PointerHandler'

import LevelText from '../components/LevelText'
import SaveButton from '../components/SaveButton'
import BackButton from '../components/BackButton'

const KEY = 'GameScene'

class GameScene extends Phaser.Scene {

    private width
    private height

    private storage : Storage
    private map : Map
    private ball : Ball
    private levelText : LevelText
    private saveButton : SaveButton
    private backButton : BackButton
    private cursors : CursorKeys

    private level : number
    private maxLevel : number
    private groundSpeed = 5
    private pointerMovementSpeed : number

    private isRunning : boolean

    constructor() {
        super({key: KEY})
    }

    init(data) {

        // Define game width and heigth
        this.width = +this.scene.manager.game.config.width
        this.height = +this.scene.manager.game.config.height
        this.pointerMovementSpeed = 0

        this.level = data.level
        this.maxLevel = data.maxLevel

        this.storage = new LocalStorage()
    }

    preload () {
        // Map and tiles
        this.load.image('tiles', 'assets/tiles.png');
        this.load.tilemapTiledJSON('map', 'assets/levels.json');

        // Ball
        this.load.spritesheet('ball', 'assets/ball.png', {frameWidth: 60, frameHeight: 60})
    }
    
    create () {

        // It's alive!
        this.isRunning = true

        // Map
        this.map = new Map(this, this.level)

        // Ball
        this.ball = new Ball(this, this.width/2, 30)
        this.add.existing(this.ball)

        this.ball.on('died', () => {
            this.map.respawn()
            this.ball.respawn()
        })
        
        this.ball.on('finish', () => {
            
            this.level++

            // Just playing level again
            if (this.level <= this.storage.getLevel()) {
                this.isRunning = false
                this.scene.stop(KEY)
                this.scene.start('HomeScene')
                return
            }

            this.storage.setLevel(this.level)
            this.levelText.updateLevel(this.level)

            if (this.level > this.maxLevel) {
                this.isRunning = false
                this.scene.stop(KEY)
                this.scene.start('HomeScene')
            } else
                this.scene.restart({level: this.level, maxLevel: this.maxLevel})
        })

        // Level Text
        this.levelText = new LevelText(this, this.level, this.maxLevel, this.width)

        // Save Button
        this.saveButton = new SaveButton(this, this.width)

        this.saveButton.on('saved', () => {
            this.ball.saveCurrentPosition()
            this.map.saveCurrentPosition()
        })

        // Back Button
        this.backButton = new BackButton(this, this.width)

        this.backButton.on('click', () => {
            this.isRunning = false
            this.scene.stop(KEY)
            this.scene.start('HomeScene')
        })

        // Collision being handled
        this.matter.world.on("collisionstart", CollisionHandler.checkCollisions)
        
        // Basic controls (arrows)
        this.cursors = this.input.keyboard.createCursorKeys();

        // Pointer (touch) movement
        this.input.addPointer(1);

        this.input.on('pointerdown', PointerHandler.handlePointerDown.bind(this))
        this.input.on('pointerup', PointerHandler.handlePointerUp.bind(this))
    }

    update () {
    
        if (!this.isRunning) {
            return;
        }

        if (this.cursors.left.isDown)
            this.map.moveGroundX(-this.groundSpeed)
        else if (this.cursors.right.isDown)
            this.map.moveGroundX(this.groundSpeed)

        this.map.moveGroundX(this.pointerMovementSpeed)
        
        this.ball.update()
    }
}

export default GameScene;