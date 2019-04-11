import {Component, OnInit, Inject, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ApiService} from 'src/app/services/api.service';
import {ContextService} from 'src/app/services/context.service';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {SitePanelSheetComponent} from '../site-panel-sheet/site-panel-sheet.component';
import {Tag} from '../../../shared/models/Tag';

@Component({
    selector: 'app-tag-panel-sheet',
    templateUrl: './tag-panel-sheet.component.html',
    styleUrls: ['./tag-panel-sheet.component.scss'],
})
export class TagPanelSheetComponent implements OnInit, OnDestroy {

    tagsFound: string[] = [];
    tags: string[] = [];
    tagsSelected: string[] = [];
    isLoading = true;
    term: string;

    constructor(
        private api: ApiService,
        private context: ContextService,
        private bottomSheetRef: MatBottomSheetRef<SitePanelSheetComponent>,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.api.getTags().then((response: Tag[]) => {
            this.tags = response.map((item: Tag) => item.name);
            this.isLoading = false;
            if (!this.cdr['destroyed']) {
                this.cdr.detectChanges();
            }
        });
        this.context.setTagsSelected(['active-tag-panel-sheet']);
    }

    ngOnDestroy() {
        this.cdr.detach();
        this.context.setTagsSelected(['inactive-tag-panel-sheet']);
    }

    isTagActive(tag) {
        return this.tagsSelected.indexOf(tag) !== -1;
    }

    toggleTag(tag) {
        if (this.isTagActive(tag)) {
            this.tagsSelected.splice(this.tagsSelected.indexOf(tag), 1);
            this.searchTags(this.term);
        } else {
            this.tagsSelected.push(tag);
            this.tagsFound.splice(this.tagsFound.indexOf(tag), 1);
        }
        this.context.setTagsSelected(this.tagsSelected);
    }

    searchTags($event) {
        this.term = $event.target ? $event.target.value : this.term;
        this.tagsFound = this.tags.filter((tag: any) => {
            return this.tagsSelected.indexOf(this.term) === -1 && tag.toLowerCase().includes(this.term.toLowerCase());
        });
    }

    isTagsFoundAvailable() {
        return this.tagsFound && this.tagsFound.length !== 0 && !this.isLoading;
    }

    isTagsSelectedAvailable() {
        return this.tagsSelected && this.tagsSelected.length !== 0 && !this.isLoading;
    }

    closeTagPanel() {
        this.bottomSheetRef.dismiss();
    }

}
