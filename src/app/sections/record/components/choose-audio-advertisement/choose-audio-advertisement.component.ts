import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ChooseAudioCategoryComponent} from '../choose-audio-category/choose-audio-category.component';

@Component({
    selector: 'app-choose-audio-advertisement',
    templateUrl: './choose-audio-advertisement.component.html',
    styleUrls: ['../choose-audio-category/choose-audio-category.component.scss']
})
export class ChooseAudioAdvertisementComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ChooseAudioAdvertisementComponent>, public dialog: MatDialog) {
    }

    onClose(): void {
        this.dialogRef.close();
    }

    clickAudio() {
        this.onClose();
        this.dialog.open(ChooseAudioCategoryComponent, {
            width: '50%',
            height: '40%',
        });
    }

    clickAdvert() {
        this.onClose();
    }

    ngOnInit() {
    }

}
