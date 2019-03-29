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

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    subscription: Subscription;

    constructor(private sanitizer: DomSanitizer,
                private audioRecord: AudioRecordService,
                private translate: TranslateService,
                private api: ApiService,
                private context: ContextService,
                private router: Router) {

        translate.setDefaultLang('en');

        this.api.getConfiguration().then((config: Config) => {
            this.context.setConfig(new Config(config));
        });

        this.router.events.subscribe(async (event: Event) => {
            if (event instanceof NavigationStart) {
                const {url} = event;
                if (url === '/' || url === '/user') {
                    const user = await this.api.getActorByName('manuel');
                    this.context.setUser(new User(user));
                    this.context.setAuth('user');
                } else {
                    const user = await this.api.getActorByName('carlos');
                    this.context.setUser(new User(user));
                    this.context.setAuth('advertiser');
                }
            }
        });
    }

    ngOnInit() {

    }

    switchLanguage(language: string) {
        this.translate.use(language);
    }

}
