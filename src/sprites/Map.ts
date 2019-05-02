import Settings from '../settings'

export default class Map {
    
    private scene : Phaser.Scene
    private ground : Phaser.Tilemaps.StaticTilemapLayer
    private dataLayer : Phaser.Tilemaps.LayerData

    private spawnX : number

    constructor(scene : Phaser.Scene, level : number) {

        this.spawnX = 0
        this.scene = scene

        const tilemap = scene.make.tilemap({ key: 'map'});
        const layer = 'level' + level
        
        this.ground = tilemap.createStaticLayer(layer, tilemap.addTilesetImage('tiles'), 0, 0)
        this.ground.setCollisionByProperty({ collides: true });
        scene.matter.world.convertTilemapLayer(this.ground);
        
        this.dataLayer = tilemap.getLayer(this.ground)
    }

    respawn() {
        this.ground.setX(this.spawnX)
        this.scene.matter.world.convertTilemapLayer(this.ground);
    }

    saveCurrentPosition() {
        this.spawnX = this.ground.x
    }

    update(direction : number) {
        this.moveGroundX(direction * Settings.groundSpeed)
    }

    getMapBounce() : number {
        return +this.dataLayer.properties['bounce']
    }

    private moveGroundX(offset : number) {

        const newX = this.ground.x + offset

        if (newX < this.ground.width/2 && newX > this.ground.width/2 * -1) {
            this.ground.setX(this.ground.x + offset)
            this.scene.matter.world.convertTilemapLayer(this.ground)
        }
    }
}