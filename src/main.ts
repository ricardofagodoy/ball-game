import "phaser"
import Settings from './settings'

// Scenes
import GameScene from "./scenes/GameScene";
import HomeScene from "./scenes/HomeScene"
import WinnerScene from "./scenes/WinnerScene"

import AnimatedTiles from './plugins/AnimatedTiles.js' 

let game

const config: any = {
  width: Settings.width,
  height: Settings.height,
  plugins: {
    scene: [
        { key: 'AnimatedTiles', plugin: AnimatedTiles, start: true, mapping: 'animatedTiles', sceneKey: 'animatedTiles' }
    ]
  },
  type: Phaser.AUTO,
  scene: [HomeScene, GameScene, WinnerScene],
  backgroundColor: Settings.backgroundColor,
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

  // Install sw
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  }
}

function onDeviceReady() {

  document.removeEventListener('deviceready', onDeviceReady, false);

  const AdMob = window['admob']

  if (!AdMob)
    return

  AdMob.banner.config({
    id: Settings.Ads.banner,
    autoShow: true,
    isTesting: Settings.Ads.isTesting
   })

   AdMob.interstitial.config({
    id: Settings.Ads.interstitial,
    autoShow: false,
    isTesting: Settings.Ads.isTesting
   })
   
   AdMob.banner.prepare()
   AdMob.interstitial.prepare()
}

/* Device ready */
document.addEventListener("deviceready", onDeviceReady, false);

/* Backbutton */
document.addEventListener("backbutton", () => {}, false);

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