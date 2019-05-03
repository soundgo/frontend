import {Record} from './Record';

export class Ad extends Record {

    id?: number;
    radius?: number;
    maxPriceToPay?: number;

    isActive?: boolean;
    isDelete?: boolean;

    numberLikes?: number;
    liked?: boolean;
    reported?: boolean;
    description?: string;

    constructor(data: any = {}) {
        super(data);
        this.radius = data.radius || null;
        this.maxPriceToPay = data.maxPriceToPay || null;
        this.isActive = data.isActive || null;
        this.isDelete = data.isDelete || null;
        this.description = data.description || null;
    }

    toJSON() {
        const res = {
            ...super.toJSON(),
            radius: this.radius,
            maxPriceToPay: this.maxPriceToPay,
            isDelete: this.isDelete,
            description: this.description
        };

        Object.keys(res).forEach((key) => (res[key] == null) && delete res[key]);

        return res;
    }

}
