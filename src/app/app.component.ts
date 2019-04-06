import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AudioRecordService} from './services/audio-record.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ContextService} from './services/context.service';
import {User} from './shared/models/User';
import {Subscription} from 'rxjs';
import {Router, Event, NavigationStart} from '@angular/router';
import {ApiService} from './services/api.service';
import {Config} from './shared/models/Config';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material';
import {ChooseAudioCategoryComponent} from './sections/record/components/choose-audio-category/choose-audio-category.component';
import {EditAudioComponent} from './sections/record/components/edit-audio/edit-audio.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    subscription: Subscription;
    auth: string;
    isLocationEnabled = false;

    isMicrophoneEnabled = false;

    constructor(private sanitizer: DomSanitizer,
                private audioRecord: AudioRecordService,
                private translate: TranslateService,
                private api: ApiService,
                private context: ContextService,
                private cookieService: CookieService,
                protected dialog: MatDialog) {

        this.dialog.open(EditAudioComponent, {
            width: '350px',
        });

        translate.setDefaultLang('en');

        this.api.getConfiguration().then((config: Config) => {
            this.context.setConfig(new Config(config));
        });

        let loggedUser: any = this.cookieService.get('user');
        if (loggedUser) {
            loggedUser = JSON.parse(loggedUser);
            this.context.setAuth(loggedUser.auth);
            this.auth = loggedUser.auth;
            this.context.setUser(new User(loggedUser.user));
        }

        this.subscription = this.context.getAuth().subscribe(auth => {
            this.auth = auth;
        });

        (navigator as any).permissions.query({name: 'microphone'}).then(permission => {
            this.isMicrophoneEnabled = permission.state !== 'denied';
            permission.addEventListener('change', (e) => {
                this.isMicrophoneEnabled = permission.state !== 'denied';
            });
        });

        (navigator as any).permissions.query({name: 'geolocation'}).then(permission => {
            this.isLocationEnabled = permission.state !== 'denied';
            permission.addEventListener('change', (e) => {
                this.isLocationEnabled = permission.state !== 'denied';
            });
        });
    }

    ngOnInit() {

    }

    switchLanguage(language: string) {
        this.translate.use(language);
    }

}
