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

  dialog: MatDialog;
  siteEntity: Site;
  siteForm: FormGroup;

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<CreateSiteComponent>, 
    private context: ContextService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.siteForm = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required]),
      description: new FormControl(this.data.description, [Validators.required]),
    });
  }
  hasError(controlName: string, errorName: string) {
    return this.siteForm.controls[controlName].hasError(errorName);
  }

  onClose() {
    this.dialogRef.close();
  }

  saveSite(siteForm) {
    if (this.siteForm.valid && !this.data.id) {
      this.siteEntity = new Site();

      this.siteEntity.name = siteForm.name;
      this.siteEntity.description = siteForm.description;

      this.context.setSiteEntity(this.siteEntity);

      this.dialogRef.close();
      this.context.setIsMarkerSiteVisible(true);
      
    } else if (this.siteForm.valid && this.data.id) {
      const site = new Site(this.data);
      this.api.updateSite(site);
      this.onClose();
    }
  }

}
