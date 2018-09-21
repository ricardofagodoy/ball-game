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

            if (object.tile.properties['kill'])
                return ball.emit('died')

            if (object.tile.properties['finish'])
                return ball.emit('finish')

            if (object.tile.properties['ground'])
                return ball.bounce()
        }
    }
}