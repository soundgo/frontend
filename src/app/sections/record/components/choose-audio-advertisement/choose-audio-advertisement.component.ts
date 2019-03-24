import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChooseAudioCategoryComponent } from '../choose-audio-category/choose-audio-category.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-audio-advertisement',
  templateUrl: './choose-audio-advertisement.component.html',
  styleUrls: ['../choose-audio-category/choose-audio-category.component.scss'],
})
export class ChooseAudioAdvertisementComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ChooseAudioAdvertisementComponent>,
    public dialog: MatDialog,
    private router: Router
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  clickAudio() {
    this.onClose();
    this.dialog.open(ChooseAudioCategoryComponent, {
      width: '350px',
    });
  }

  clickAdvert() {
    this.onClose();
    this.router.navigate(['/ad/locate-ad']);
  }

  ngOnInit() {}
}
