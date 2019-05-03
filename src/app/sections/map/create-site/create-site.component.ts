import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContextService } from '../../../services/context.service';
import { Site } from 'src/app/shared/models/Site';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-create-site',
    templateUrl: './create-site.component.html',
    styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit {

    siteEntity: Site;
    siteForm: FormGroup;

    constructor(
        private api: ApiService,
        public dialogRef: MatDialogRef<CreateSiteComponent>,
        private context: ContextService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
    // , Validators.pattern('/^(\w.+\S+)$/')
    ngOnInit() {
        this.siteForm = new FormGroup({
            name: new FormControl(this.data.site.name || '', [Validators.required, Validators.maxLength(200)]),
            description: new FormControl(this.data.site.description || '', [Validators.required, Validators.maxLength(200)]),
        });
    }

    hasError(controlName: string, errorName: string) {
        return this.siteForm.controls[controlName].hasError(errorName);
    }

    onClose() {
        this.dialogRef.close();
    }

    saveSite(siteForm) {
        if (this.siteForm.valid && !this.data.site.name) {
            this.siteEntity = new Site();

            this.siteEntity.name = siteForm.name;
            this.siteEntity.description = siteForm.description;

            this.context.setSiteEntity(this.siteEntity);

            this.dialogRef.close(this.siteEntity);
            this.context.setIsMarkerSiteVisible(true);

        } else if (this.siteForm.valid && this.data.site.name) {
            const site = new Site(this.data.site);
            site.name = siteForm.name;
            site.description = siteForm.description;
            this.api.updateSite(site);
            this.dialogRef.close(site);
        }
    }

}
