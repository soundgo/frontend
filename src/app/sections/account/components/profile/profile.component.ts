import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {CreateCreditCardComponent} from '../create-credit-card/create-credit-card.component';
import {ApiService} from 'src/app/services/api.service';
import {CreditCard} from 'src/app/shared/models/CreditCard';
import {User} from 'src/app/shared/models/User';
import {ContextService} from 'src/app/services/context.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {EditProfileComponent} from '../edit-profile/edit-profile.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    user: User;
    auth: string;
    isLoading = false;

    constructor(private context: ContextService,
                private api: ApiService,
                public dialogRef: MatDialogRef<ProfileComponent>,
                protected dialog: MatDialog,
                private cdr: ChangeDetectorRef) {
        this.user = this.context.getUser().getValue();
        this.auth = this.context.getAuth().getValue();
        this.context.getAuth().subscribe(value => {
            if (value) {
                this.auth = value;
            }
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.cdr.detach();
    }

    async becomeAdvertiser() {
        const user = this.context.getUser().getValue();
        let userCreditCard = new CreditCard({
            id: '',
            holderName: '',
            number: '',
            expirationMonth: '',
            expirationYear: '',
            cvvCode: '',
            isDelete: false
        });

        // Get if user has credit card at real time
        const response = await this.api.getActorByName(user.nickname, user.token);
        const userCreditCardId = new User(response).credit_card;
        if (userCreditCardId) {
            // Edit & Delete
            const responseCreditCard = await this.api.getCreditCardById(userCreditCardId);
            userCreditCard = new CreditCard(responseCreditCard);
        }

        this.dialog.open(CreateCreditCardComponent, {
            width: '350px',
            data: {
                creditCard: userCreditCard
            }
        }).afterClosed().subscribe(() => {
            if (!this.cdr['destroyed']) {
                this.cdr.detectChanges();
            }
        });
    }


    onClose() {
        this.dialogRef.close();
    }

    submitAvatar(event) {
        this.isLoading = true;
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
                this.isLoading = false;
            });
        };

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
