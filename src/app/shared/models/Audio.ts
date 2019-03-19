interface IAudio {
    id: string;
    name: string;
}

export class Audio implements IAudio {

    id: string;
    name: string;

    constructor(data: any = {}) {
        this.id = data.id || 0;
        this.name = data.name || null;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        };

    }

}
