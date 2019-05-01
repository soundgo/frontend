import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ContextService} from '../../../services/context.service';

@Component({
    selector: 'app-report-modal',
    templateUrl: './report-modal.component.html',
    styleUrls: ['./report-modal.component.scss']
})
export class ReportModalComponent implements OnInit {

    constructor(
        private api: ApiService,
        public dialogRef: MatDialogRef<ReportModalComponent>,
        private context: ContextService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    onClose(isReported = false) {
        this.dialogRef.close(isReported);
    }

    reportAudio() {
        this.api.reportAudio(this.data.audio).then(() => {
            this.onClose(true);
        });
    }

}
