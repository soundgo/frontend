import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Audio} from '../../models/Audio';
import {Ad} from '../../models/Ad';
import { ContextService } from 'src/app/services/context.service';
import { Subscription } from 'rxjs';
import {User} from '../../../shared/models/User';
import {ApiService} from 'src/app/services/api.service';

@Component({
    selector: 'app-reproducer',
    templateUrl: './reproducer.component.html',
    styleUrls: ['./reproducer.component.scss']
})
export class ReproducerComponent implements OnInit {

    @Input() record: Audio | Ad;
    @Input() isAdvertiser = false;
    @Input() isAudio = false;
    @Output() finishAction = new EventEmitter<any>();
    @Output() startAction = new EventEmitter<any>();

    isReported:boolean;
    user: User;
    subscription: Subscription = new Subscription();

    constructor(protected context: ContextService, protected api: ApiService) {
        this.subscription.add(this.context.getUser().asObservable().subscribe(user => {
            this.user = user;
        }));
    }

    ngOnInit() {
    }

    onStart() {
        if (this.startAction) {
            this.startAction.emit({});
        }
    }

    onFinish(params) {
        const { timeToListenAnAdvertisement } = this.context.getConfig().getValue();
        this.record.numberReproductions = this.record.numberReproductions + 1;
        const duration = (params.currentTarget.children[1].duration * timeToListenAnAdvertisement);
        if (this.finishAction) {
            this.finishAction.emit({duration});
        }
    }

    report():void {
        this.isReported=true;
        const audio = this.record as Audio;
        audio.reported = true;
        audio.numberReports = audio.numberReports+1;
        this.record = audio;
        this.api.reportAudio(audio);
    }


}
