import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChooseAudioCategoryComponent } from '../choose-audio-category/choose-audio-category.component';
import { ChooseAdLocationComponent } from '../choose-ad-location/choose-ad-location.component';

@Component({
  selector: 'app-choose-audio-advertisement',
  templateUrl: './choose-audio-advertisement.component.html',
  styleUrls: ['../choose-audio-category/choose-audio-category.component.scss'],
})
export class ChooseAudioAdvertisementComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ChooseAudioAdvertisementComponent>,
    protected dialog: MatDialog,
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  clickAudio() {
    this.onClose();
    this.dialog.open(ChooseAudioCategoryComponent, {
      width: '350px',
  })
  }

  clickAdvert() {
    this.onClose();
    this.dialog.open(ChooseAdLocationComponent, {
        width: '350px',
    })
    
  }

  ngOnInit() {}
}
