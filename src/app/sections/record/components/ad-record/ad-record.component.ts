import {Component, OnInit, ViewChildren} from '@angular/core';
import {ContextService} from '../../../../services/context.service';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {MatDialog} from '@angular/material';
import {Ad} from '../../../../shared/models/Ad';
import {ChooseAudioAdvertisementComponent} from '../choose-audio-advertisement/choose-audio-advertisement.component';
import {RecorderComponent} from '../../../../shared/components/recorder/recorder.component';

@Component({
    selector: 'app-ad-record',
    templateUrl: '../audio-record/audio-record.component.html',
    styleUrls: ['../audio-record/audio-record.component.scss']
})
export class AdRecordComponent extends RecorderComponent implements OnInit {

    @ViewChildren('siri') el: any;

    siriWave: any;

    entity: Ad;
    isAd = true;

    constructor(protected audioRecord: AudioRecordService,
                protected context: ContextService,
                protected dialog: MatDialog
    ) {
        super(audioRecord);
    }

    ngOnInit() {
    }

    startRecord() {
        this.entity = new Ad();

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

        this.entity.base64 = await super.stopRecording();

        const {latitude, longitude} = this.context.getPosition().getValue();
        this.entity.latitude = latitude;
        this.entity.longitude = longitude;

        this.context.setAdEntity(this.entity);

        this.siriWave.stop();

        this.dialog.open(ChooseAudioAdvertisementComponent, {
            width: '50%',
            height: '40%',
        });
    }

}
