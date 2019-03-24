import {Component, HostListener, OnInit} from '@angular/core';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {ContextService} from '../../../../services/context.service';
import {MatDialog} from '@angular/material';
import {AudioRecordComponent} from '../audio-record/audio-record.component';

@Component({
    selector: 'app-site-record',
    templateUrl: './site-record.component.html',
    styleUrls: ['./site-record.component.scss']
})
export class SiteRecordComponent extends AudioRecordComponent implements OnInit {

    @HostListener('click')
    click() {
        this.context.setIsRecording(true);
    }

    constructor(protected audioRecord: AudioRecordService,
                protected context: ContextService,
                protected dialog: MatDialog
    ) {
        super(audioRecord, context, dialog);
    }

    ngOnInit() {
    }

}
