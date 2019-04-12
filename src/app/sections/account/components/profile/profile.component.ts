import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {CreateCreditCardComponent} from '../create-credit-card/create-credit-card.component';
import {ApiService} from 'src/app/services/api.service';
import {CreditCard} from 'src/app/shared/models/CreditCard';
import {User} from 'src/app/shared/models/User';
import {ContextService} from 'src/app/services/context.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {EditProfileComponent} from '../edit-profile/edit-profile.component';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    user: User;
    auth: string;
    isLoading = false;

    loadingDeleteInfo = false;
    canDelete = false;

    constructor(private context: ContextService,
                private api: ApiService,
                public dialogRef: MatDialogRef<ProfileComponent>,
                protected dialog: MatDialog,
                private cdr: ChangeDetectorRef,
                private cookieService: CookieService) {
        this.user = this.context.getUser().getValue();
        this.auth = this.context.getAuth().getValue();
        this.context.getAuth().subscribe(value => {
            if (value) {
                this.auth = value;
            }
        });
    }

    ngOnInit() {
        this.checkDelete();
    }

    ngOnDestroy() {
        this.cdr.detach();
    }

    checkDelete() {
        this.loadingDeleteInfo = true;
        const auth = this.context.getAuth().getValue();
        if (auth === 'advertiser') {
            const user = this.context.getUser().getValue();
            this.api.checkDelete(user.nickname).then((response: any) => {
                this.loadingDeleteInfo = false;
                if (typeof response === 'string') {
                    this.canDelete = false;
                } else {
                    if (!response.error) {
                        this.canDelete = true;
                    }
                }
            });
        } else {
            this.loadingDeleteInfo = false;
            this.canDelete = true;
        }
    }

    deleteProfile() {
        const user = this.context.getUser().getValue();
        if (user) {
            this.api.deleteProfile(user.nickname).then(() => {
                this.context.setAuth(null);
                this.context.setUser(null);
                this.cookieService.deleteAll();
                this.dialogRef.close();
            });
        }
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
