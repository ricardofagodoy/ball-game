import CollisionHandler from '../components/CollisionHandler'

export default class Ball extends Phaser.Physics.Matter.Sprite {
   
    private bounceHeigth = 5
    private spawnX : number;
    private spawnY : number;

    constructor(scene : Phaser.Scene, x : number, y : number) {

        super(scene.matter.world, x, y, 'ball')

        this.spawnX = x
        this.spawnY = y
        
        this.setCircle(this.width / 2, {})
        this.setScale(0.5)
    }

    collide(object : Phaser.GameObjects.GameObject) {
        CollisionHandler.handleBallCollision(this, object)
    }

    // Keep ball in the center
    update() {
        this.setX(this.spawnX)
    }

    bounce() {
        this.setVelocityY(-this.bounceHeigth)
    }

    respawn() {
        this.setPosition(this.spawnX, this.spawnY)
    }

    saveCurrentPosition() {
        this.spawnY = this.y
    }
}