export default class Cameras {
   
    private scene : Phaser.Scene
    private startPoint : number // This is the position where camera will move to center the ball

    constructor(scene : Phaser.Scene, size : any) {

        this.scene = scene
        this.startPoint = size.height / 2

        scene.cameras.add(0, 0, size.width, size.height/14, false, 'header')
        this.spawnMainCamera(0)
    }

    spawnMainCamera(ballPosition : number) {

        const moveCloseToBallOffset = ballPosition ? ballPosition/2 : 0

        this.scene.cameras.main.setPosition(0, 50)
        this.scene.cameras.main.setScroll(0, moveCloseToBallOffset - 50)
    }

    update(ballPosition : number) : void {
        if (this.scene.cameras.main.scrollY < ballPosition - this.startPoint)
            this.scene.cameras.main.scrollY+=5
    }
}