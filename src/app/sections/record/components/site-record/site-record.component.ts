import {Component, HostListener, Input, OnInit} from '@angular/core';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {ContextService} from '../../../../services/context.service';
import {MatBottomSheetRef, MatDialog} from '@angular/material';
import {AudioRecordComponent} from '../audio-record/audio-record.component';
import {ApiService} from '../../../../services/api.service';
import {SitePanelSheetComponent} from '../../../map/site-panel-sheet/site-panel-sheet.component';

@Component({
    selector: 'app-site-record',
    templateUrl: './site-record.component.html',
    styleUrls: ['./site-record.component.scss']
})
export class SiteRecordComponent implements OnInit {

    @Input() siteId: number;

    @HostListener('click')
    click() {
        this.context.setIsRecording(true);
        this.context.setRecordType('site');
        this.context.setSiteId(this.siteId);
    }

    constructor(protected context: ContextService) {
    }

    ngOnInit() {
    }

}
