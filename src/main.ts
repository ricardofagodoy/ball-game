import "phaser";
import GameScene from "./scenes/GameScene";

const width = window.innerWidth //* window.devicePixelRatio
const height = window.innerHeight //* window.devicePixelRatio

const config: GameConfig = {
  width: 300,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: GameScene,
  backgroundColor: '#FFF',
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};