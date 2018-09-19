export default class Map {
    
    private scene : Phaser.Scene
    private map : Phaser.Tilemaps.Tilemap;
    private ground : Phaser.Tilemaps.DynamicTilemapLayer

    constructor(scene, level) {

        this.scene = scene

        this.map = scene.make.tilemap({ key: 'map'});
        const tiles = this.map.addTilesetImage('tiles');

        this.ground = this.map.createDynamicLayer("level" + level, tiles, 0, 0);
    
        this.map.setCollisionByProperty({ collides: true });
        scene.matter.world.convertTilemapLayer(this.ground);
    }

    getHeight() {
        return this.map.height
    }

    getNumberOfLayers() {
        return this.map.layers.length
    }

    respawn() {
        this.ground.setX(0)
        this.scene.matter.world.convertTilemapLayer(this.ground);
    }

    moveGroundX(offset : number) {

        const newX = this.ground.x + offset

        if (newX < this.ground.width/2 && newX > this.ground.width/2 * -1) {
            this.ground.setX(this.ground.x + offset)
            this.scene.matter.world.convertTilemapLayer(this.ground)
        }
    }
}