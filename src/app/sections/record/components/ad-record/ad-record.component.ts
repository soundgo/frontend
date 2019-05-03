import {Component, OnInit, ViewChildren, HostBinding, AfterViewInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {ContextService} from '../../../../services/context.service';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Ad} from '../../../../shared/models/Ad';
import {RecorderComponent} from '../../../../shared/components/recorder/recorder.component';
import {Subscription} from 'rxjs';
import {ChooseAudioAdvertisementComponent} from '../choose-audio-advertisement/choose-audio-advertisement.component';
import {ChooseAudioCategoryComponent} from '../choose-audio-category/choose-audio-category.component';
import {User} from '../../../../shared/models/User';

@Component({
    selector: 'app-ad-record',
    templateUrl: '../audio-record/audio-record.component.html',
    styleUrls: ['../audio-record/audio-record.component.scss'],
})
export class AdRecordComponent extends RecorderComponent implements OnDestroy {
    @HostBinding('class.isRecordingCSS')
    get isRecordingCSS() {
        return !this.isRecorded && this.isRecording;
    }

    @ViewChildren('siri') el: any;
    @ViewChildren('adblock') adblock: any;

    siriWave: any;
    adEntity: Ad;
    isAd = true;
    pressToStop = false;
    showUserCantRecord = false;

    siteId: number;

    subscription: Subscription = new Subscription();

    user: User;

    constructor(
        protected audioRecord: AudioRecordService,
        protected context: ContextService,
        protected dialog: MatDialog,
        private snackBar: MatSnackBar,
        private cdr: ChangeDetectorRef
    ) {
        super(audioRecord, context);
        this.user = this.context.getUser().getValue();
        this.subscription.add(this.context.getIsRecordingAd().subscribe(isRecording => {
            if (isRecording && this.context.getSiteId().getValue()) {
                this.siteId = this.context.getSiteId().getValue();
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
            if (this.duration !== 0) {
                this.cdr.detectChanges();
                if (duration > 60 || (this.siteId && (duration > 60 || (duration + 1) > this.user.minutes))) {
                    this.stopRecord();
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
        this.cdr.detach();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    startRecord() {
        this.adEntity = new Ad();

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

    async stopRecord(): Promise<void> {
        if (!this.adEntity) {
            this.adEntity = new Ad();
        }
        this.adEntity.duration = this.audioRecord.getRecordedTime().getValue();
        if (this.adEntity.duration > 0) {
            this.siriWave.setAmplitude(0);
            this.adEntity.base64 = await super.stopRecording();

            this.adEntity.duration = Math.min(this.adEntity.duration, 60);

            const {latitude, longitude} = this.context.getPosition().getValue();
            this.adEntity.latitude = latitude;
            this.adEntity.longitude = longitude;

            console.log(this.adEntity.duration);

            this.context.setAdEntity(this.adEntity);
            this.context.setRecordType('ad');
            this.context.setIsRecordingAd(false);

            this.siriWave.stop();

            if (this.siteId) {
                this.dialog.open(ChooseAudioCategoryComponent, {
                    width: '350px',
                });
            } else {
                this.dialog.open(ChooseAudioAdvertisementComponent, {
                    width: '350px',
                });
            }

            if (this.adEntity.duration === 60) {
                this.snackBar.open('You\'ve reached the limit time to record of ' + this.adEntity.duration + ' seconds.', '', {
                    panelClass: ['blue-snackbar']
                });
            }

            if (this.siteId && this.adEntity.duration === this.context.getUser().getValue().minutes) {
                this.snackBar.open('You\'ve spent the ' + this.adEntity.duration + ' second' + (this.adEntity.duration !== 1 ? 's' : '') + ' you have for recording.', '', {
                    panelClass: ['blue-snackbar']
                });
            }

            this.siteId = 0;
            this.isRecorded = true;
            this.isRecording = false;
            this.pressToStop = false;
        }
    }
}
