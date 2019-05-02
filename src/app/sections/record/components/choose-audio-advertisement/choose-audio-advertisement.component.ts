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

    canPublishAsAudio() {
        let res = true;
        const user = this.context.getUser().getValue();
        if (user && user.minutes !== 0) {
            const record = this.context.getAdEntity().getValue();
            if (record.duration >= user.minutes) {
                res = false;
            }
        } else {
            res = false;
        }
        return res;
    }

    ngOnInit() {
    }
}
