import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AudioRecordService} from './services/audio-record.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ContextService} from './services/context.service';
import {User} from './shared/models/User';
import {Subscription} from 'rxjs';
import {Router, Event, NavigationStart} from '@angular/router';

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
                private context: ContextService,
                private router: Router) {
        translate.setDefaultLang('en');
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                const {url} = event;
                if (url === '/' || url === '/user') {
                    const user = new User({
                        id: 1,
                        photo: 'https://pbs.twimg.com/profile_images/1081695212857118720/hvcEAK8s_bigger.jpg',
                        email: 'sergioclebal@gmail.com',
                        minutes: 10
                    });
                    this.context.setUser(user);
                    this.context.setAuth('user');
                } else {
                    const user = new User({
                        id: 2,
                        photo: 'https://goo.gl/RhBCq6',
                        email: 'pedrobertor@gmail.com',
                        minutes: 7.5
                    });
                    this.context.setUser(user);
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
