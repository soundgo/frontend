import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {ApiService} from '../../../services/api.service';
import {ContextService} from '../../../services/context.service';

@Component({
    selector: 'app-site-panel-sheet',
    templateUrl: './site-panel-sheet.component.html',
    styleUrls: ['./site-panel-sheet.component.scss']
})
export class SitePanelSheetComponent {

    canRecord = false;

    constructor(private api: ApiService,
                private context: ContextService,
                private bottomSheetRef: MatBottomSheetRef<SitePanelSheetComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        this.canRecord = this.context.getAuth().getValue() !== null;
    }

    closeSitePanel() {
        this.bottomSheetRef.dismiss();
    }

}
