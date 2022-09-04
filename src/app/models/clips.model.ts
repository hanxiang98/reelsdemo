import { ITimeCode } from "./timeCodes.model";

export class Clip {
    name!: string;
    description?: string;
    standard!: string;
    definition!: string;
    startTime!: ITimeCode;
    endTime!: ITimeCode;

    /*
    constructor(startTimecode: ITimeCode, endTimeCode: ITimeCode){
        this.startTime = startTimecode;
        this.endTime = endTimeCode;
    }*/
}

/*

export class ClipInReel extends Clip{
    sequence!: number;
}

export interface IClips {
    name: string;
    description: string;
    standard: string;
    definition: string;
    startTime: ITimeCode;
    endTime: ITimeCode;
}
*/