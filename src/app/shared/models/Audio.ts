import {Record} from './Record';
import {Tag} from './Tag';
import {Site} from './Site';
import { TagContentType } from '@angular/compiler';

export enum AUDIO_CATEGORIES {
    TOURISM = 1,
    EXPERIENCES = 2,
    LEISURE = 3
}

export class Audio extends Record {

    id?:number;
    category: AUDIO_CATEGORIES; // Es de tipo Category
    isInappropriate?: boolean;
    timestampCreation?:Date;
    timestampFinish?:Date;
    site?:Site;
    tags?:Tag;

    constructor(data: any = {}) {
        super(data);
        this.category = data.category || null;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            category: this.category
        };

    }

}
