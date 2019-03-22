import {Component, Inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ChooseAudioCategoryComponent } from './choose-audio-category/choose-audio-category.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(public dialog: MatDialog, private translate: TranslateService) {
        translate.setDefaultLang('en');
    }

    switchLanguage(language: string) {
        this.translate.use(language);
    }
    
    openDialogChooseAudioCategory(): void {
        const dialogRef = this.dialog.open(ChooseAudioCategoryComponent, {
            width: '50%',
            height: '40%',
        });
      }

}
