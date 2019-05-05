export default class Cameras {
   
    private scene : Phaser.Scene
    private startPoint : number // This is the position where camera will move to center the ball

    constructor(scene : Phaser.Scene, screenWidth : number, screenHeight : number) {

        this.scene = scene
        this.startPoint = screenHeight / 3

        scene.cameras.add(0, 0, screenWidth, 50, false, 'header')
        this.spawnMainCamera(0)
    }

    spawnMainCamera(ballPosition : number) {

        const moveCloseToBallOffset = ballPosition ? ballPosition/3 : 0

        this.scene.cameras.main.setPosition(0, 50)
        this.scene.cameras.main.setScroll(0, 50 + moveCloseToBallOffset)
    }

    update(ballPosition : number) : void {
        if (this.scene.cameras.main.scrollY < ballPosition - this.startPoint)
            this.scene.cameras.main.scrollY+=5
    }
}