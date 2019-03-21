import { Component, Inject } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ChooseAudioAdvertisementComponent } from './choose-audio-advertisement/choose-audio-advertisement.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private translate: TranslateService, public dialog: MatDialog) {
        translate.setDefaultLang('en');
    }

    switchLanguage(language: string) {
        this.translate.use(language);
    }

    openDialog(): void {
        // Comprobamos que el usuario logeado es un anunciante. Si lo es mostramos el modal en otro caso no permitimos que se muestre
        const dialogRef = this.dialog.open(ChooseAudioAdvertisementComponent, {
          width: '50%',
          height: '40%',
        });
      }
}
