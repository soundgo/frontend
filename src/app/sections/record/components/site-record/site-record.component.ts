import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ContextService} from '../../../../services/context.service';

@Component({
    selector: 'app-site-record',
    templateUrl: './site-record.component.html',
    styleUrls: ['./site-record.component.scss']
})
export class SiteRecordComponent implements OnInit {

    @Input() siteId: number;

    @HostListener('click')
    click() {
        this.context.setSiteId(this.siteId);

        if (this.context.getAuth().getValue() == 'user') {
            this.context.setIsRecordingAudio(true);
        } else {
            this.context.setIsRecordingAd(true);
        }
    }

    constructor(protected context: ContextService) {}

    ngOnInit() {}

}
