import Storage from './Storage'

const LEVEL = 'level'

export default class LocalStorage implements Storage {

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
}