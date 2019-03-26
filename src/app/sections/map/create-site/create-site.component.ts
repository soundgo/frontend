import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ContextService } from '../../../services/context.service';
import { Site } from 'src/app/shared/models/Site';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit {

  dialog: MatDialog;
  siteEntity: Site;
  name: string;
  description: string;

  constructor(public dialogRef: MatDialogRef<CreateSiteComponent>, private context: ContextService) { }

  ngOnInit() {
  }
  public showCreateSiteModal() {
    this.dialog.open(CreateSiteComponent, {
      width: '350px',
    })
  }
  onClose() {
    this.dialogRef.close();
  }

  saveModal() {
    this.siteEntity = new Site();
    this.siteEntity.name = this.name;
    this.siteEntity.description = this.description;

    this.context.setSiteEntity(this.siteEntity);

    this.dialogRef.close();
    this.context.setIsMarkerSiteVisible(true);
  }

}
