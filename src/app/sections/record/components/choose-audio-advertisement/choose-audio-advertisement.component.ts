import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChooseAudioCategoryComponent } from '../choose-audio-category/choose-audio-category.component';
import { Router } from '@angular/router';
import {ContextService} from '../../../../services/context.service';
import {ApiService} from '../../../../services/api.service';

@Component({
  selector: 'app-choose-audio-advertisement',
  templateUrl: './choose-audio-advertisement.component.html',
  styleUrls: ['../choose-audio-category/choose-audio-category.component.scss'],
})
export class ChooseAudioAdvertisementComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ChooseAudioAdvertisementComponent>,
    private context: ContextService,
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  clickAudio() {
    this.context.setRecordType('audio');
    this.onClose();
  }

  clickAdvert() {
    this.context.setRecordType('ad');
    this.onClose();
  }

  ngOnInit() {}
}
