import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog} from '@angular/material';
import {ContextService} from '../../../services/context.service';
import { CreateSiteComponent } from '../create-site/create-site.component';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

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
        console.log(data)
    }

    closeSitePanel() {
        this.bottomSheetRef.dismiss();
    }

    isEditable() {
        const user = this.context.getUser().getValue();
        return user && user.id === this.data.properties.actorId;
    }

    editSite() {
        this.dialog
                .open(CreateSiteComponent, {
                    width: '350px',
                    data: this.data 
                });
    }

    deleteSite() {
        this.dialog
                .open(DeleteModalComponent, {
                    width: '350px',
                    data: {
                        entity: this.data.site,
                        entityType: 'site'
                    }
                });
    }

}
