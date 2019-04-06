import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {Ad} from '../../../shared/models/Ad';
import {ContextService} from '../../../services/context.service';

@Component({
    selector: 'app-ad-reproducer-panel',
    templateUrl: './ad-reproducer-panel.component.html',
})
export class AdReproducerPanelComponent implements OnInit {

    ad: Ad;
    properties: any;

    constructor(private api: ApiService,
                private context: ContextService,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        this.ad = data.ad;
        this.properties = data.properties;
    }

    ngOnInit() {
    }

    onFinish(params) {
        const user = this.context.getUser().getValue();
        if (params.username !== user.name) {
            this.api.adReproduced(this.ad.id);
            user.minutes += params.duration;
            this.context.setUser(user);
        }
    }

    isEditable() {
        const user = this.context.getUser().getValue();
        return user.id === this.data.properties.actorId;
    }

}
