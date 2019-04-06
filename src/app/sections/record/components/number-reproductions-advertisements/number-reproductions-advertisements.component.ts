import {Component, OnInit, Input, Inject} from '@angular/core';
import {ContextService} from '../../../../services/context.service';
import {Ad} from '../../../../shared/models/Ad';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {Validators, FormControl, FormGroup} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';


@Component({
    selector: 'app-number-reproductions-advertisements',
    templateUrl: './number-reproductions-advertisements.component.html',
    styleUrls: ['./number-reproductions-advertisements.component.scss']
})
export class NumberReproductionsAdvertisementsComponent implements OnInit {
    duration: number;
    adEntity: Ad;
    adPriceForm: FormGroup;

    maxNumberOfReproductions: number;

    constructor(private api: ApiService,
                private context: ContextService,
                private audioRecord: AudioRecordService,
                public dialogRef: MatDialogRef<NumberReproductionsAdvertisementsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.adEntity = this.data ? this.data.ad : this.context.getAdEntity().getValue();
        dialogRef.backdropClick().subscribe(bool => {
            this.context.setIsRecorded(true);
        });
    }

    ngOnInit() {
        this.adPriceForm = new FormGroup({
            price: new FormControl(this.adEntity.maxPriceToPay, [Validators.required]),
        });
    }

    hasError(controlName: string, errorName: string) {
        return this.adPriceForm.controls[controlName].hasError(errorName);
    }

    calculatePrice(number) {
        /**
         * The formula to calculate the price is:
         *  C x r x s x (d/10000)
         */
        
        this.duration = 30;
        this.maxNumberOfReproductions = Math.round(number / (this.duration * (this.adEntity.radius / 10000)));
    }

    submit(adPriceForm) {
        if (this.adPriceForm.valid && !this.data) {
            this.adEntity.maxPriceToPay = adPriceForm.price;
            this.context.setAdEntity(this.adEntity);
            // Send ad
            this.context.setSendRecord('ad');

            this.dialogRef.close();
        }
        else if (this.adPriceForm.valid && this.data) {
            const ad = new Ad(this.data.ad);
            ad.maxPriceToPay = adPriceForm.price;
            ad.isDelete = false;
            this.api.updateAd(ad);
            this.dialogRef.close();
          }
    }

}
