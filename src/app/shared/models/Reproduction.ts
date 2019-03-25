export class Reproduction {

    date: Date;

    constructor(data: any = {}) {
        this.date = data.date;
    }

    toJSON() {
        return {
            date: this.date
        };
    }

}
