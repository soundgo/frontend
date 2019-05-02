import {Component, OnInit, Inject, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from 'src/app/services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {CreateSiteComponent} from 'src/app/sections/map/create-site/create-site.component';
import {ContextService} from 'src/app/services/context.service';
import {CreditCardValidator} from 'ngx-credit-cards';
import {CreditCard} from 'src/app/shared/models/CreditCard';
import {DeleteModalComponent} from 'src/app/shared/components/delete-modal/delete-modal.component';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../../../../shared/models/User';

@Component({
    selector: 'app-create-credit-card',
    templateUrl: './create-credit-card.component.html',
    styleUrls: ['./create-credit-card.component.scss']
})
export class CreateCreditCardComponent implements OnInit, OnDestroy {

    creditCardForm: FormGroup;
    isDeleted = false;
    auth: string;

    constructor(private api: ApiService,
                protected dialog: MatDialog,
                public dialogRef: MatDialogRef<CreateCreditCardComponent>,
                private context: ContextService,
                private cookieService: CookieService,
                private cdr: ChangeDetectorRef,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.auth = this.context.getAuth().getValue();
        console.log(data.creditCard)
        if (data.creditCard && data.creditCard.isDelete) {
            // If is deleted put empty form
            this.data.creditCard.holderName = '';
            this.data.creditCard.number = '';
            this.data.creditCard.expirationMonth = '';
            this.data.creditCard.cvvCode = '';
        }
    }

    ngOnInit() {
        const expiry = !this.data.creditCard.expirationMonth ? '' :
            this.data.creditCard.expirationMonth + '/' + this.data.creditCard.expirationYear;
        this.creditCardForm = new FormGroup({
            name: new FormControl(this.data.creditCard.holderName, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
            number: new FormControl(this.data.creditCard.number, [Validators.required, CreditCardValidator.validateCardNumber]),
            expiry: new FormControl(expiry, [Validators.required, CreditCardValidator.validateCardExpiry, Validators.maxLength(5)]),
            cvc: new FormControl(this.data.creditCard.cvvCode, [Validators.required, CreditCardValidator.validateCardCvc])
        });
    }

    ngOnDestroy() {
        this.cdr.detach();
    }


    hasError(controlName: string, errorName: string) {
        return this.creditCardForm.controls[controlName].hasError(errorName);
    }

    onClose() {
        this.dialogRef.close();
    }

    prepareCreditCard(creditCardForm): CreditCard {
        const creditCard = new CreditCard();
        const creditCardNumber = creditCardForm.number.toString().replace(' ', '');
        const expiry = creditCardForm.expiry.trim().split('/');

        creditCard.id = this.data.creditCard.id;
        creditCard.holderName = creditCardForm.name;
        creditCard.number = creditCardNumber;
        creditCard.brandName = this.detectBrandName(creditCardNumber);
        creditCard.expirationMonth = parseInt(expiry[0], 10);
        creditCard.expirationYear = parseInt(expiry[1], 10);
        creditCard.cvvCode = parseInt(creditCardForm.cvc, 10);

        return creditCard;
    }

    async saveCreditCard(creditCardForm) {

        const creditCard = this.prepareCreditCard(creditCardForm);

        try {
            if (this.creditCardForm.valid && !creditCard.id) {
                // Create
                await this.api.createCreditCard(creditCard);
            } else if (this.creditCardForm.valid && creditCard.id) {
                // Edit
                creditCard.isDelete = false;
                await this.api.updateCreditCard(creditCard.id, creditCard);
            }
            this.context.setAuth('advertiser');
            this.cookieService.set('user', JSON.stringify({
                user: this.context.getUser().getValue(),
                auth: 'advertiser'
            }));
            this.onClose();
        } catch (e) {
            console.log(e);
        }
    }

    deleteCreditCard() {
        this.isDeleted = true;
        const creditCard = new CreditCard(this.data.creditCard);
        creditCard.isDelete = true;
        this.dialog.open(DeleteModalComponent, {
            width: '350px',
            data: {
                entity: creditCard,
                entityType: 'creditcard'
            }
        }).afterClosed().subscribe(isDeleted => {
            this.isDeleted = false;
            if (!this.cdr['destroyed']) {
                this.cdr.detectChanges();
            }
            if (isDeleted) {
                this.dialogRef.close();
            }
        });
    }

    detectBrandName(creditCardNumber: string) {
        let res = 'unknown';
        const cardTypes = {
            amex: [
                [34, 37]
            ],
            discover: [
                [6011],
                [622126, 622925],
                [644, 649],
                [65]
            ],
            jcb: [
                [3528, 3589]
            ],
            mastercard: [
                [50, 55]
            ],
            unionpay: [
                [622609]
            ],
            visa: [
                [4]
            ]
        };

        Object.keys(cardTypes).forEach(type => {
            cardTypes[type].map(prefix => {
                const length = prefix[0].toString().length;
                const numberSlicedString = creditCardNumber.slice(0, length);
                const numberSlicedInt = Number(numberSlicedString);
                if (prefix.length === 1 && prefix[0] === numberSlicedInt) {
                    // Caso 1 elemento array
                    res = type;
                } else if (prefix.length > 1 && numberSlicedInt >= prefix[0] && numberSlicedInt <= prefix[1]) {
                    // Caso 2 elementos array
                    res = type;
                }
            });
        });

        return res;
    }

}
