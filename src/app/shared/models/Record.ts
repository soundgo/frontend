export class Record {

    id?: number;

    base64?: string;
    path?: string;

    latitude: number;
    longitude: number;

    numberReproductions?: number;
    duration?: number;

    name: string;
    photo: string;

    constructor(data: any = {}) {
        this.id = data.id || null;
        this.base64 = data.base64 || null;
        this.path = data.path || null;
        this.latitude = data.latitude || null;
        this.longitude = data.longitude || null;
        this.numberReproductions = data.numberReproductions || 0;
        this.duration = data.duration || 0;
        this.name = data.name || null;
        this.photo = data.photo || null;
    }

    toJSON() {
        const res = {
            base64: this.base64,
            latitude: this.latitude,
            longitude: this.longitude
        };

        if (this.id) {
            res['id'] = this.id;
        }

        Object.keys(res).forEach((key) => (res[key] == null) && delete res[key]);

        return res;
    }
}
