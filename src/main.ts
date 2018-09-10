import "phaser";
import GameScene from "./scenes/GameScene";

const width = window.innerWidth //* window.devicePixelRatio // 450
const height = window.innerHeight //* window.devicePixelRatio // 700

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
      gravity: { y: 1 },
      debug: true
    }
  }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  new Game(config);
};