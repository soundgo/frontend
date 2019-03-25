import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {ApiService} from '../../../services/api.service';

@Component({
    selector: 'app-site-panel-sheet',
    templateUrl: './site-panel-sheet.component.html',
    styleUrls: ['./site-panel-sheet.component.scss']
})
export class SitePanelSheetComponent implements OnInit {
    loading = false;
    audios: any;

    constructor(private api: ApiService,
                private bottomSheetRef: MatBottomSheetRef<SitePanelSheetComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        this.loadAudios();
    }

    ngOnInit() {
    }

    loadAudios() {
        this.loading = true;
        this.api.getSiteAudios(this.data.properties.id).then(audios => {
            this.loading = false;
            this.audios = audios;
        });
    }

    closeSitePanel() {
        this.bottomSheetRef.dismiss();
    }

}
