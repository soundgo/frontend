import {Component, Inject} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-like-modal',
    templateUrl: './like-modal.component.html',
    styleUrls: ['./like-modal.component.scss']
})
export class LikeModalComponent {

    constructor(
        private api: ApiService,
        public dialogRef: MatDialogRef<LikeModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onClose(isLiked = false) {
        this.dialogRef.close(isLiked);
    }

    likeAudio() {
        this.api.likeAudio(this.data.audio).then(() => {
            this.onClose(true);
        });
    }
}
