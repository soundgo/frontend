import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  constructor(
      public dialogRef: MatDialogRef<AlertComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  onClose() {
    this.dialogRef.close();
  }

}
