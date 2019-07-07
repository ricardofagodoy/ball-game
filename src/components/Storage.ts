export default interface Storage {
    put(key : string, value : any) : void
    get(key : string) : string
    getLevel() : number
    setLevel(level : number) : void
    setTime(level : number, time : number) : void
    getTime(level : number) : number
}