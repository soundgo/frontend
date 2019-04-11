import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {MaterialModule} from '../../material.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';
import {CookieService} from 'ngx-cookie-service';
import {ProfileComponent} from './components/profile/profile.component';
import {CreateCreditCardComponent} from './components/create-credit-card/create-credit-card.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const components = [
    LoginComponent,
    ProfileComponent,
    CreateCreditCardComponent,
    SignUpComponent,
    EditProfileComponent
];

@NgModule({
    declarations: [...components],
    entryComponents: [...components],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        })
    ],
    providers: [CookieService],
    exports: [...components],
})
export class AccountModule {
}
