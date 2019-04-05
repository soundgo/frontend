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
        console.log(this.context.getUser().getValue())
        // Si eres usuario y ademas es creado por ti
        if((this.context.getAuth().getValue() == 'user' || this.context.getAuth().getValue() == 'advertiser') && this.context.getUser().getValue().nickname == this.record.name){
            console.log('Entra')
            this.api.deleteAudio(audioParam);
            // Quito modal activo y podria mostrar otro modal diciendo que se ha eliminado correctamente.
        }else if(this.context.getAuth().getValue() == 'advertiser' && this.context.getUser().getValue().name == this.record.name){
        //     // Si eres anunciante y ademas es tu anuncio
            this.api.updateAd(audioParam);
        }
    }

}
