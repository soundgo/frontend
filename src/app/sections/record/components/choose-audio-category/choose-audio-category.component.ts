import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AUDIO_CATEGORIES} from '../../../../shared/models/Audio';
import {ContextService} from '../../../../services/context.service';
import {ApiService} from '../../../../services/api.service';

@Component({
    selector: 'app-choose-audio-category',
    templateUrl: './choose-audio-category.component.html',
    styleUrls: ['./choose-audio-category.component.scss']
})
export class ChooseAudioCategoryComponent implements OnInit {

    categorySelected: string;

    constructor(private context: ContextService, private api: ApiService, public dialogRef: MatDialogRef<ChooseAudioCategoryComponent>) {
    }

    onClose(): void {
        this.dialogRef.close();
    }

    isActive(category) {
        return this.categorySelected === AUDIO_CATEGORIES[category];
    }

    selectCategory(category) {
        this.categorySelected = AUDIO_CATEGORIES[category];
    }

    saveCategory() {
        const entity = this.context.getAudioEntity().getValue();
        entity.category = this.categorySelected;
        this.context.setAudioEntity(entity);
        this.api.createAudio(entity);
        this.dialogRef.close();
    }

    ngOnInit() {
    }

}
