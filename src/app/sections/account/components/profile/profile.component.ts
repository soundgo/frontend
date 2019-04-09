import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ContextService } from 'src/app/services/context.service';
import { MatDialogRef, MatDialog, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { EditProfileComponent } from 'src/app/sections/account/components/profile/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  isAdvertiser: boolean;

  constructor(private context: ContextService,
    public dialogRef: MatDialogRef<ProfileComponent>, protected dialog: MatDialog,) {
    this.user = this.context.getUser().getValue();
    this.isAdvertiser = this.context.getAuth().getValue() === 'advertiser' ? true : false;
    console.log(this.user)
    console.log(this.isAdvertiser)
    
  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

  editProfile() {
    this.dialog.open(EditProfileComponent, {
        width: '350px',
        data: {
            user: this.context.getUser().getValue(),
        }
    }).afterClosed().subscribe(result => {
      if (result) {
          this.user = result;
      }
  });
}

}
