import {Component, OnInit, Inject} from '@angular/core';
import {User} from 'src/app/shared/models/User';
import {ContextService} from 'src/app/services/context.service';
import {MatDialogRef, MatDialog, MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {EditProfileComponent} from 'src/app/sections/account/components/edit-profile/edit-profile.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: User;
    isAdvertiser: boolean;

    constructor(private context: ContextService,
                public dialogRef: MatDialogRef<ProfileComponent>,
                protected dialog: MatDialog) {
        this.user = this.context.getUser().getValue();
        this.isAdvertiser = this.context.getAuth().getValue() === 'advertiser';
    }

    ngOnInit() {
    }

    onClose() {
        this.dialogRef.close();
    }

    editProfile() {
        this.dialog.open(EditProfileComponent, {
            width: '320px',
            data: {
                user: this.user,
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this.user = result;
                this.context.setUser(this.user);
            }
        });
    }

}
