import { Component, OnInit, ViewChildren } from '@angular/core';
import { ContextService } from '../../../../services/context.service';
import { AudioRecordService } from '../../../../services/audio-record.service';
import { MatDialog } from '@angular/material';
import { Ad } from '../../../../shared/models/Ad';
import { RecorderComponent } from '../../../../shared/components/recorder/recorder.component';
import { Subscription } from 'rxjs';
import { ChooseAudioAdvertisementComponent } from '../choose-audio-advertisement/choose-audio-advertisement.component';
import { Audio } from '../../../../shared/models/Audio';
import { ChooseAudioCategoryComponent } from '../choose-audio-category/choose-audio-category.component';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-record',
  templateUrl: '../audio-record/audio-record.component.html',
  styleUrls: ['../audio-record/audio-record.component.scss'],
})
export class AdRecordComponent extends RecorderComponent implements OnInit {
  @ViewChildren('siri') el: any;

  siriWave: any;

  entity: Ad;
  isAd = true;

  subscription: Subscription = new Subscription();

  constructor(
    protected audioRecord: AudioRecordService,
    protected context: ContextService,
    protected dialog: MatDialog,
    private api: ApiService,
    private router: Router
  ) {
    super(audioRecord);
    this.subscription = this.context.getIsRecording().subscribe(isRecording => {
      if (isRecording) {
        this.startRecord();
      }
    });
  }

  ngOnInit() {}

  startRecord() {
    this.entity = new Ad();

    super.startRecording();

    // @ts-ignore
    this.siriWave = new SiriWave({
      container: this.el.first.nativeElement,
      style: 'ios9',
      width: document.body.offsetWidth - document.body.offsetWidth * 0.4,
      height: 150,
      autostart: true,
    });
  }

  async stopRecord(): Promise<void> {
    this.siriWave.setAmplitude(0);

    this.entity.base64 = await super.stopRecording();

    this.siriWave.stop();

    this.context.setIsRecording(false);

    this.dialog
      .open(ChooseAudioAdvertisementComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((result?: boolean) => {
        const recordType = this.context.getRecordType().getValue();
        if (recordType === 'ad') {
          const { latitude, longitude } = this.context.getPosition().getValue();
          this.entity.latitude = latitude;
          this.entity.longitude = longitude;

          this.context.setAdEntity(this.entity);
          this.router.navigate(['/ad/locate-ad']);
        } else {
          this.dialog
            .open(ChooseAudioCategoryComponent, {
              width: '350px',
            })
            .afterClosed()
            .subscribe(_ => {
              this.api
                .createAudio(this.context.getAudioEntity().getValue())
                .then(response => {
                  console.log('createAudio:', response);
                });
              this.isRecorded = false;
            });
        }
      });
  }
}
