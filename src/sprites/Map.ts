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

    moveGroundX(offset : number, heightStart : number, heightOffset : number) {

        const y = this.ground.worldToTileY(heightStart)

        this.ground.forEachTile((tile : Phaser.Tilemaps.Tile) => {
            tile.x+=offset
            tile.pixelX += tile.width * offset
            this.scene.matter.world.convertTiles([tile])
        }, undefined, undefined, y, undefined, y + heightOffset, {isNotEmpty: true})
    }

    createDoors() {
    
        /*const doors = this.scene.add.group();

        // Finish Door
        const finishDoor : any = this.map.findObject("Objects", obj => obj.name === "Finish");
        
        let door = this.scene.add.sprite(finishDoor.x, finishDoor.y, undefined).setOrigin(1, 1)
        door.setSize(this.map.tileWidth, this.map.tileHeight)

        this.scene.physics.add.existing(door)
        door.body.immovable = true
        door.body.moves = false

        doors.add(door)

        return doors */
    }

    createEnemies() {
        return false

        /*findObjectsByType(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element){
          if(element.properties.type === type) {
            //Phaser uses top left, Tiled bottom left so we have to adjust the y position
            //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            //so they might not be placed in the exact pixel position as in Tiled
            element.y -= map.tileHeight;
            result.push(element);
          }      
        });
        return result;
      }*/
    }
}