export interface ITimeCode {
    /*
    standard: string;
    hours: number;
    minutes: number;
    seconds: number;
    frame: number;
    */
   
    getFrame: () => number;
    getSeconds: () => number;
    getMinutes: () => number;
    getHours: () => number;
    getTime: () => string;
    addTime: (timeCode: ITimeCode) => void;
}

export abstract class TimeCode implements ITimeCode{
    standard!: string;
    hours!: number;
    minutes!: number;
    seconds!: number;
    frame!: number;    

    constructor(hours = 0, minutes = 0, seconds = 0, frame = 0){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.frame = frame;        
    }   

    getFrame(){
        return this.frame;
    }

    getSeconds(){
        return this.seconds;
    }

    getMinutes(){
        return this.minutes;
    }

    getHours(){
        return this.hours;
    }
    
    getTime(): string{
        return ("0" + this.hours).slice(-2)+":"+("0" + this.minutes).slice(-2)+":"+("0" + this.seconds).slice(-2)+":"+("0" + this.frame).slice(-2);
    }

    addTime(timeCode: ITimeCode){
        return;
    }
    
}

export class NTSCtimeCode extends TimeCode implements ITimeCode{

    constructor(hours = 0, minutes = 0, seconds = 0, frame = 0){
        super(hours, minutes, seconds, frame);
        this.standard = "NTSC";
    }    

    override addTime(timeCode: ITimeCode): void {
        this.frame = this.frame + timeCode.getFrame();
        if(this.frame >= 30){
            this.frame = this.frame - 30;
            this.seconds++;
        }
        this.seconds = this.seconds + timeCode.getSeconds();
        if(this.seconds >= 60){
            this.seconds = this.seconds - 60;
            this.minutes++;
        }
        this.minutes = this.minutes + timeCode.getMinutes();
        if(this.minutes >= 60){
            this.minutes = this.minutes - 60;
            this.hours++;
        }
        this.hours = this.hours + timeCode.getHours();
    }
    
}

export class PALtimeCode extends TimeCode implements ITimeCode{

    constructor(hours = 0, minutes = 0, seconds = 0, frame = 0){
        super(hours, minutes, seconds, frame);
        this.standard = "PAL";
    }    
    
    
    override addTime(timeCode: ITimeCode): void {
        this.frame = this.frame + timeCode.getFrame();
        if(this.frame >= 25){
            this.frame = this.frame - 25;
            this.seconds++;
        }
        this.seconds = this.seconds + timeCode.getSeconds();
        if(this.seconds >= 60){
            this.seconds = this.seconds - 60;
            this.minutes++;
        }
        this.minutes = this.minutes + timeCode.getMinutes();
        if(this.minutes >= 60){
            this.minutes = this.minutes - 60;
            this.hours++;
        }
        this.hours = this.hours + timeCode.getHours();

    }
}
