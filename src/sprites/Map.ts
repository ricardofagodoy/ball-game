export default class Map {
    
    private scene : Phaser.Scene
    private map : Phaser.Tilemaps.Tilemap;
    private ground : Phaser.Tilemaps.DynamicTilemapLayer

    constructor(scene) {

        this.scene = scene

        this.map = scene.make.tilemap({ key: 'map'});
        const tiles = this.map.addTilesetImage('tiles', 'tiles');

        this.ground = this.map.createDynamicLayer("Ground", tiles, 0, 0);
    
        // Collision
        this.map.setCollisionByProperty({ collides: true });
        scene.matter.world.convertTilemapLayer(this.ground);
    }

    moveGroundX(offset : number) {

        this.ground.forEachTile((tile : Phaser.Tilemaps.Tile) => {

            //tile.x+=offset
            //tile.pixelX += tile.width * offset
            //this.scene.matter.world.convertTiles([tile])

            

        }, undefined, undefined, undefined, undefined, undefined, { isNotEmpty: true })
    }
}