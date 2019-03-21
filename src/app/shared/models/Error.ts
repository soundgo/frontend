export class Error {

    error: string;
    details: any;

    constructor(data: any = {}) {
        this.error = data.error || '';
        this.details = data.details || null;
    }

}
