export default {

    handlePointerDown: function(pointer : Phaser.Input.Pointer) {
            
        // Text above level does not move ball
        if (pointer.y < 50)
            return

        if (pointer.x < this.width / 2)
            this.pointerMovementSpeed = this.groundSpeed
        else
            this.pointerMovementSpeed = -this.groundSpeed
    },

    handlePointerUp: function(pointer : Phaser.Input.Pointer) {
        if (!this.input.pointer1.isDown && !this.input.pointer2.isDown)
            this.pointerMovementSpeed = 0
    }
}