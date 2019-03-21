import {Record} from './Record';

export enum AUDIO_CATEGORIES {
    TOURISM = 1,
    EXPERIENCES = 2,
    LEISURE = 3
}

export class Audio extends Record {

    category: AUDIO_CATEGORIES;

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
