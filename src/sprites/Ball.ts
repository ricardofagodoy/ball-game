import CollisionHandler from '../components/CollisionHandler'
import Settings from '../settings'

export default class Ball extends Phaser.Physics.Matter.Sprite {
   
    private readonly SCALE = 0.4

    private bounceHeigth = 5
    private spawnX : number;
    private spawnY : number;
    private absoluteY : number;
    private isDead : boolean = false

    constructor(scene : Phaser.Scene, x : number, y : number) {

        super(scene.matter.world, x, y, 'ball')

        this.spawnX = x
        this.spawnY = y
        this.absoluteY = y

        this.setCircle(this.width / 2, {})
        this.setScale(this.SCALE)
        this.setSize(this.width * this.SCALE, this.height * this.SCALE)
    }

    collide(object : Phaser.GameObjects.GameObject) {
        CollisionHandler.handleBallCollision(this, object)
    }

    getPosition() {
        return this.absoluteY
    }

    // Keep ball in the center
    update() {
        this.setX(this.spawnX)

        this.absoluteY = Math.max(this.absoluteY, this.y)
    }

    bounce() {
        if (!this.isDead)
            this.setVelocityY(-this.bounceHeigth)
    }

    respawn() {
        this.isDead = false
        this.setIgnoreGravity(false)
        this.setTint(0xffffff)
        this.setPosition(this.spawnX, this.spawnY)
        this.absoluteY = this.y
    }

    saveCurrentPosition() {
        this.spawnY = this.y
    }

    died() {
        this.setTint(Settings.colorDeath)
        this.isDead = true
        this.setVelocity(0, 0)
        this.setAngularVelocity(0)
        this.setIgnoreGravity(true)
    }
}