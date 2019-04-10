import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {User} from '../../../../shared/models/User';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContextService} from '../../../../services/context.service';
import {ApiService} from '../../../../services/api.service';
import {CookieService} from 'ngx-cookie-service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    dialog: MatDialog;
    userEntity: User;
    userForm: FormGroup;
    showBadCredentials = false;

    constructor(public dialogRef: MatDialogRef<LoginComponent>,
                private context: ContextService,
                private matDialog: MatDialog,
                private api: ApiService,
                private cookieService: CookieService) {
        this.userForm = new FormGroup({
            nickname: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit() {
    }

    hasError(controlName: string, errorName: string) {
        return this.userForm.controls[controlName].hasError(errorName);
    }

    onClose() {
        this.dialogRef.close();
    }

    saveUser(userForm) {
        if (this.userForm.valid) {
            this.showBadCredentials = false;
            this.userEntity = new User();

            this.userEntity.nickname = userForm.nickname;
            this.userEntity.password = userForm.password;

            this.api.login(this.userEntity).then((response: any) => {
                if (response.non_field_errors || response.role === 'admin') {
                    this.showBadCredentials = true;
                } else {
                    this.api.getActorByName(this.userEntity.nickname, response.token).then(user => {
                        const userToSave = new User(user);
                        userToSave.id = response.actorId;
                        userToSave.token = response.token;
                        this.context.setUser(userToSave);
                        this.context.setAuth(response.role);
                        this.cookieService.set('user', JSON.stringify({
                            user: userToSave,
                            auth: response.role
                        }));
                        this.dialogRef.close();
                    });
                }
            });
        }
        console.log(userForm);
    }

    signUp() {
        this.onClose();
        this.matDialog.open(SignUpComponent, {
            width: '350px'
        });
    }
}
