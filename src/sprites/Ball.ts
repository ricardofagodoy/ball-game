const KEY = 'ball'

export default class Ball extends Phaser.GameObjects.Sprite {
   
    private speed : number = 250;
    private spawnX : number;
    private spawnY : number;

    constructor(scene : Phaser.Scene, x : number, y : number) {

        super(scene, x, y, KEY)

        this.spawnX = x
        this.spawnY = y

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setBounce(1);
        this.body.setCollideWorldBounds(true);

        // Animations
        this.scene.anims.create({
            key: 'left',
            frames: [ { key: KEY, frame: 0 } ],
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: KEY, frame: 0 } ],
            frameRate: 20
        });
    
        this.scene.anims.create({
            key: 'right',
            //frames: this.scene.anims.generateFrameNumbers(KEY, { start: 9, end: 10 }),
            frames: [ { key: KEY, frame: 0 } ],
            frameRate: 10,
            repeat: -1
        });
    }

    moveLeft() {
        this.body.setVelocityX(-this.speed);
        this.anims.play('left', true);
    }

    moveRight() {
        this.body.setVelocityX(this.speed);
        this.anims.play('right', true);
    }

    idle() {
        this.body.setVelocityX(0);
        this.anims.play('turn');
    }

    jump() {
        if (this.body.blocked.down)
            this.body.setVelocityY(-this.speed);
    }

    respawn(sprite) {
        sprite.setPosition(this.spawnX, this.spawnY)
    }
}