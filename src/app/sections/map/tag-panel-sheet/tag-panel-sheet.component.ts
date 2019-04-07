import {Component, OnInit, Inject, ChangeDetectorRef} from '@angular/core';
import {ApiService} from 'src/app/services/api.service';
import {ContextService} from 'src/app/services/context.service';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {SitePanelSheetComponent} from '../site-panel-sheet/site-panel-sheet.component';

@Component({
    selector: 'app-tag-panel-sheet',
    templateUrl: './tag-panel-sheet.component.html',
    styleUrls: ['./tag-panel-sheet.component.scss'],
})
export class TagPanelSheetComponent implements OnInit {

    tags: string[] = [];
    tagsSelected: string[] = [];
    isLoading = true;

    constructor(
        private api: ApiService,
        private context: ContextService,
        private bottomSheetRef: MatBottomSheetRef<SitePanelSheetComponent>,
        private cdr: ChangeDetectorRef
    ) {

    }

    ngOnInit() {
        this.api.getTags().then((data: any[]) => {
            this.tags = data.map(tag => tag.name);
            const alreadySelectedTags = this.context.getTagsSelected().getValue();
            if (alreadySelectedTags) {
                this.tagsSelected = alreadySelectedTags.trim().split(',');
            } else {
                this.tagsSelected = data.map(tag => tag.name);
            }
            this.isLoading = false;
            this.cdr.detectChanges();
        });
    }

    isActive(tag) {
        return this.tagsSelected.indexOf(tag) !== -1;
    }

    selectTag(tag) {
        let tags = this.tagsSelected;

        if (this.isActive(tag)) {
            tags = this.remove(tags, tag);
        } else {
            tags.push(tag);
        }

        this.tagsSelected = tags;
        console.log(tags.toString(), tags.length);
        this.context.setTagsSelected(tags.toString());
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

}
