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
            this.ad = new Ad(ad);
            this.isLoading = false;
            this.cdr.detectChanges();
        });
    }

    onFinish(params) {
        this.api.adReproduced(this.ad.id).then((response: any) => {
            const user = this.context.getUser().getValue();
            if (!response) {
                const {timeToListenAnAdvertisement} = this.context.getConfig().getValue();
                const duration = params.duration * timeToListenAnAdvertisement;
                user.minutes += duration;
            }
            this.context.setUser(user);
        });
    }

    isEditable() {
        const user = this.context.getUser().getValue();
        return user && user.id === this.data.properties.actorId;
    }

}
