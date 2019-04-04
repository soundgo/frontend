import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Audio} from '../../models/Audio';
import {Ad} from '../../models/Ad';
import { ContextService } from 'src/app/services/context.service';
import {ApiService} from '../../../services/api.service';
import {CookieService} from 'ngx-cookie-service';
import { User } from '../../models/User';

@Component({
    selector: 'app-reproducer',
    templateUrl: './reproducer.component.html',
    styleUrls: ['./reproducer.component.scss']
})
export class ReproducerComponent implements OnInit {

    @Input() actorId: any;
    @Input() record: Audio | Ad;
    @Input() isAdvertiser = false;
    @Output() finishAction = new EventEmitter<any>();
    @Output() startAction = new EventEmitter<any>();
    activeButton = true;

    constructor(protected context: ContextService, private api: ApiService) {
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

    deleteAudio(audioParam){
        this.activeButton = false;
        console.log(audioParam);
        console.log(this.actorId)
        // Si eres usuario y ademas es creado por ti
        if(this.context.getAuth().getValue() == 'user' && audioParam.actor.id == this.context.getUser().getValue().id){
            this.api.deleteAudio(audioParam);
        }else if(this.context.getAuth().getValue() == 'advertiser' && audioParam.actor.id == this.context.getUser().getValue().id){
            // Si eres anunciante y ademas es tu anuncio
            this.api.updateAd(audioParam);
        }
    }

}
