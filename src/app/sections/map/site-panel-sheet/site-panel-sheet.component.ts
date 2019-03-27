import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {ApiService} from '../../../services/api.service';
import {Site} from '../../../shared/models/Site';

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
        Promise.all([
            this.api.getSiteAudios(this.data.properties.id),
            this.api.getSiteById(this.data.properties.id)
        ]).then(values => {
            this.audios = values[0];
            this.site = new Site(values[1]);
            this.loading = false;
        });
    }

    isLoading() {
        return this.loading;
    }

    closeSitePanel() {
        this.bottomSheetRef.dismiss();
    }

}
