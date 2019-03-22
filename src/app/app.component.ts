import {Component, Inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AudioRecordService} from './services/audio-record.service';
import {Subscription} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ChooseAudioCategoryComponent} from './sections/record/components/choose-audio-category/choose-audio-category.component';

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
