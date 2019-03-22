export class Record {

    base64?: string; //no esta
    path?: string;

    latitude: string; //Es float
    longitude: string; //Es float

    numberReproductions?: number;

    constructor(data: any = {}) {
        this.base64 = data.base64 || null;
        this.path = data.path || null;
        this.latitude = data.latitude || null;
        this.longitude = data.longitude || null;
        this.numberReproductions = data.numberReproductions || null;
    }

    toJSON() {
        return {
            base64: this.base64,
            latitude: this.latitude,
            longitude: this.longitude
        };
    }
}
