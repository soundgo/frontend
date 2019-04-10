import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/shared/models/User';
import {ContextService} from 'src/app/services/context.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ApiService} from 'src/app/services/api.service';
import {EditProfileComponent} from '../edit-profile/edit-profile.component';

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
                protected dialog: MatDialog,
                private api: ApiService) {
        this.user = this.context.getUser().getValue();
        this.isAdvertiser = this.context.getAuth().getValue() === 'advertiser';
    }

    ngOnInit() {
    }

    submitAvatar(event) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = () => {
            const user = new User();
            user.base64 = '' + reader.result;

            this.api.updateUser(this.user.nickname, user).then(() => {
                // Set user context && template variable
                const userContext = new User(this.user);
                this.user.photo = user.base64;
                userContext.photo = user.base64;
                this.context.setUser(userContext);
            });
        };

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
