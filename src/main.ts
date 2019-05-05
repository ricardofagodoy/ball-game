import "phaser"
import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js'

import Settings from './settings'

// Scenes
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOverScene";
import InstructionsScene from "./scenes/InstructionsScene"
import HomeScene from "./scenes/HomeScene"
import WinnerScene from "./scenes/WinnerScene"

let game

const config: any = {
  width: Settings.width,
  height: Settings.height,
  type: Phaser.AUTO,
  scene: [HomeScene, GameScene, GameOverScene, InstructionsScene, WinnerScene],
  backgroundColor: Settings.backgroundColor,
  plugins: {
    global: [
        { key: 'AnimatedTiles', plugin: AnimatedTiles, start: true }
      ]
  },
  physics: {
    default: "matter",
    matter: {
      gravity: { y: Settings.gravityY },
      debug: false
    }
  }
};

window.onload = () => {
  game = new Phaser.Game(config);
  resize();
  window.focus();
  window.addEventListener("resize", resize, false);
};

function resize() {

  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
      canvas.style.width = windowWidth + "px";
      canvas.style.height = (windowWidth / gameRatio) + "px";
  } else {
      canvas.style.width = (windowHeight * gameRatio) + "px";
      canvas.style.height = windowHeight + "px";
  }
}