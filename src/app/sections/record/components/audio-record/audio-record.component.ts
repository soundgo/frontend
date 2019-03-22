import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {RecorderComponent} from '../../../../shared/components/recorder/recorder.component';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {ContextService} from '../../../../services/context.service';
import {Audio} from '../../../../shared/models/Audio';
import {ChooseAudioCategoryComponent} from '../choose-audio-category/choose-audio-category.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-audio-record',
    templateUrl: './audio-record.component.html',
    styleUrls: ['./audio-record.component.scss']
})
export class AudioRecordComponent extends RecorderComponent implements OnInit, AfterViewInit {

    @ViewChildren('siri') el: any;

    siriWave: any;

    entity: Audio;

    constructor(protected audioRecord: AudioRecordService,
                protected context: ContextService,
                protected dialog: MatDialog
    ) {
        super(audioRecord);
    }

    getCurrentLocation(): Promise<{ latitude: number, longitude: number }> {
        return new Promise(resolve => {
            navigator.geolocation.getCurrentPosition(({coords}) => {
                const {latitude, longitude} = coords;
                resolve({latitude, longitude});
            });
        });
    }

    startRecord() {
        this.entity = new Audio();

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

        this.entity.latitude = location.latitude;
        this.entity.longitude = location.longitude;
        this.entity.base64 = await super.stopRecording();

        this.context.setAudioEntity(this.entity);

        this.siriWave.stop();

        const dialogRef = this.dialog.open(ChooseAudioCategoryComponent, {
            width: '50%',
            height: '40%',
        });
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
    }

}
