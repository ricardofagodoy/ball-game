import "phaser";
import GameScene from "./scenes/GameScene";

const width = window.innerWidth //* window.devicePixelRatio
const height = window.innerHeight //* window.devicePixelRatio

const config: GameConfig = {
  width: 450,
  height: 700,
  type: Phaser.AUTO,
  parent: "game",
  scene: GameScene,
  backgroundColor: '#000',
  physics: {
    default: "matter",
    matter: {
      setBounds: { width: 450, height: 700},
      gravity: { y: 1 },
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