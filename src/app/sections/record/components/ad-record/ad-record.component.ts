import {Component, OnInit, ViewChildren, HostBinding, AfterViewInit} from '@angular/core';
import {ContextService} from '../../../../services/context.service';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {MatDialog} from '@angular/material';
import {Ad} from '../../../../shared/models/Ad';
import {RecorderComponent} from '../../../../shared/components/recorder/recorder.component';
import {Subscription} from 'rxjs';
import {ChooseAudioAdvertisementComponent} from '../choose-audio-advertisement/choose-audio-advertisement.component';
import {ChooseAudioCategoryComponent} from '../choose-audio-category/choose-audio-category.component';

@Component({
    selector: 'app-ad-record',
    templateUrl: '../audio-record/audio-record.component.html',
    styleUrls: ['../audio-record/audio-record.component.scss'],
})
export class AdRecordComponent extends RecorderComponent {
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

    subscription: Subscription = new Subscription();

    constructor(
        protected audioRecord: AudioRecordService,
        protected context: ContextService,
        protected dialog: MatDialog,
    ) {
        super(audioRecord, context);
        this.subscription = this.context.getIsRecordingAd().subscribe(isRecording => {
            if (isRecording) {
                this.startRecord();
            }
        });
        this.subscription = this.context.getIsRecorded().subscribe(isRecorded => {
            if (isRecorded) {
                this.isRecorded = false;
            }
        });
        this.audioRecord.getRecordedTime().asObservable().subscribe(duration => {
            const auth = this.context.getAuth().getValue();
            if (duration > 56 && auth !== 'user') {
                this.stopRecord();
            }
        });
        this.context.getUser().subscribe(user => {
            if (user) {
                this.showUserCantRecord = user.minutes <= 0;
            }
        });
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
        this.adEntity.duration = this.audioRecord.getRecordedTime().getValue();
        if (this.adEntity.duration !== 0) {
            this.siriWave.setAmplitude(0);

            this.adEntity.base64 = await super.stopRecording();

            const {latitude, longitude} = this.context.getPosition().getValue();
            this.adEntity.latitude = latitude;
            this.adEntity.longitude = longitude;
            this.adEntity.duration = this.audioRecord.getRecordedTime().getValue();

            this.context.setAdEntity(this.adEntity);
            this.context.setRecordType('ad');
            this.context.setIsRecordingAd(false);

            this.siriWave.stop();

            const isRecordedInSite = this.context.getSiteId().getValue();

            if (isRecordedInSite) {
                this.dialog.open(ChooseAudioCategoryComponent, {
                    width: '350px',
                });
            } else {
                this.dialog.open(ChooseAudioAdvertisementComponent, {
                    width: '350px',
                });
            }

            this.isRecorded = true;
            this.isRecording = false;
            this.pressToStop = false;
        }
    }
}
