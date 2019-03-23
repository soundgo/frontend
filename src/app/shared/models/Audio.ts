import {Record} from './Record';
import {Tag} from './Tag';
import {Site} from './Site';
import {TagContentType} from '@angular/compiler';

export const AUDIO_CATEGORIES = {
    TOURISM: 1,
    EXPERIENCES: 2,
    LEISURE: 3
};

export class Audio extends Record {

    id?: number;
    category?: number;
    isInappropriate?: boolean;
    timestampCreation?: Date;
    timestampFinish?: Date;
    site?: Site;
    tags?: Tag[];

    constructor(data: any = {}) {
        super(data);
        this.category = data.category || null;
        this.isInappropriate = data.isInappropriate || false;
        this.timestampCreation = data.timestampCreation || null;
        this.timestampFinish = data.timestampFinish || null;
        if (data.site) {
            this.site = new Site(data.site);
        } else {
            this.site = null;
        }
        if (data.tags) {
            this.tags = [];
            data.tags.forEach(tag => {
                this.tags.push(new Tag(tag));
            });
        } else {
            this.tags = null;
        }
    }

    toJSON() {
        return {
            ...super.toJSON(),
            category: this.category,
            isInappropriate: this.isInappropriate,
            timestampCreation: this.timestampCreation,
            timestampFinish: this.timestampFinish,
            site: this.site.toJSON(),
            tags: this.tags.map(tag => tag.toJSON())
        };
    }

}
