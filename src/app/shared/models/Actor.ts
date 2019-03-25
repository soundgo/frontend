export class Actor {

    id?: number;
    photo?: string;
    email: string;

    constructor(data: any = {}) {
        this.id = data.id || null;
        this.photo = data.photo || null;
        this.email = data.email || null;
    }

    toJSON() {
        const res = {
            email: this.email
        };

        if (this.photo) {
            res['photo'] = this.photo;
        }

        if (this.id) {
            res['id'] = this.id;
        }

        return res;
    }

}
