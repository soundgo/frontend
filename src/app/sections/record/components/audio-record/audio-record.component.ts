import {Component, HostBinding, OnInit, ViewChildren, AfterViewInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {RecorderComponent} from '../../../../shared/components/recorder/recorder.component';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {ContextService} from '../../../../services/context.service';
import {Audio} from '../../../../shared/models/Audio';
import {MatDialog} from '@angular/material/dialog';
import {ChooseAudioCategoryComponent} from '../choose-audio-category/choose-audio-category.component';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';


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
        private snackBar: MatSnackBar
    ) {
        super(audioRecord, context);
        const auth = this.context.getAuth().getValue();
        const user = this.context.getUser().getValue();
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
            this.duration = duration;
            if (duration !== 0) {
                if (duration >= 60 && auth === 'user' || duration >= user.minutes) {
                    if (!this.isAlreadyStopped) {
                        this.stopRecord();

                        this.isAlreadyStopped = true;
                    }
                }
            }
        }));
        this.subscription.add(this.context.getUser().subscribe(userCheck => {
            if (userCheck) {
                this.showUserCantRecord = userCheck.minutes <= 0;
            }
        }));
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    startRecord() {
        const minutes = this.context.getUser().getValue().minutes;
        if (minutes > 0) {
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
            if (this.audioEntity.duration > 0) {
                this.siriWave.setAmplitude(0);
                this.audioEntity.base64 = await super.stopRecording();

                const {latitude, longitude} = this.context.getPosition().getValue();
                this.audioEntity.latitude = latitude;
                this.audioEntity.longitude = longitude;

                console.log(this.audioEntity.duration);

                this.context.setAudioEntity(this.audioEntity);
                this.context.setRecordType('audio');
                this.context.setIsRecordingAudio(false);

                this.siriWave.stop();

                this.dialog.open(ChooseAudioCategoryComponent, {
                    width: '350px',
                });

                if (this.audioEntity.duration === 60) {
                    this.snackBar.open('You\'ve reached the limit time to record of ' + this.audioEntity.duration + ' seconds.', '', {
                        panelClass: ['blue-snackbar']
                    });
                } else if (this.audioEntity.duration === this.context.getUser().getValue().minutes) {
                    this.snackBar.open('You\'ve spent the ' + this.audioEntity.duration + ' second' + (this.audioEntity.duration !== 1 ? 's' : '') + ' you have for recording.', '', {
                        panelClass: ['blue-snackbar']
                    });
                }

                this.isRecorded = true;
                this.isRecording = false;
                this.pressToStop = false;
                this.isAlreadyStopped = false;
            }
        }
    }

}
