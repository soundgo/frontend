export class Category {

    id?:number;
    name:string; 
    maxTimeRecord: number;
    minDurationMap: number;
    

    constructor(data: any = {}) {
        this.name = data.name || null;
        this.maxTimeRecord = data.maxTimeRecord || null;
        this.minDurationMap = data.minDurationMap || null;
    }

    toJSON() {
        return {
            name: this.name,
            maxTimeRecord: this.maxTimeRecord,
            minDurationMap: this.minDurationMap
        };

    }

}