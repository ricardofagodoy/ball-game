export default {

    width: 450,
    height: 700,
    backgroundColor: 0x000000,

    delayAfterDeath: 1000,
    colorDeath: 0xff0000,
    gravityY: 1,

    groundSpeed: 5,

    times: {
        1: 3.0,
        2: 7.0,
        3: 11.0,
        4: 11.0,
        5: 11.0,
        6: 11.0,
        7: 20.0
    },

    best: 'Best',
    pro: 'Pro',
    levelColorPro: 0xDAD400,
    levelColorActual: 0x64ACF0,
    levelColorPassed: 0x58A910,

    storage: {
        level: 'level',
        time: 'time'
    },

    style: {
        back: {
            font: "40px Lucida Grande", 
            fill: "#58D68D"
        },
    
        level: {
            font: "25px Lucida Grande", 
            fill: "#FFF"
        },
    
        save: {
            font: "25px Lucida Grande", 
            fill: "#58D68D"
        },

        home: { 
            font: "25px Lucida Grande",
             fill: "#58D68D" 
        },

        levelGrid: { 
            font: "14px Lucida Grande", 
            fill: "#FFF" 
        }
    }
}