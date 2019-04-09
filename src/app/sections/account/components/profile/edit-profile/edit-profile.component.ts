import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ContextService} from 'src/app/services/context.service';
import { User } from 'src/app/shared/models/User';
import {ApiService} from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  userEntity: User;

  constructor(private api: ApiService, public dialogRef: MatDialogRef<EditProfileComponent>, protected dialog: MatDialog,
    private context: ContextService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      nickname: new FormControl(this.data.user.nickname || '', [Validators.required]),
      email: new FormControl(this.data.user.email || '', [Validators.required,Validators.email, Validators.pattern("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")]),
      password: new FormControl(this.data.user.password || '', [Validators.required]),
    });
  console.log(this.data.user);
  }

  hasError(controlName: string, errorName: string) {
    return this.profileForm.controls[controlName].hasError(errorName);
  }

  onClose() {
      this.dialogRef.close();
  }

  saveProfile(profileForm) {
    // TODO: Comprobar que el nickname no esta en uso y validación de email mejor
    if(this.profileForm.valid) {
      
      const user = new User(this.data.user);
      user.nickname = profileForm.nickname;
      user.email = profileForm.email;
      user.password = profileForm.password;

      this.userEntity = new User();
      this.userEntity.nickname = profileForm.nickname;
      this.userEntity.password = profileForm.password;

      this.api.updateProfile(user, this.data.user.nickname).then((response:any) => {
        console.log(response);
        
      });
      this.api.login(this.userEntity).then((response: any) => {
        user.token = response.token;
      });
      
      this.context.setUser(user);
      this.dialogRef.close(user);
    }
}
}
