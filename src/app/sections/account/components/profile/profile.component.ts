import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ContextService } from 'src/app/services/context.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  isAdvertiser: boolean;

  constructor(private context: ContextService,
    public dialogRef: MatDialogRef<ProfileComponent>,) {
    this.user = this.context.getUser().getValue();
    this.isAdvertiser = this.context.getAuth().getValue() === 'advertiser' ? true : false;
    }

  ngOnInit() {
  }

  submitAvatar(event) {
    const file: File = event.target.files[0]
    console.log(file)
  }
  onClose() {
    this.dialogRef.close();
  }

}
