import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ChooseAudioCategoryComponent} from '../choose-audio-category/choose-audio-category.component';
import {ChooseAdLocationComponent} from '../choose-ad-location/choose-ad-location.component';
import {ContextService} from 'src/app/services/context.service';

@Component({
    selector: 'app-choose-audio-advertisement',
    templateUrl: './choose-audio-advertisement.component.html',
    styleUrls: ['../choose-audio-category/choose-audio-category.component.scss'],
})
export class ChooseAudioAdvertisementComponent implements OnInit {

    initChooseAdLocation = false;

    constructor(
        public dialogRef: MatDialogRef<ChooseAudioAdvertisementComponent>,
        protected dialog: MatDialog,
        protected context: ContextService
    ) {
        dialogRef.backdropClick().subscribe(bool => {
            this.context.setIsRecorded(true);
        });
    }

    onClosed(): void {
        this.context.setIsRecorded(true);
        this.dialogRef.close();
    }

    clickAudio() {
        this.dialogRef.close();
        this.dialog.open(ChooseAudioCategoryComponent, {
            width: '350px',
        });
    }

    clickAdvert() {
        this.dialogRef.close();
        this.context.setIsMarkerAdVisible(true);
    }

    ngOnInit() {
    }
}
