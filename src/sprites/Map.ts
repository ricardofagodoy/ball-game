export default class Map {
    
    private scene : Phaser.Scene
    private ground : Phaser.Tilemaps.StaticTilemapLayer
    private spawnX : number
    private maxLevel : number

    constructor(scene : Phaser.Scene, level : number) {

        this.spawnX = 0
        this.scene = scene

        const tilemap = scene.make.tilemap({ key: 'map'});
        const layer = 'level' + level
        
        this.maxLevel = tilemap.layers.length
        this.ground = tilemap.createStaticLayer(layer, tilemap.addTilesetImage('tiles'), 0, 0)
        
        tilemap.setCollisionByProperty({ collides: true });
    
        scene.matter.world.convertTilemapLayer(this.ground);
    }

    getMaxLevel() {
        return this.maxLevel
    }

    respawn() {
        this.ground.setX(this.spawnX)
        this.scene.matter.world.convertTilemapLayer(this.ground);
    }

    saveCurrentPosition() {
        this.spawnX = this.ground.x
    }

    moveGroundX(offset : number) {

        const newX = this.ground.x + offset

        if (newX < this.ground.width/2 && newX > this.ground.width/2 * -1) {
            this.ground.setX(this.ground.x + offset)
            this.scene.matter.world.convertTilemapLayer(this.ground)
        }
    }
}