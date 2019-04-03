import {Actor} from './Actor';

export class User extends Actor {

    minutes: number;

    constructor(data: any = {}) {
        super(data);
        this.minutes = data.minutes || 0;
    }

    toJSON() {
        const res = {
            ...super.toJSON(),
            minutes: this.minutes
        };

        Object.keys(res).forEach((key) => (res[key] == null) && delete res[key]);

        return res;
    }

}
