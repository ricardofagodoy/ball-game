import "phaser";
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOverScene";
import InstructionsScene from "./scenes/InstructionsScene"

let game

const config: any = {
  width: 450,
  height: 700,
  type: Phaser.AUTO,
  scene: [GameScene, GameOverScene, InstructionsScene],
  backgroundColor: 0x000000,
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 1 },
      debug: false
    }
  }
};

window.onload = () => {
  game = new Phaser.Game(config);
  window.focus();
  resize();
  window.addEventListener("resize", resize, false);
};

function resize() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;
  if(windowRatio < gameRatio){
      canvas.style.width = windowWidth + "px";
      canvas.style.height = (windowWidth / gameRatio) + "px";
  }
  else{
      canvas.style.width = (windowHeight * gameRatio) + "px";
      canvas.style.height = windowHeight + "px";
  }
}