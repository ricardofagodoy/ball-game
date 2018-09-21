export default interface Storage {
    put(key : string, value : any) : void
    get(key : string) : string
}