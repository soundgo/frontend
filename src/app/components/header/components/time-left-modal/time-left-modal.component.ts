import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-time-left-modal',
  templateUrl: './time-left-modal.component.html',
  styleUrls: ['./time-left-modal.component.scss'],
})
export class TimeLeftModalComponent {

  minutes: number;
  seconds: number;

    constructor(
        public dialogRef: MatDialogRef<TimeLeftModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
          this.minutes = Math.floor(data / 60);
          this.seconds = Math.floor(data - (this.minutes * 60));

          if (this.minutes === 0 && this.seconds === 1) {
            this.seconds = 0;
          }
        }

    onClose() {
        this.dialogRef.close();
    }

}
