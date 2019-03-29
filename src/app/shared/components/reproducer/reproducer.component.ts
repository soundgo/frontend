import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Audio} from '../../models/Audio';
import {Ad} from '../../models/Ad';
import { ContextService } from 'src/app/services/context.service';

@Component({
    selector: 'app-reproducer',
    templateUrl: './reproducer.component.html',
    styleUrls: ['./reproducer.component.scss']
})
export class ReproducerComponent implements OnInit {

    @Input() record: Audio | Ad;
    @Input() isAdvertiser = false;
    @Output() finishAction = new EventEmitter<any>();
    @Output() startAction = new EventEmitter<any>();

    constructor(protected context: ContextService) {
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


}
