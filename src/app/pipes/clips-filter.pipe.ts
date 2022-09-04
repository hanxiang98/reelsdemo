import { Pipe, PipeTransform } from '@angular/core';
import { Clip } from '../models/clips.model';
import { Reel } from '../models/reels.model';

@Pipe({
    name: 'clipfilter',
    pure: false
})
export class ClipsFilterPipe implements PipeTransform {
    transform(items: Clip[], filter: Reel[]): any {
        if (!items || !filter || filter.length == 0 || filter[0].clipsInReel.length == 0) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.definition == filter[0].definition 
            && item.standard == filter[0].standard);
    }
}