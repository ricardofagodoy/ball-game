import Ball from '../sprites/Ball'

export default {

    checkCollisions: (event) => {
        event.pairs.forEach(pair => {

            const { bodyA, bodyB } = pair;

            const gameObjectA = bodyA.gameObject;
            const gameObjectB = bodyB.gameObject;

            // Has no body
            if (gameObjectA == null || gameObjectB == null)
                return

            if (gameObjectA instanceof Ball)
                (<Ball>gameObjectA).collide(gameObjectB)
            else if (gameObjectB instanceof Ball)
                (<Ball>gameObjectB).collide(gameObjectA)
        })
    },

    handleBallCollision(ball : Ball, object : Phaser.GameObjects.GameObject) {
        if (object instanceof Phaser.Physics.Matter.TileBody) {

            const properties = object.tile.properties

            if (properties['kill'] && !isCollidingBellowTile(ball, object.tile)) {
                ball.died()
                return ball.emit('died')
            }

            if (properties['finish'])
                return ball.emit('finish')

            if (properties['ground'])
                return ball.bounce()
        }
    }
}

function isCollidingBellowTile(ball : Ball, tile : Phaser.Tilemaps.Tile) {
    return ball.y - tile.pixelY > ball.height
}