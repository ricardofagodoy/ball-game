export default class Stopwatch {

    private previousTime : number = 0
    private startTime : number

    public startTimer() : void {
        this.startTime = this.obtainTimeMillis()
    }

    public storeLap() : void {
        this.previousTime += this.stopTimer()
    }

    public stopTimerInSeconds() : number {
        this.storeLap()
        return this.previousTime / 1000.0
    }

    private obtainTimeMillis() : number {
        return new Date().getTime()
    }

    private stopTimer() : number {
        return this.obtainTimeMillis() - this.startTime
    }
}