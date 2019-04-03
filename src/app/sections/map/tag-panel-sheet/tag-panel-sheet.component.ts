import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ContextService } from 'src/app/services/context.service';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { SitePanelSheetComponent } from '../site-panel-sheet/site-panel-sheet.component';

@Component({
  selector: 'app-tag-panel-sheet',
  templateUrl: './tag-panel-sheet.component.html',
  styleUrls: ['./tag-panel-sheet.component.scss'],
})
export class TagPanelSheetComponent implements OnInit {

  tags: any;
  isLoading: boolean = true;

  constructor(
    private api: ApiService,
    private context: ContextService,
    private bottomSheetRef: MatBottomSheetRef<SitePanelSheetComponent>,
  ) {
    this.api.getConfiguration().then(data => {
      this.tags = data;
      this.isLoading = false;
    })
  }

  closeSitePanel() {
    this.bottomSheetRef.dismiss();
  }

  ngOnInit() {
  }
}
