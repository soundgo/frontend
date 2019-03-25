import {Component, Input, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {AudioRecordService} from '../../../services/audio-record.service';
import {Subscription} from 'rxjs';
import {Ad} from '../../models/Ad';
import {Audio} from '../../models/Audio';

@Component({
    selector: 'app-recorder',
    templateUrl: './recorder.component.html',
    styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {

    subscription: Subscription;

    base64: string;

    isAd: boolean;

    isRecording = false;

    isRecorded = false;

    constructor(protected audioRecord: AudioRecordService) {
        this.isAd = false;
    }

    ngOnInit() {
    }

    startRecording() {
        this.audioRecord.startRecording();
        this.isRecording = true;
    }

    stopRecording(): Promise<string> {
        return new Promise(resolve => {
            this.audioRecord.stopRecording();
            this.audioRecord.getRecordedBlob().subscribe(({blob}) => {
                this.isRecording = false;
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    this.isRecorded = true;
                    resolve('' + reader.result);
                };
            });
        });
    }

}
