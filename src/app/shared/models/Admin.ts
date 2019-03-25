import {Actor} from './Actor';

export class Admin extends Actor {

    constructor(data: any = {}) {
        super(data);
    }

    toJSON() {
        return super.toJSON();
    }

}
