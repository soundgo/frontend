import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog} from '@angular/material';
import {ContextService} from '../../../services/context.service';

@Component({
    selector: 'app-site-panel-sheet',
    templateUrl: './site-panel-sheet.component.html',
    styleUrls: ['./site-panel-sheet.component.scss']
})
export class SitePanelSheetComponent {

    canRecord = false;

    constructor(private context: ContextService,
                protected dialog: MatDialog,
                private bottomSheetRef: MatBottomSheetRef<SitePanelSheetComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        this.canRecord = this.context.getAuth().getValue() !== null;
    }

    closeSitePanel() {
        this.bottomSheetRef.dismiss();
    }

}
