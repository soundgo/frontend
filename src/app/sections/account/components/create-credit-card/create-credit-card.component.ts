import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CreateSiteComponent } from 'src/app/sections/map/create-site/create-site.component';
import { ContextService } from 'src/app/services/context.service';
import { CreditCardValidator } from 'ngx-credit-cards';
import { CreditCard } from 'src/app/shared/models/CreditCard';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-create-credit-card',
  templateUrl: './create-credit-card.component.html',
  styleUrls: ['./create-credit-card.component.scss']
})
export class CreateCreditCardComponent implements OnInit {

  creditCardForm: FormGroup;
  isDeleted: boolean = false;

  constructor(
    private api: ApiService,
    protected dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateSiteComponent>,
    private context: ContextService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.creditcard.isDelete) {
      // If is deleted put empty form
      this.data.creditcard.holderName = '';
      this.data.creditcard.number = '';
      this.data.creditcard.expirationMonth = '';
      this.data.creditcard.cvvCode = '';
    }
  }

  ngOnInit() {
    const expiry = this.data.creditcard.expirationMonth === '' ? '' : this.data.creditcard.expirationMonth + '/' + this.data.creditcard.expirationYear;
    this.creditCardForm = new FormGroup({
      name: new FormControl(this.data.creditcard.holderName, [Validators.required, Validators.minLength(2)]),
      number: new FormControl(this.data.creditcard.number, [Validators.required, CreditCardValidator.validateCardNumber]),
      expiry: new FormControl(expiry, [Validators.required, CreditCardValidator.validateCardExpiry]),
      cvc: new FormControl(this.data.creditcard.cvvCode, [Validators.required, CreditCardValidator.validateCardCvc])
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.creditCardForm.controls[controlName].hasError(errorName);
  }

  onClose() {
    this.dialogRef.close();
  }

  saveCreditCard(creditCardForm) {

    const creditcard = new CreditCard();
    creditcard.holderName = creditCardForm.name;
    const number = creditCardForm.number.toString().replace(' ', '');
    creditcard.number = number;
    creditcard.brandName = this.detectBrandName(number);
    const expiry = creditCardForm.expiry.trim().split('/');
    creditcard.expirationMonth = expiry[0];
    creditcard.expirationYear = expiry[1];
    creditcard.cvvCode = creditCardForm.cvc;

    if (this.creditCardForm.valid && !this.data.creditcard.id) {
      // Create
      this.api.createCreditCard(creditcard).then(() => {
        console.log('Credit card created', creditcard);
        this.context.setAuth('advertiser');
        // setear propiedades de user con creditcard
        this.onClose();
      });
    } else if (this.creditCardForm.valid && this.isDeleted) {
      // Delete
      creditcard.isDelete = true;
      creditcard.id = this.data.creditcard.id;

      this.dialog.open(DeleteModalComponent, {
        width: '350px',
        data: {
          entity: creditcard,
          entityType: 'creditcard'
        }
      })

    } else if (this.creditCardForm.valid && this.data.creditcard.id) {
      // Edit
      this.api.updateCreditCard(this.data.creditcard.id, creditcard).then(() => {
        console.log('Credit card edited', creditcard);
        this.onClose();
      });
    }
  }

  deleteCreditCard(creditCardForm) {
    this.isDeleted = true;
    this.saveCreditCard(creditCardForm)
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
        } else if (prefix.length > 1 && numberSlicedInt >= prefix[0] && numberSlicedInt <= prefix[1]) {
          // Caso 2 elementos array
          res = type;
        }
      })
    })
    if (res) {
      return res;
    } else {
      return 'uknown';
    }
  }

}
