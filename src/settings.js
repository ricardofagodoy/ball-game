export default {

    width: 450,
    height: 700,
    backgroundColor: 0x000000,

    delayAfterDeath: 1000,
    colorDeath: 0xff0000,
    gravityY: 1,

    bounceHeigth: 5,
    groundSpeed: 5,

    best: 'Best',
    pro: 'Pro',
    levelColorPro: 0xDAD400,
    levelColorActual: 0x64ACF0,
    levelColorPassed: 0x58A910,

    storage: {
        level: 'level',
        time: 'time',
        difficulty: 'difficulty'
    },

    Ads: {
        isTesting: false,
        banner: 'ca-app-pub-2813072672105928/4880034890',
        interstitial: 'ca-app-pub-2813072672105928/3375381537'
    },

    style: {
        back: {
            font: "35px Lucida Grande", 
            fill: "#58D68D"
        },
    
        level: {
            font: "30px Lucida Grande", 
            fill: "#FFF"
        },
    
        save: {
            font: "35px Lucida Grande", 
            fill: "#58D68D"
        },

        home: { 
            font: "25px Lucida Grande",
             fill: "#58D68D" 
        },

        levelGrid: { 
            font: "14px Lucida Grande", 
            fill: "#FFF" 
        },

        difficulty: {
            font: "55px Lucida Grande", 
            fill: "#FFF", 
            align: 'center'
        }
    }
}