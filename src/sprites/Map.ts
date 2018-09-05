const MAP_KEY = 'map'
const TILES_KEY = 'tiles'

export default class Map {
    
    private scene : Phaser.Scene;
    private map : Phaser.Tilemaps.Tilemap;

    constructor(scene) {
        this.scene = scene;
    }

    createGround() {

        this.map = this.scene.make.tilemap({ key: MAP_KEY});

        const tiles = this.map.addTilesetImage('tiles', TILES_KEY);
        const ground = this.map.createDynamicLayer("Ground", tiles, 0, 0);
    
        this.map.setCollisionByProperty({ collides: true });
        this.scene.matter.world.convertTilemapLayer(ground);

        return ground
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

    addSpikesCollision(callback) {
        //this.map.setTileIndexCallback(LAVA, callback, this.scene)    
    }
}