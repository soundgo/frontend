import {Actor} from './Actor';

export class User extends Actor {

    minutes: number;
    credit_card: number;

    constructor(data: any = {}) {
        super(data);
        this.minutes = data.minutes || 0;
        this.credit_card = data.credit_card || null;
    }

    toJSON() {
        const res = {
            ...super.toJSON(),
            minutes: this.minutes,
            credit_card: this.credit_card
        };

        Object.keys(res).forEach((key) => (res[key] == null) && delete res[key]);

        return res;
    }

}
