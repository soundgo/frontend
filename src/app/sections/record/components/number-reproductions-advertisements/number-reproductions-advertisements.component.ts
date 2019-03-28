import {Component, OnInit, Input} from '@angular/core';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import {ContextService} from '../../../../services/context.service';
import {Ad} from '../../../../shared/models/Ad';
import {MatDialogRef} from '@angular/material';
import {AudioRecordService} from '../../../../services/audio-record.service';


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
    }

    ngOnInit() {
    }

    calculatePrice() {
        this.maxNumberOfReproductions = Math.round(this.maxToPay / (this.adEntity.duration * (this.adEntity.radius / 10000)));
    }

    submit() {
        this.adEntity.maxPriceToPay = this.maxToPay;
        this.context.setAdEntity(this.adEntity);
        this.dialogRef.close();
    }

}
