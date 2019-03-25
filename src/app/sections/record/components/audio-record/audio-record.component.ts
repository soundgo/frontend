import { Component, OnInit, ViewChildren } from '@angular/core';
import { RecorderComponent } from '../../../../shared/components/recorder/recorder.component';
import { AudioRecordService } from '../../../../services/audio-record.service';
import { ContextService } from '../../../../services/context.service';
import { Audio } from '../../../../shared/models/Audio';
import { MatDialog } from '@angular/material';
import { ChooseAudioCategoryComponent } from '../choose-audio-category/choose-audio-category.component';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-audio-record',
  templateUrl: './audio-record.component.html',
  styleUrls: ['./audio-record.component.scss'],
})
export class AudioRecordComponent extends RecorderComponent implements OnInit {
  @ViewChildren('siri') el: any;

  siriWave: any;

  entity: Audio;

  subscription: Subscription = new Subscription();

  isSite = false;
  siteId: number;

  constructor(
    protected audioRecord: AudioRecordService,
    protected context: ContextService,
    protected dialog: MatDialog,
    protected api: ApiService
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
    this.entity = new Audio();

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

    const { latitude, longitude } = this.context.getPosition().getValue();
    this.entity.latitude = latitude;
    this.entity.longitude = longitude;

    this.context.setAudioEntity(this.entity);

    this.siriWave.stop();

    const recordType = this.context.getRecordType().getValue();
    if (!recordType) {
      this.context.setRecordType('audio');
    }

    this.dialog
      .open(ChooseAudioCategoryComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((result?: boolean) => {
        const audioEntity = this.context.getAudioEntity().getValue();
        const recordType = this.context.getRecordType().getValue();
        if (recordType === 'site') {
          this.api
            .createSiteAudio(audioEntity, this.context.getSiteId().getValue())
            .then(response => {
              console.log('createAudio:', response);
              this.context.setRecordType(null);
              this.context.setIsRecorded(true);
            });
        } else {
          this.api.createAudio(audioEntity).then(response => {
            console.log('createAudio:', response);
            this.context.setRecordType(null);
            this.context.setIsRecorded(true);
          });
          this.isRecorded = false;
        }
      });
  }
}
