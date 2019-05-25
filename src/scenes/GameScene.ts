import Map from '../sprites/Map'
import Ball from '../sprites/Ball'

import Storage from '../components/Storage'
import LocalStorage from '../components/LocalStorage'
import Settings from '../settings'

import Control from '../components/Control'
import KeyboardControl from '../components/KeyboardControl'
import PointerControl from '../components/PointerControl'

import Stopwatch from '../components/Stopwatch'
import CollisionHandler from '../components/CollisionHandler'
import Cameras from '../components/Cameras'
import LevelText from '../components/LevelText'
import SaveButton from '../components/SaveButton'
import BackButton from '../components/BackButton'

const KEY = 'GameScene'

class GameScene extends Phaser.Scene {

    private size : any

    // Control variables
    private level : number
    private maxLevel : number
    private isRunning : boolean

    // Components
    private storage : Storage
    private stopwatch : Stopwatch
    private control : Control
    private camera : Cameras

    // Sprites
    private map : Map
    private ball : Ball

    constructor() {
        super({key: KEY})
    }

    init(data) {

        // Define game width and heigth
        this.size = {
            width: +this.scene.manager.game.config.width,
            height: +this.scene.manager.game.config.height
        }

        // Data received via parameter
        this.level = data.level
        this.maxLevel = data.maxLevel

        this.storage = new LocalStorage()
        this.stopwatch = new Stopwatch()

        // Touch controls if possible, else keyboards arrows
        if (this.sys.game.device.input.touch)
            this.control = new PointerControl(this)
        else
            this.control = new KeyboardControl(this)
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
        this.ball = new Ball(this, this.size.width/2, 0)
        this.add.existing(this.ball)

        // Ball events handling
        this.ball.on('died', () => this.onBallDied())
        this.ball.on('finish', () => this.onBallFinished())

        // Level Text Label
        new LevelText(this, this.level, this.maxLevel, this.size).on('click', () => this.respawnLevel())

        // Save Button
        new SaveButton(this, this.size).on('saved', () => this.onSaveButtonPress())

        // Back Button
        new BackButton(this, this.size).on('click', () => this.goToHomeScene())

        // Collision being handled
        this.matter.world.on("collisionstart", CollisionHandler.checkCollisions)
        
        // Camera settings
        this.camera = new Cameras(this, this.size)

        // Saves start time of the level
        this.stopwatch.startTimer()
    }

    update () {
    
        if (!this.isRunning)
            return

        // Update all sprites
        this.ball.update()
        this.map.update(this.control.update())
        this.camera.update(this.ball.getPosition())
    }

    private goToHomeScene() {
        this.isRunning = false
        this.scene.stop(KEY)
        this.scene.start('HomeScene')
    }

    private onSaveButtonPress() {

        this.showAd();

        this.ball.saveCurrentPosition()
        this.map.saveCurrentPosition()
        this.stopwatch.storeLap()
    }

    private onBallDied() {

        if (this.isRunning) {

            this.isRunning = false

            // Respawns level after delay
            setTimeout(() => this.respawnLevel(), Settings.delayAfterDeath)
        }
    }

    private respawnLevel() {
        this.map.respawn()
        this.ball.respawn()
        this.camera.spawnMainCamera(this.ball.getPosition())
        this.stopwatch.startTimer()
        this.isRunning = true
    }

    private onBallFinished() {

        // Show Ad
        this.showAd()

        // Store possible best time
        this.storage.setTime(this.level, this.stopwatch.stopTimerInSeconds())
            
        this.level++

        // Just playing level again, go back to level select
        if (this.level <= this.storage.getLevel())
            return this.goToHomeScene()

        // Save new level record
        this.storage.setLevel(this.level)

        // There is no next level!
        if (this.level > this.maxLevel)
            this.goToHomeScene()
        else
            this.scene.restart({level: this.level, maxLevel: this.maxLevel})
    }

    private showAd() {
        window['admob'].interstitial.show()
    }
}

export default GameScene;