import { Component, EventEmitter, OnInit, Inject, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { CreateSiteComponent } from 'src/app/sections/map/create-site/create-site.component';
import { ContextService } from 'src/app/services/context.service';
import { Ad } from '../../models/Ad';
import { AudioReproducerPanelComponent } from 'src/app/sections/map/audio-reproducer-panel/audio-reproducer-panel.component';
import { Site } from '../../models/Site';
import { CreateCreditCardComponent } from 'src/app/sections/account/components/create-credit-card/create-credit-card.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

    dialog: MatDialog;

    constructor(
        private api: ApiService,
        public dialogRef: MatDialogRef<CreateSiteComponent>,
        public dialogDeleteRef: MatDialogRef<DeleteModalComponent>,
        private cookieService: CookieService,
        public dialogBottomSheetRef: MatDialogRef<AudioReproducerPanelComponent>,
        private context: ContextService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    onClose(isDeleted = false) {
        this.dialogRef.close(isDeleted);
    }

    deleteEntity() {
        if (this.data && this.data.entityType === 'audio') {
            this.dialogBottomSheetRef.close();
            this.api.deleteAudio(this.data.entity);
            this.onClose(true);
        } else if (this.data && this.data.entityType === 'ad') {
            const ad = new Ad(this.data.entity);
            ad.isDelete = true;
            this.api.updateAd(ad);
            this.onClose(true);
        } else if (this.data && this.data.entityType === 'site') {
            this.api.deleteSite(this.data.entity);
            this.onClose(true);
        } else if (this.data && this.data.entityType === 'creditcard') {
            this.api.updateCreditCard(this.data.entity.id, this.data.entity).then(() => {
                console.log('Credit card deleted', this.data.entity);
                this.dialogDeleteRef.close()
                this.context.setAuth('user');
                this.cookieService.set('user', JSON.stringify({
                    user: this.context.getUser().getValue(),
                    auth: 'user'
                  }));
                this.onClose(true);
            });
        }
    }
}
