export class Category {

    id?: number;
    name: string;
    maxTimeRecord: number;
    minDurationMap: number;


    constructor(data: any = {}) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.maxTimeRecord = data.maxTimeRecord || null;
        this.minDurationMap = data.minDurationMap || null;
    }

    toJSON() {
        const res = {
            name: this.name,
            maxTimeRecord: this.maxTimeRecord,
            minDurationMa: this.minDurationMap
        };

        if (this.id) {
            res['id'] = this.id;
        }

        return res;
    }

}
