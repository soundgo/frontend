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

    duration: number;

    constructor(protected audioRecord: AudioRecordService,
                protected context: ContextService) {
        this.isAd = false;

        this.subscriptionLocalization.add(this.context.getPosition().asObservable().subscribe(position => {
            this.isUserLocalized = position !== null;
        }));

        this.subscriptionLocalization.add(this.audioRecord.getRecordedTime().asObservable().subscribe(duration => {
            this.duration = duration;
        }));

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
