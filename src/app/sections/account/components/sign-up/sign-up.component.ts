import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {User} from '../../../../shared/models/User';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContextService} from '../../../../services/context.service';
import {ApiService} from '../../../../services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  dialog: MatDialog;
  userEntity: User;
  userForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<SignUpComponent>,
      private context: ContextService,
      private api: ApiService) { 
          this.userForm = new FormGroup({
              nickname: new FormControl('', [Validators.required]),
              email: new FormControl('', [Validators.required, Validators.email,]),
              password: new FormControl('', [Validators.required]),
          });
  }

  hasError(controlName: string, errorName: string) {
    return this.userForm.controls[controlName].hasError(errorName);
}

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

  saveUser(userForm) {
    if (this.userForm.valid) {
      this.userEntity = new User();

      this.userEntity.nickname = userForm.nickname;
      this.userEntity.email = userForm.email;
      this.userEntity.password = userForm.password;

      this.api.createUser(this.userEntity);

      this.onClose();
    }
}

}
