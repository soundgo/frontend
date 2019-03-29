import { Component, OnInit, Input } from '@angular/core';
import { ContextService } from '../../../../services/context.service';
import { Ad } from '../../../../shared/models/Ad';
import { MatDialogRef } from '@angular/material';
import { AudioRecordService } from '../../../../services/audio-record.service';


@Component({
    selector: 'app-number-reproductions-advertisements',
    templateUrl: './number-reproductions-advertisements.component.html',
    styleUrls: ['./number-reproductions-advertisements.component.scss']
})
export class NumberReproductionsAdvertisementsComponent implements OnInit {
    duration: number;
    maxToPay: number;
    adEntity: Ad;

    maxNumberOfReproductions: number;

    constructor(private context: ContextService,
        private audioRecord: AudioRecordService,
        public dialogRef: MatDialogRef<NumberReproductionsAdvertisementsComponent>) {
        this.adEntity = this.context.getAdEntity().getValue();
        console.log(this.audioRecord.getRecordedTime().getValue());
    }

    ngOnInit() {
    }

    calculatePrice() {
        /**
         * The formula to calculate the price is:
         *  C x r x s x (d/10000)
         */
        this.duration = 30;
        this.maxNumberOfReproductions = Math.round(this.maxToPay / (this.duration * (this.adEntity.radius / 10000)));
    }

    submit() {
        this.adEntity.maxPriceToPay = this.maxToPay;
        this.context.setAdEntity(this.adEntity);
        // Send ad
        this.context.setSendRecord('ad');
        
        this.dialogRef.close();
    }

}
