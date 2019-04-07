export class Tag {

    id?: number;
    name: string;

    constructor(data: any = {}) {
        this.id = data.id || null;
        this.name = data.name || null;
    }

    toJSON() {
        return this.name;
    }
}
