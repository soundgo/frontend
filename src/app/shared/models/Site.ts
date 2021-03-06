export class Site {

    id?: number;
    latitude: number;
    longitude: number;
    name: string;
    description: string;


    constructor(data: any = {}) {
        this.id = data.id || null;
        this.latitude = data.latitude || null;
        this.longitude = data.longitude || null;
        this.name = data.name || null;
        this.description = data.description || null;
    }

    toJSON() {
        const res = {
            latitude: this.latitude,
            longitude: this.longitude,
            name: this.name,
            description: this.description
        };

        if (this.id) {
            res['id'] = this.id;
        }

        Object.keys(res).forEach((key) => (res[key] == null) && delete res[key]);

        return res;
    }
}
