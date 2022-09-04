import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { testClips } from 'src/app/data/clipsTestData.data';
import { Clip } from 'src/app/models/clips.model';
import { Reel } from 'src/app/models/reels.model';
import { ITimeCode, NTSCtimeCode, PALtimeCode } from 'src/app/models/timeCodes.model';

@Component({
  selector: 'app-reels',
  templateUrl: './reels.component.html',
  styleUrls: ['./reels.component.scss']
})
export class ReelsComponent implements OnInit {
  
  clipsInReels: Clip[] = [];
  availableClips: Clip[] = [];
  allClips: Clip[] = testClips;

  reelList: Reel[] = [];
  selectedReel?: Reel[];

  newReelName = '';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(msg: string, action: string) {
    this._snackBar.open(msg, action, {
      duration: 5000,
    });
  }

  ngOnInit(): void {
  }

  isReelExist(){
    return this.reelList.findIndex( e => e.name === this.newReelName) > -1
  }

  addReel(reelName: string){
    let reel = new Reel();
    reel.name = reelName;
    this.newReelName = "";
    this.reelList.push(reel);
  }

  deleteReel(reel: Reel){
    this.reelList = this.reelList.filter(obj => obj !== reel);

    this.selectedReel! = [];
    this.availableClips = [];
  }

  clearClipsInReel(){
    this.selectedReel![0].clipsInReel.forEach( e => {
      this.availableClips.push(e);
    });

    this.selectedReel![0].clipsInReel = [];
    
    var timeCode: ITimeCode = new PALtimeCode();

    this.selectedReel![0].reCalc(timeCode);

  }

  onReelChange(event: any) {
    this.availableClips = [];
    testClips.forEach(e => {
      if(!this.selectedReel![0].isClipInReel(e)){
        this.availableClips.push(e);
      }
    });
  }
  
  drop(event: CdkDragDrop<Clip[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      var timeCode! : ITimeCode;

      if(event.container.data[0].standard == "NTSC"){
        timeCode = new NTSCtimeCode();
      }
      else if(event.container.data[0].standard == "PAL"){
        timeCode = new PALtimeCode();
      }

      this.selectedReel![0].reCalc(timeCode);
    }
  }

  dropToReel(event: CdkDragDrop<Clip[]>, reel: Reel) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      if(!reel.isClipCompatible(event.item.data)){
        this.openSnackBar(event.item.data.name + " standard and/or definition is not Compatible to the Reel: " + reel.getStandardDefinition(), "OK");
        return;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      var timeCode! : ITimeCode;

      if(event.container.data[0].standard == "NTSC"){
        timeCode = new NTSCtimeCode();
      }
      else if(event.container.data[0].standard == "PAL"){
        timeCode = new PALtimeCode();
      }

      reel.reCalc(timeCode);
    }
  }

}
