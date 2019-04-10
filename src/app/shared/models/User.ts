import {Actor} from './Actor';
import {CreditCard} from './CreditCard';

export class User extends Actor {

    minutes: number;
    creditCard: CreditCard;
    credit_card: number; // ID

    constructor(data: any = {}) {
        super(data);
        this.minutes = data.minutes || 0;
        this.creditCard = data.creditCard || null;
        this.credit_card = data.credit_card || null;
    }

    toJSON() {
        const res = {
            ...super.toJSON(),
            minutes: this.minutes,
            credit_card: this.creditCard
        };

        Object.keys(res).forEach((key) => (res[key] == null) && delete res[key]);

        return res;
    }

}
