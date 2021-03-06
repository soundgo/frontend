import {Component, OnInit, Input, Inject, HostListener} from '@angular/core';
import {ContextService} from '../../../../services/context.service';
import {Ad} from '../../../../shared/models/Ad';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {Validators, FormControl, FormGroup} from '@angular/forms';
import {ApiService} from 'src/app/services/api.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-number-reproductions-advertisements',
    templateUrl: './number-reproductions-advertisements.component.html',
    styleUrls: ['./number-reproductions-advertisements.component.scss']
})
export class NumberReproductionsAdvertisementsComponent implements OnInit {

    duration: number;
    adEntity: Ad;
    adEditForm: FormGroup;
    maxNumberOfReproductions: number;
    submit = _.debounce(() => this.saveAdEdit(this.adEditForm.value), 1000);

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        if (e.key === '-') {
            e.preventDefault();
        }
    }


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
        this.adEditForm = new FormGroup({
            price: new FormControl(this.adEntity.maxPriceToPay, [Validators.required, Validators.min(1), Validators.max(1000000)]),
            description: new FormControl(this.adEntity.description || '', [Validators.maxLength(200)]),
        });

        if (this.adEntity.maxPriceToPay) {
            this.calculatePrice(this.adEntity.maxPriceToPay);
        }
    }


    hasError(controlName: string, errorName: string) {
        return this.adEditForm.controls[controlName].hasError(errorName);
    }

    calculatePrice(number) {
        /**
         * The formula to calculate the price is:
         *  C x r x s x (d/10000)
         */

        this.duration = this.adEntity.duration || this.data.properties.duration;
        this.maxNumberOfReproductions = Math.round(Math.abs(number) / (this.duration * (this.adEntity.radius / 10000)));
    }

    validateBlankSpaces() {
        // Validator empty spaces
        const {price, description} = this.adEditForm.value;
        this.adEditForm.setValue({price: price, description: description.trim()});
    }

    saveAdEdit(adEditForm) {
            this.validateBlankSpaces();

            if (this.adEditForm.valid && !this.data) {
                this.adEntity.maxPriceToPay = Math.abs(adEditForm.price);
                this.adEntity.description = adEditForm.description;
                this.context.setAdEntity(this.adEntity);
                // Send ad
                this.context.setSendRecord('ad');

                this.dialogRef.close();
            } else if (this.adEditForm.valid && this.data) {
                const ad = new Ad(this.data.ad);
                ad.description = adEditForm.description;
                ad.maxPriceToPay = Math.abs(adEditForm.price);
                ad.isDelete = false;
                this.api.updateAd(ad);

                this.dialogRef.close(ad);
        }
    }

    absolute(value) {
        return Math.abs(value);
    }

}
