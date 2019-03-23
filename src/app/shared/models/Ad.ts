import {Record} from './Record';

export class Ad extends Record {

    id?: number;
    radius?: number;
    maxPriceToPay?: number;

    isActive?: boolean;
    isDelete?: boolean;

    constructor(data: any = {}) {
        super(data);
        this.radius = data.radius || null;
        this.maxPriceToPay = data.maxPriceToPay || null;
        this.isActive = data.isActive || null;
        this.isDelete = data.isDelete || null;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            radius: this.radius,
            maxPriceToPay: this.maxPriceToPay
        };
    }

}
