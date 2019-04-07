import {Record} from './Record';
import {Tag} from './Tag';
import {Site} from './Site';
import {TagContentType} from '@angular/compiler';

export const AUDIO_CATEGORIES = {
    TOURISM: 'Tourism',
    EXPERIENCE: 'Experience',
    LEISURE: 'Leisure',
};

export class Audio extends Record {
    category?: string | number;
    isInappropriate?: boolean;
    timestampCreation?: Date;
    timestampFinish?: Date;
    site?: Site;
    tags?: string[];
    actor?: number | {};
    language?: number | string[];
    liked?: boolean;
    numberLikes?:number;

    constructor(data: any = {}) {
        super(data);
        this.category = data.category || null;
        this.isInappropriate = data.isInappropriate || null;
        this.timestampCreation = data.timestampCreation || null;
        this.timestampFinish = data.timestampFinish || null;
        this.tags = [];

        if (data.site) {
            this.site = new Site(data.site);
        } else {
            this.site = null;
        }
        if (data.tags) {
            this.tags = data.tags;
        } else {
            this.tags = null;
        }
        this.actor = data.actor || null;
        this.language = data.language || null;
        this.liked = data.liked || null;
        this.numberLikes = data.numberLikes || null;
    }

    toJSON() {
        const res = {
            ...super.toJSON(),
            category: this.category,
            isInappropriate: this.isInappropriate,
            timestampCreation: this.timestampCreation,
            timestampFinish: this.timestampFinish,
        };

        if (this.site) {
            res['site'] = this.site.toJSON();
        }

        if (this.tags) {
            res['tags'] = this.tags;
        }

        Object.keys(res).forEach(key => res[key] == null && delete res[key]);

        return res;
    }
}
