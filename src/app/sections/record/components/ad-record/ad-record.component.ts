import {Component, OnInit} from '@angular/core';
import {ChooseAudioCategoryComponent} from '../choose-audio-category/choose-audio-category.component';
import {AudioRecordComponent} from '../audio-record/audio-record.component';
import {ContextService} from '../../../../services/context.service';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {MatDialog} from '@angular/material';
import {Ad} from '../../../../shared/models/Ad';
import {ChooseAudioAdvertisementComponent} from '../choose-audio-advertisement/choose-audio-advertisement.component';

@Component({
    selector: 'app-ad-record',
    templateUrl: '../audio-record/audio-record.component.html',
    styleUrls: ['../audio-record/audio-record.component.scss']
})
export class AdRecordComponent extends AudioRecordComponent implements OnInit {

    adEntity: Ad;

    constructor(protected audioRecord: AudioRecordService,
                protected context: ContextService,
                protected dialog: MatDialog) {
        super(audioRecord, context, dialog);
        this.isAd = true;
    }

    ngOnInit() {
    }

    startRecord() {
        this.adEntity = new Ad();

        super.startRecording();

        // @ts-ignore
        this.siriWave = new SiriWave({
            container: this.el.first.nativeElement,
            style: 'ios9',
            width: document.body.offsetWidth - 100,
            height: 150,
            autostart: true
        });
    }

    async stopRecord(): Promise<void> {
        this.siriWave.setAmplitude(0);
        const location = await this.getCurrentLocation();

        this.adEntity.latitude = location.latitude;
        this.adEntity.longitude = location.longitude;
        this.adEntity.base64 = await super.stopRecording();

        this.context.setAdEntity(this.adEntity);

        this.siriWave.stop();

        this.dialog.open(ChooseAudioAdvertisementComponent, {
            width: '50%',
            height: '40%',
        });
    }

}
