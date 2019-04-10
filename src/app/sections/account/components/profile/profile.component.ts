import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ContextService } from 'src/app/services/context.service';
import { MatDialogRef } from '@angular/material';
import { resolve } from 'dns';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  isAdvertiser: boolean;

  constructor(private context: ContextService,
    private api: ApiService,
    public dialogRef: MatDialogRef<ProfileComponent>,) {
    this.user = this.context.getUser().getValue();
    this.isAdvertiser = this.context.getAuth().getValue() === 'advertiser' ? true : false;
    }

  ngOnInit() {
  }

  submitAvatar(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      const user = new User();
      user.base64 = '' + reader.result;

      this.api.updateUser(this.user.nickname, user);
      
      const userContext = new User(this.user);
      userContext.base64 = user.base64;
      this.context.setUser(userContext);
    }
    
  }
  onClose() {
    this.dialogRef.close();
  }

}
