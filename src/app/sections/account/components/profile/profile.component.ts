import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CreateCreditCardComponent } from '../create-credit-card/create-credit-card.component';
import { ApiService } from 'src/app/services/api.service';
import { CreditCard } from 'src/app/shared/models/CreditCard';
import { User } from 'src/app/shared/models/User';
import { ContextService } from 'src/app/services/context.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { CookieService } from 'ngx-cookie-service';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

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
        this.user = this.context.getUser().getValue() || new User();
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
                if (!response) {
                    this.canDelete = true;
                } else if (typeof response === 'string') {
                    this.canDelete = false;
                }
                this.loadingDeleteInfo = false;
            });
        } else {
            this.loadingDeleteInfo = false;
            this.canDelete = true;
        }
    }

    deleteProfile() {
        const user = this.context.getUser().getValue();
        if (user) {
            this.dialog.open(DeleteModalComponent, {
                width: '350px',
                data: {
                    entity: user,
                    entityType: 'user'
                }
            }).afterClosed().subscribe(isDeleted => {
                if (!this.cdr['destroyed']) {
                    this.cdr.detectChanges();
                }
                if (isDeleted) {
                    this.dialogRef.close();
                }
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
        const file = event.target.files[0];
        
        if (file.type.match('image.*')) {
            this.isLoading = true;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const user = new User();
                user.base64 = '' + reader.result;
                this.api.updateUser(this.user.nickname, user).then((savedUser: User) => {
                    this.user.photo = savedUser.photo;
                    this.context.setUser(this.user);
                    this.cookieService.set('user', JSON.stringify({
                        user: this.user,
                        auth: this.auth
                    }));
                    this.isLoading = false;
                });
            };
        } else {
            this.dialog.open(AlertComponent, {
                width: '320px',
                data: {
                    title: 'Error uploading new avatar',
                    content: 'You must upload an image file',
                }
            })
        }

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
