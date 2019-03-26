import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {ApiService} from '../../../services/api.service';
import {Site} from '../../../shared/models/Site';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-site-panel-sheet',
    templateUrl: './site-panel-sheet.component.html',
    styleUrls: ['./site-panel-sheet.component.scss']
})
export class SitePanelSheetComponent implements OnInit {

    loading = false;
    audios: any;
    site: Site;

    constructor(private api: ApiService,
                private bottomSheetRef: MatBottomSheetRef<SitePanelSheetComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    }

    ngOnInit() {
        this.loading = true;
        this.loadAudios().then(audios => {
            this.audios = audios;
        });
        this.api.getSiteById(this.data.properties.id).then(site => {
            this.site = new Site(site);
            this.loading = false;
        });
    }

    isLoading() {
        return this.loading;
    }

    loadAudios() {
        return this.api.getSiteAudios(this.data.properties.id);
    }

    closeSitePanel() {
        this.bottomSheetRef.dismiss();
    }

}
