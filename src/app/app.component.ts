import {Component, OnInit, ViewChildren, AfterViewInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AudioRecordService} from './services/audio-record.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ContextService} from './services/context.service';
import {User} from './shared/models/User';
import {Subscription} from 'rxjs';
import {ApiService} from './services/api.service';
import {Config} from './shared/models/Config';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {

    @ViewChildren('adblock') adblock: any;
    subscription: Subscription;
    auth: string;
    isLocationEnabled = false;
    isAdBlockEnabled: boolean = true;


    isMicrophoneEnabled = false;

    constructor(private sanitizer: DomSanitizer,
                private audioRecord: AudioRecordService,
                private translate: TranslateService,
                private api: ApiService,
                private context: ContextService,
                private cookieService: CookieService,
                protected dialog: MatDialog,
                private cdr: ChangeDetectorRef) {

        translate.setDefaultLang('en');

        this.api.getConfiguration().then((config: Config) => {
            this.context.setConfig(new Config(config));
        });

        let loggedUser: any = this.cookieService.get('user');
        if (loggedUser) {
            loggedUser = JSON.parse(loggedUser);
            this.context.setAuth(loggedUser.auth);
            this.auth = loggedUser.auth;
            const user = new User(loggedUser.user);
            this.context.setUser(user);
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

    ngOnDestroy() {
        this.cdr.detach();
    }
    
    ngAfterViewInit() {
        const heightAdblock = this.adblock.first.nativeElement.offsetHeight;
        this.isAdBlockEnabled = heightAdblock === 0 ?  true : false;
        console.log(this.isAdBlockEnabled, 'hola')
        if (!this.cdr['destroyed']) {
            this.cdr.detectChanges();
        }
    }

    switchLanguage(language: string) {
        this.translate.use(language);
    }

}
