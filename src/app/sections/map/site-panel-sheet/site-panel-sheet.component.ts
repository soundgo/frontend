import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {ApiService} from '../../../services/api.service';

@Component({
    selector: 'app-site-panel-sheet',
    templateUrl: './site-panel-sheet.component.html',
    styleUrls: ['./site-panel-sheet.component.scss']
})
export class SitePanelSheetComponent {

    constructor(private api: ApiService,
                private bottomSheetRef: MatBottomSheetRef<SitePanelSheetComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    }

    closeSitePanel() {
        this.bottomSheetRef.dismiss();
    }

}
