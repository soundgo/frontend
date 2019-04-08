import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-time-left-modal',
  templateUrl: './time-left-modal.component.html',
  styleUrls: ['./time-left-modal.component.scss']
})
export class TimeLeftModalComponent {

  timeLeft: number;

    constructor(
        public dialogRef: MatDialogRef<TimeLeftModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
          this.timeLeft = Math.round(data*100)/100;
        }

    onClose() {
        this.dialogRef.close();
    }

}
