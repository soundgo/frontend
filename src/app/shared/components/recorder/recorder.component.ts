import {Component, Input, OnInit} from '@angular/core';
import {AudioRecordService} from '../../../services/audio-record.service';
import {Subscription} from 'rxjs';
import {Ad} from '../../models/Ad';
import {Audio} from '../../models/Audio';
import {ContextService} from '../../../services/context.service';

@Component({
    selector: 'app-recorder',
    templateUrl: './recorder.component.html',
    styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {

    duration = '0';
    subscription: Subscription;
    adEntity: Ad;
    audioEntity: Audio;

    @Input() isAd = false;

    constructor(private audioRecord: AudioRecordService,
                private context: ContextService) {
        this.subscription = this.audioRecord.getRecordedTime().subscribe(value => {
            this.duration = value;
        });
    }

    ngOnInit() {
    }

    startRecording() {
        this.audioRecord.startRecording();
    }

    async stopRecording() {
        this.audioRecord.stopRecording();
        this.audioRecord.getRecordedBlob().subscribe(({blob}) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                if (this.isAd) {
                    this.audioEntity = new Audio();
                    this.audioEntity.base64 = '' + reader.result;
                    this.context.setAudioEntity(this.audioEntity);
                } else {
                    this.adEntity = new Ad();
                    this.adEntity.base64 = '' + reader.result;
                    this.context.setAdEntity(this.adEntity);
                }
            };
        });
    }

}
