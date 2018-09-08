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

        // Finish
        //const finishObject : any = this.map.findObject("Objects", obj => obj.name === "Finish");
        //this.scene.matter.add.gameObject(finishObject, {})
        //finishObject.x += finishObject.width/2
    }

    moveGroundX(offset : number, heightStart : number, heightOffset : number) {

        const y = this.ground.worldToTileY(heightStart)

        this.ground.forEachTile((tile : Phaser.Tilemaps.Tile) => {
            tile.x+=offset
            tile.pixelX += tile.width * offset
            this.scene.matter.world.convertTiles([tile])
        }, undefined, undefined, y, undefined, undefined, { isNotEmpty: true })
    }
}