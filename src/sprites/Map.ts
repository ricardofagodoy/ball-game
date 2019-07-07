import Settings from '../settings'

export default class Map {
    
    private scene : Phaser.Scene
    private ground : Phaser.Tilemaps.DynamicTilemapLayer
    private dataLayer : Phaser.Tilemaps.LayerData

    private spawnX : number

    constructor(scene : Phaser.Scene, level : number) {

        this.spawnX = 0
        this.scene = scene

        const tilemap = scene.make.tilemap({ key: 'map'});
        const layer = 'level' + level
        
        this.ground = tilemap.createDynamicLayer(layer, tilemap.addTilesetImage('tiles'), 0, 0)
        this.ground.setCollisionByProperty({ collides: true });

        scene.matter.world.convertTilemapLayer(this.ground);

        this.dataLayer = tilemap.getLayer(this.ground)

        this.initAnimatedTiles(scene, tilemap)
    }

    initAnimatedTiles(scene : Phaser.Scene, tilemap : Phaser.Tilemaps.Tilemap) {

        scene.sys['animatedTiles'].init(tilemap)
        
        const animationRate = this.dataLayer.properties['animationRate']

        if (animationRate) {
            scene.sys['animatedTiles'].setRate(+animationRate)
        }
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

    private moveGroundX(offset : number) {

        const newX = this.ground.x + offset

        if (newX < this.ground.width/2 && newX > this.ground.width/2 * -1) {
            this.ground.setX(this.ground.x + offset)
            this.scene.matter.world.convertTilemapLayer(this.ground)
        }
    }
}