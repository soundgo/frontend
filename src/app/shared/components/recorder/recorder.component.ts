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
    entity: Audio | Ad;

    entitySetter: any;

    isAd: boolean;

    constructor(protected audioRecord: AudioRecordService) {
        this.subscription = this.audioRecord.getRecordedTime().subscribe(value => {
            this.duration = value;
        });
        this.isAd = false;
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
                this.entity.base64 = '' + reader.result;
                this.entitySetter(this.entity);
            };
        });
    }

}
