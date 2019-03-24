import {Component, HostListener, Input, OnInit} from '@angular/core';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {ContextService} from '../../../../services/context.service';
import {MatDialog} from '@angular/material';
import {AudioRecordComponent} from '../audio-record/audio-record.component';
import {ApiService} from '../../../../services/api.service';

@Component({
    selector: 'app-site-record',
    templateUrl: './site-record.component.html',
    styleUrls: ['./site-record.component.scss']
})
export class SiteRecordComponent extends AudioRecordComponent implements OnInit {

    @Input() siteId: number;

    @HostListener('click')
    click() {
        this.context.setIsRecording(true);
    }

    constructor(protected audioRecord: AudioRecordService,
                protected context: ContextService,
                protected dialog: MatDialog,
                protected api: ApiService,
    ) {
        super(audioRecord, context, dialog, api);
        this.isSite = true;
    }

    ngOnInit() {
    }

}
