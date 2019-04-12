import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {User} from '../../../../shared/models/User';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContextService} from '../../../../services/context.service';
import {ApiService} from '../../../../services/api.service';
import {LoginComponent} from '../login/login.component';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    userEntity: User;
    userForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<SignUpComponent>,
                private context: ContextService,
                private api: ApiService,
                protected dialog: MatDialog,
                private cookieService: CookieService) {
        this.userForm = new FormGroup({
            nickname: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email,]),
            password: new FormControl('', [Validators.required]),
            rgpd: new FormControl('', [Validators.requiredTrue]),
        });
    }

    hasError(controlName: string, errorName: string) {
        return this.userForm.controls[controlName].hasError(errorName);
    }

    ngOnInit() {
    }

    onClose() {
        this.dialogRef.close();
        this.dialog.open(LoginComponent, {
            width: '350px'
        });
    }

    saveUser(userForm) {
        if (this.userForm.valid) {
            this.userEntity = new User();

            this.userEntity.nickname = userForm.nickname;
            this.userEntity.email = userForm.email;
            this.userEntity.password = userForm.password;

            this.api.createUser(this.userEntity).then((response: any) => {
                this.api.login(this.userEntity).then((responseLogin: any) => {
                    this.userEntity.photo = response.photo;
                    this.userEntity.minutes = response.minutes;
                    this.userEntity.token = responseLogin.token;
                    this.context.setUser(this.userEntity);
                    this.context.setAuth(responseLogin.role);
                    this.cookieService.set('user', JSON.stringify({
                        user: this.userEntity,
                        auth: responseLogin.role
                    }));
                    this.dialogRef.close();
                });
            });

        }
    }

}
