import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog} from '@angular/material';
import {ContextService} from '../../../services/context.service';
import {CreateSiteComponent} from '../create-site/create-site.component';
import {DeleteModalComponent} from 'src/app/shared/components/delete-modal/delete-modal.component';
import {ApiService} from '../../../services/api.service';

@Component({
    selector: 'app-site-panel-sheet',
    templateUrl: './site-panel-sheet.component.html',
    styleUrls: ['./site-panel-sheet.component.scss']
})
export class SitePanelSheetComponent {

    canRecord = false;
    isEditing = false;
    isRemoving = false;

    constructor(private context: ContextService,
                protected dialog: MatDialog,
                private bottomSheetRef: MatBottomSheetRef<SitePanelSheetComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
                private cdr: ChangeDetectorRef,
                private api: ApiService) {
        this.canRecord = this.context.getAuth().getValue() !== null;
    }

    closeSitePanel() {
        this.bottomSheetRef.dismiss();
    }

    isEditable() {
        const user = this.context.getUser().getValue();
        return user && user.id === this.data.properties.actorId;
    }

    editSite() {
        this.isEditing = true;
        this.dialog.open(CreateSiteComponent, {
            width: '350px',
            data: this.data
        }).afterClosed().subscribe(result => {
            if (result) {
                this.data.site = result;
                this.isEditing = false;
                this.cdr.detectChanges();
            }
        });
    }

    deleteSite() {
        this.isRemoving = false;
        this.dialog.open(DeleteModalComponent, {
            width: '350px',
            data: {
                entity: this.data.site,
                entityType: 'site'
            }
        }).afterClosed().subscribe(() => {
            this.isRemoving = false;
            this.bottomSheetRef.dismiss();
        });
    }

    isCreatedByLoggedUser(audio) {
        const user = this.context.getUser().getValue();
        if (user) {
            return audio.actor === this.context.getUser().getValue().id
        } else {
            return false;
        }
    }

    deleteAudio(audioId: number, index: number) {
        this.api.deleteAudio(audioId);
        this.data.audios.splice(index, 1);
    }

}
