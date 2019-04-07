import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
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
export class SitePanelSheetComponent implements OnInit, OnDestroy {

    canRecord = false;
    isEditing = false;
    isRemoving = false;

    site: any;
    audios: any;

    isLoading = true;


    constructor(private context: ContextService,
                protected dialog: MatDialog,
                private bottomSheetRef: MatBottomSheetRef<SitePanelSheetComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
                private cdr: ChangeDetectorRef,
                private api: ApiService) {
        this.canRecord = this.context.getAuth().getValue() !== null;
    }

    ngOnDestroy() {
        this.cdr.detach();
    }

    ngOnInit() {
        this.isLoading = true;
        const categorySelected = this.context.getCategoriesSelected().getValue();
        if (categorySelected) {
            Promise.all([
                this.api.getSiteAudios(this.data.properties.id),
                this.api.getSiteById(this.data.properties.id)
            ]).then(values => {
                this.audios = values[0];
                this.site = values[1];
                this.isLoading = false;
                this.cdr.detectChanges();
            });
        } else {
            this.api.getSiteById(this.data.properties.id).then(site => {
                this.audios = [];
                this.site = site;
                this.isLoading = false;
                this.cdr.detectChanges();
            });
        }
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
            data: {
                site: this.site
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this.site = result;
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
                entity: this.site,
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
            return audio.actor === this.context.getUser().getValue().id;
        } else {
            return false;
        }
    }

    deleteAudio(audioId: number, index: number) {
        this.api.deleteAudio(audioId);
        this.audios.splice(index, 1);
    }

}
