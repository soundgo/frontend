export class CreditCard {

    id?: number;
    holderName: string;
    brandName: string;
    number: string;
    expirationMonth: number;
    expirationYear: number;
    cvvCode: number;
    isDelete?: boolean;
    name?: string;

    constructor(data: any = {}) {
        this.id = data.id || null;
        this.holderName = data.holderName || null;
        this.brandName = data.brandName || null;
        this.number = data.number || null;
        this.expirationMonth = data.expirationMonth || null;
        this.expirationYear = data.expirationYear || null;
        this.cvvCode = data.cvvCode || null;
    }

    toJSON() {
        const res = {
            brandName: this.brandName,
            holderName: this.holderName,
            number: this.number,
            expirationMonth: this.expirationMonth,
            expirationYear: this.expirationYear,
            cvvCode: this.cvvCode,
        };

        return res;
    }

}
