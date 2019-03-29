import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ContextService } from '../../../services/context.service';
import { Site } from 'src/app/shared/models/Site';

import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit {

  dialog: MatDialog;
  siteEntity: Site;
  siteForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateSiteComponent>, private context: ContextService) { }

  ngOnInit() {
    this.siteForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }
  hasError(controlName: string, errorName: string) {
    return this.siteForm.controls[controlName].hasError(errorName);
  }

  onClose() {
    this.dialogRef.close();
  }

  saveSite(siteForm) {
    if (this.siteForm.valid) {
      this.siteEntity = new Site();

      this.siteEntity.name = siteForm.name;
      this.siteEntity.description = siteForm.description;

      this.context.setSiteEntity(this.siteEntity);

      this.dialogRef.close();
      this.context.setIsMarkerSiteVisible(true);
    }
  }

}
