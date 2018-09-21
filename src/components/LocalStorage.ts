import Storage from './Storage'

export default class LocalStorage implements Storage {

    put(key : string, value : any) : void {
        window.localStorage.setItem(key, value)
    }

    get(key : string) : string {
        return window.localStorage.getItem(key)
    }
}