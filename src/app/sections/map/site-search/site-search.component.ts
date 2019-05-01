import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ContextService} from '../../../services/context.service';
import {MatBottomSheetRef} from '@angular/material';
import {Site} from '../../../shared/models/Site';

@Component({
    selector: 'app-site-search',
    templateUrl: './site-search.component.html',
    styleUrls: ['./site-search.component.scss']
})
export class SiteSearchComponent implements OnInit, OnDestroy {

    isLoading = false;
    sites: any[] = [];
    sitesFound: any[] = [];
    term: string;

    constructor(
        private api: ApiService,
        private context: ContextService,
        private bottomSheetRef: MatBottomSheetRef<SiteSearchComponent>,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.api.getSites().then((response: Site[]) => {
            this.sites = response;
            this.isLoading = false;
            if (!this.cdr['destroyed']) {
                this.cdr.detectChanges();
            }
        });
    }

    ngOnDestroy() {
        this.cdr.detach();
    }

    searchSites($event) {
        this.term = $event.target ? $event.target.value : this.term;
        this.sitesFound = this.sites.filter((site: any) => {
            return site.name.toLowerCase().includes(this.term.toLowerCase()) ||
                site.description.toLowerCase().includes(this.term.toLowerCase());
        }).slice(0, 10);
    }


    onClose() {
        this.bottomSheetRef.dismiss();
    }

    flyTo(site) {
        const {latitude, longitude} = site;
        this.context.getMap().getValue().flyTo({
            center: [longitude, latitude]
        });
    }

    isSiteFoundAvailable() {
        return this.sitesFound && this.sitesFound.length !== 0 && !this.isLoading;
    }

}
