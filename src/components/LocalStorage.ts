import Storage from './Storage'

const LEVEL = 'level'
const TIME = 'time'

export default class LocalStorage implements Storage {

    constructor() {
        if (!window.localStorage.getItem(TIME))
            window.localStorage.setItem(TIME, '{}')
    }

    put(key : string, value : any) : void {
        window.localStorage.setItem(key, value)
    }

    get(key : string) : string {
        return window.localStorage.getItem(key)
    }

    getLevel() : number {

        const level = window.localStorage.getItem(LEVEL)

        return level ? parseInt(level) : undefined
    }

    setLevel(level : number) : void {
        window.localStorage.setItem(LEVEL, level.toString())
    }

    setTime(level : number, time : number) : void {

        const currentTime = this.getTime(level)

        if (currentTime == undefined || time < currentTime) {

            const timeJson = JSON.parse(window.localStorage.getItem(TIME))
            timeJson[level] = time.toFixed(1)

            window.localStorage.setItem(TIME, JSON.stringify(timeJson))
        }
    }

    getTime(level : number) : number {
        
        const time = JSON.parse(window.localStorage.getItem(TIME))

        return time[level] ? parseFloat(time[level]) : undefined 
    }
}