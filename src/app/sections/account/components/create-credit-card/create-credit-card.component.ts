import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateSiteComponent } from 'src/app/sections/map/create-site/create-site.component';
import { ContextService } from 'src/app/services/context.service';
import { CreditCardValidator } from 'ngx-credit-cards';
import { CreditCard } from 'src/app/shared/models/CreditCard';

@Component({
  selector: 'app-create-credit-card',
  templateUrl: './create-credit-card.component.html',
  styleUrls: ['./create-credit-card.component.scss']
})
export class CreateCreditCardComponent implements OnInit {

  creditCardForm: FormGroup;
  idCreditCard: number;
  creditCardEntity: any;

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<CreateSiteComponent>,
    private context: ContextService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.creditcard.name) {
      this.idCreditCard = this.context.getUser().getValue().credit_card;
      this.api.getCreditCardById(this.idCreditCard).then(creditCard => {
        this.creditCardEntity = creditCard;
        console.log(creditCard)
      })
    }
  }

  ngOnInit() {
    this.creditCardForm = new FormGroup({
      name: new FormControl(this.data.creditcard.name || '', [Validators.required, Validators.minLength(2)]),
      number: new FormControl(this.data.creditcard.number || '', [Validators.required, CreditCardValidator.validateCardNumber]),
      expiry: new FormControl(this.data.creditcard.expiry || '', [Validators.required, CreditCardValidator.validateCardExpiry]),
      cvc: new FormControl(this.data.creditcard.cvc || '', [Validators.required, CreditCardValidator.validateCardCvc])
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.creditCardForm.controls[controlName].hasError(errorName);
  }

  onClose() {
    this.dialogRef.close();
  }

  saveCreditCard(creditCardForm) {
    const number = creditCardForm.number.toString().replace(' ', '');

    const creditCard = new CreditCard();
    creditCard.holderName = creditCardForm.name;
    creditCard.number = number;
    creditCard.expirationMonth = creditCardForm.expiry.slice(0, 2);
    creditCard.expirationYear = creditCardForm.expiry.slice(3, 5);
    creditCard.cvvCode = creditCardForm.cvc;
    creditCard.brandName = this.detectBrandName(number);

    if (this.creditCardForm.valid && !this.data.creditcard.name) {
      // Create
      this.api.createCreditCard(creditCard).then(() => {
        console.log('Credit card created', creditCard);
        this.context.setAuth('advertiser');
        // setear propiedades de user con creditcard
        this.onClose();
      });
    } else if (this.creditCardForm.valid && this.data.creditcard.name) {
      // Edit (delete)
      this.api.updateCreditCard(this.idCreditCard, true).then(() => {
        this.onClose();
      });
    }
  }

  detectBrandName(number: string) {
    let res = '';
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
        const numberSlicedString = number.slice(0, length);
        const numberSlicedInt = Number(numberSlicedString);

        if (prefix.length === 1 && prefix[0] === numberSlicedInt) {
          //Caso 1 elemento array
          res = type;
        } else if (prefix.length > 1 && numberSlicedInt >= prefix[0]  && numberSlicedInt <= prefix[1]) {
          // Caso 2 elementos array
          res = type;
        }
      })
    })
    if (res){
      return res;
    } else {
      return 'uknown';
    }
  }

}
