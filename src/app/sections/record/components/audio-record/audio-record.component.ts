import {Component, HostBinding, OnInit, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import {RecorderComponent} from '../../../../shared/components/recorder/recorder.component';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {ContextService} from '../../../../services/context.service';
import {Audio} from '../../../../shared/models/Audio';
import {MatDialog} from '@angular/material/dialog';
import {ChooseAudioCategoryComponent} from '../choose-audio-category/choose-audio-category.component';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-audio-record',
    templateUrl: './audio-record.component.html',
    styleUrls: ['./audio-record.component.scss'],
})
export class AudioRecordComponent extends RecorderComponent implements OnDestroy {

    @HostBinding('class.isRecordingCSS')
    get isRecordingCSS() {
        return !this.isRecorded && this.isRecording;
    }

    @ViewChildren('siri') el: any;

    siriWave: any;
    audioEntity: Audio;
    subscription: Subscription = new Subscription();
    pressToStop = false;
    showUserCantRecord = false;

    isAlreadyStopped = false;

    constructor(
        protected audioRecord: AudioRecordService,
        protected context: ContextService,
        protected dialog: MatDialog,
    ) {
        super(audioRecord, context);
        this.subscription.add(this.context.getIsRecordingAudio().subscribe(isRecordingAudio => {
            if (isRecordingAudio && this.context.getSiteId().getValue()) {
                this.startRecord();
            }
        }));
        this.subscription.add(this.context.getIsRecorded().subscribe(isRecorded => {
            if (isRecorded) {
                this.isRecorded = false;
            }
        }));
        this.subscription.add(this.audioRecord.getRecordedTime().subscribe(duration => {
            const auth = this.context.getAuth().getValue();
            const user = this.context.getUser().getValue();
            if (duration !== 0 && (duration >= 60 && auth === 'user' || duration >= user.minutes)) {
                if (!this.isAlreadyStopped) {
                    this.stopRecord();
                    this.isAlreadyStopped = true;
                }
            }
        }));
        this.subscription.add(this.context.getUser().subscribe(user => {
            if (user) {
                this.showUserCantRecord = user.minutes <= 0;
            }
        }));
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subscription.unsubscribe();
    }

    startRecord() {
        const minutes = this.context.getUser().getValue().minutes;
        if (minutes && minutes > 0) {
            this.audioEntity = new Audio();

            super.startRecording();

            // @ts-ignore
            this.siriWave = new SiriWave({
                container: this.el.first.nativeElement,
                style: 'ios9',
                width: document.body.offsetWidth - document.body.offsetWidth * 0.4,
                height: 150,
                autostart: true,
            });
            this.pressToStop = true;
        }
    }

    async stopRecord(): Promise<void> {
        if (this.siriWave) {
            if (!this.audioEntity) {
                this.audioEntity = new Audio();
            }
            this.audioEntity.duration = this.audioRecord.getRecordedTime().getValue();
            if (this.audioEntity.duration !== 0) {
                this.siriWave.setAmplitude(0);
                this.audioEntity.base64 = await super.stopRecording();

                const {latitude, longitude} = this.context.getPosition().getValue();
                this.audioEntity.latitude = latitude;
                this.audioEntity.longitude = longitude;

                this.context.setAudioEntity(this.audioEntity);
                this.context.setRecordType('audio');
                this.context.setIsRecordingAudio(false);

                this.siriWave.stop();

                this.dialog.open(ChooseAudioCategoryComponent, {
                    width: '350px',
                });

                this.isRecorded = true;
                this.isRecording = false;
                this.pressToStop = false;
                this.audioRecord.setRecordTime(0);
                this.isAlreadyStopped = false;
            }
        }
    }

}
