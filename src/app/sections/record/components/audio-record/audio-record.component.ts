import {Component, OnInit, ViewChildren} from '@angular/core';
import {RecorderComponent} from '../../../../shared/components/recorder/recorder.component';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {ContextService} from '../../../../services/context.service';
import {Audio} from '../../../../shared/models/Audio';
import {MatDialog} from '@angular/material';
import {ChooseAudioAdvertisementComponent} from '../choose-audio-advertisement/choose-audio-advertisement.component';
import {ChooseAudioCategoryComponent} from '../choose-audio-category/choose-audio-category.component';

@Component({
    selector: 'app-audio-record',
    templateUrl: './audio-record.component.html',
    styleUrls: ['./audio-record.component.scss']
})
export class AudioRecordComponent extends RecorderComponent implements OnInit {

    @ViewChildren('siri') el: any;

    siriWave: any;

    entity: Audio;

    constructor(protected audioRecord: AudioRecordService,
                protected context: ContextService,
                protected dialog: MatDialog
    ) {
        super(audioRecord);
    }

    ngOnInit() {
    }

    startRecord() {
        this.entity = new Audio();

        super.startRecording();

        // @ts-ignore
        this.siriWave = new SiriWave({
            container: this.el.first.nativeElement,
            style: 'ios9',
            width: document.body.offsetWidth - (document.body.offsetWidth * 0.4),
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

        this.context.setAudioEntity(this.entity);

        this.siriWave.stop();

        this.dialog.open(ChooseAudioCategoryComponent, {
            width: '90%',
            height: '40%',
        });

    }

}
