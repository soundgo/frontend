import {Component, Inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AudioRecordService} from './services/audio-record.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private sanitizer: DomSanitizer,
                private audioRecord: AudioRecordService,
                private translate: TranslateService) {
        translate.setDefaultLang('en');
    }

    switchLanguage(language: string) {
        this.translate.use(language);
    }

}
