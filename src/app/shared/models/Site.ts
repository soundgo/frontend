export class Site {

    id?: number;
    latitude: number;
    longitude: number;
    name: string;
    description: string;


    constructor(data: any = {}) {
        this.id = data || null;
        this.latitude = data.latitude || null;
        this.longitude = data.longitude || null;
        this.name = data.name || null;
        this.description = data.desription || null;
    }

    toJSON() {
        const res = {
            latitude: this.latitude,
            longitude: this.latitude,
            name: this.name,
            description: this.description
        };

        if (this.id) {
            res['id'] = this.id;
        }

        return res;
    }
}
