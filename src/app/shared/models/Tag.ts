export class Tag {

    name: string;

    constructor(data: any = {}) {
        this.name = data.name || null;
    }

    toJSON() {
        return {
            name: this.name
        };
    }
}
