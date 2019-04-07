import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {Ad} from '../../../shared/models/Ad';
import {ContextService} from '../../../services/context.service';

@Component({
    selector: 'app-ad-reproducer-panel',
    templateUrl: './ad-reproducer-panel.component.html',
})
export class AdReproducerPanelComponent implements OnInit, OnDestroy {

    ad: Ad;
    properties: any;
    isLoading = false;

    constructor(private api: ApiService,
                private context: ContextService,
                private cdr: ChangeDetectorRef,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        this.properties = data.properties;
    }

    ngOnDestroy() {
        this.cdr.detach();
    }

    ngOnInit() {
        this.isLoading = true;
        this.api.getAdById(this.data.properties.id).then((ad: Ad) => {
            this.ad = ad;
            this.isLoading = false;
            this.cdr.detectChanges();
        });
    }

    onFinish(params) {
        const user = this.context.getUser().getValue();
        if (params.username !== user.nickname) {
            this.api.adReproduced(this.ad.id);
            user.minutes += params.duration;
            this.context.setUser(user);
        }
    }

    isEditable() {
        const user = this.context.getUser().getValue();
        return user && user.id === this.data.properties.actorId;
    }

}
