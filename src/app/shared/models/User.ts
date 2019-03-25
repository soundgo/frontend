import {Actor} from './Actor';

export class User extends Actor {

    minutes: number;

    constructor(data: any = {}) {
        super(data);
        this.minutes = data.minutes;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            minutes: this.minutes
        };
    }

}
