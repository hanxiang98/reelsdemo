import { Clip } from "./clips.model";
import { ITimeCode } from "./timeCodes.model";

export class Reel {
    name!: string;
    standard!: string;
    definition!: string;
    startTime!: ITimeCode;
    endTime!: ITimeCode;
    clipsInReel!: Clip[];

    constructor(){
        this.standard = "";
        this.definition = "";
        this.clipsInReel = [];
    }

    getStandardDefinition(){
        return this.standard+"/"+this.definition;
    }

    isClipCompatible(clip: Clip): boolean{
        return (this.standard == "" && this.definition == "") || 
        (this.standard == clip.standard && this.definition == clip.definition);
    }

    isClipInReel(clip: Clip): boolean{
        return this.clipsInReel.findIndex( e => e.name === clip.name) > -1
    }

    reCalc(timeCode: ITimeCode): boolean{
        
        /*
        if(!this.isClipCompatible(clip)){
            return false;
        }*/

        this.startTime = timeCode;
        this.endTime = timeCode;
        
        if(this.clipsInReel.length == 0){
            this.standard = "";
            this.definition = "";
        }
        else{
            this.standard = this.clipsInReel[0].standard;
            this.definition = this.clipsInReel[0].definition;

            // calculate total time
            this.clipsInReel.forEach(e => {

                this.endTime.addTime(e.endTime);
                
            });
        }


        return true;        
    }

}