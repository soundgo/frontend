import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ContextService} from '../../../../services/context.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-site-record',
    templateUrl: './site-record.component.html',
    styleUrls: ['./site-record.component.scss']
})
export class SiteRecordComponent implements OnInit {

    @Input() siteId: number;
    isRecording = false;

    subscription: Subscription;

    constructor(protected context: ContextService) {
        this.subscription = this.context.getIsRecordingAudio().subscribe(isRecording => {
            this.isRecording = isRecording;
        });
    }

    ngOnInit() {
    }

    startReproduction() {
        this.context.setSiteId(this.siteId);

        if (this.context.getAuth().getValue() === 'user') {
            this.context.setIsRecordingAudio(true);
        } else {
            this.context.setIsRecordingAd(true);
        }
    }

}
