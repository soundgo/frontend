import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ContextService } from '../../../services/context.service';



@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateSiteComponent>) { }

  ngOnInit() {
  }
  showMarkerSite() {

  }
  saveSite() {
    this.dialogRef.close();
  }

}
