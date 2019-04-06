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
  
  tags: Array<string>;
  tagsSelected: Array<any> = ['1', '2', '3'];
  isLoading: boolean = true;

  constructor(
    private api: ApiService,
    private context: ContextService,
    private bottomSheetRef: MatBottomSheetRef<SitePanelSheetComponent>
  ) {
    this.api.getTags().then(data => {
      console.log('Tags', data)
      this.isLoading = false;
    });
  }

  isActive(tag) {
    for (let t of this.tagsSelected) {
      if (t === tag) return true;
    }
    return false;
  }

  selectTag(tag) {
    let tags = this.tagsSelected;

    if (this.isActive(tag))
      tags = this.remove(tags, tag);
    else 
      tags.push(tag);

    this.tagsSelected = tags;
    console.log(tags, tags.length);
    // this.context.setTagsSelected(tags.toString());
  }

  remove(array, value) {
    const idx = array.indexOf(value);
    if (idx > -1) {
      array.splice(idx, 1);
    }
    return array;
  }

  closeTagPanel() {
    this.bottomSheetRef.dismiss();
  }

  ngOnInit() {}
}
