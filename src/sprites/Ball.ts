const KEY = 'ball'

export default class Ball extends Phaser.Physics.Matter.Sprite {
   
    private speed : number = 2;
    private spawnX : number;
    private spawnY : number;

    constructor(scene : Phaser.Scene, x : number, y : number) {

        super(scene.matter.world, x, y, KEY)

        this.spawnX = x
        this.spawnY = y

        this.scene.add.existing(this)
        this.setCircle(25, {})

        this.setBounce(1);
    }

    moveLeft() {
        this.setVelocityX(-this.speed);
    }

    moveRight() {
        this.setVelocityX(this.speed);
    }

    update() {}

    respawn(sprite) {
        sprite.setPosition(this.spawnX, this.spawnY)
    }
}