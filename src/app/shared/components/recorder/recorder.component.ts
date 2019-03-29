import {Component, Input, OnDestroy, OnInit, SecurityContext} from '@angular/core';
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

    base64: string;

    isAd: boolean;

    isRecording = false;

    isRecorded = false;

    isUserLocalized = true;

    subscriptionLocalization: Subscription = new Subscription();

    constructor(protected audioRecord: AudioRecordService,
                protected context: ContextService) {
        this.isAd = false;

        this.subscriptionLocalization = this.context.getPosition().asObservable().subscribe(position => {
            this.isUserLocalized = position !== null;
        });
    }

    ngOnInit() {
    }

    startRecording() {
        this.isRecording = true;
        this.audioRecord.startRecording();
    }

    stopRecording(): Promise<string> {
        return new Promise(resolve => {
            this.audioRecord.stopRecording();
            this.audioRecord.getRecordedBlob().subscribe(({blob}) => {
                this.isRecording = false;
                this.isRecorded = true;
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    resolve('' + reader.result);
                };
            });
        });
    }

}
