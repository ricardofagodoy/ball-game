import GameScene from '../scenes/GameScene'

export default class Ball extends Phaser.Physics.Matter.Sprite {
   
    private bounceSpeed = 4
    private spawnX : number;
    private spawnY : number;

    constructor(scene : Phaser.Scene, x : number, y : number) {

        super(scene.matter.world, x, y, 'ball')

        this.spawnX = x
        this.spawnY = y

        this.scene.add.existing(this)
        this.setCircle(25, {})
        this.setScale(0.5)
    }

    update() {
        this.setX(this.spawnX)
    }

    collide(object : Phaser.GameObjects.GameObject) {
        
        if (object instanceof Phaser.Physics.Matter.TileBody) {

            if (object.tile.properties['kill'])
                return this.respawn()

            if (object.tile.properties['finish'])
                return (<GameScene>this.scene).nextLevel()

            this.setVelocityY(-this.bounceSpeed)
        }
    }

    respawn() {
        this.setPosition(this.spawnX, this.spawnY)
    }
}