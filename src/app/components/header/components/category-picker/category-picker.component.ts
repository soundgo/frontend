import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';
import { AUDIO_CATEGORIES } from 'src/app/shared/models/Audio';

@Component({
    selector: 'app-category-picker',
    templateUrl: './category-picker.component.html',
    styleUrls: ['./category-picker.component.scss']
})
export class CategoryPickerComponent implements OnInit {
    categorySelected: string = 'Experience';

    constructor(
        private context: ContextService,
    ) {
        this.context.setCategoriesSelected(this.categorySelected);
    }

    isActive(category) {
        return this.categorySelected === AUDIO_CATEGORIES[category];
    }

    selectCategory(category) {
        this.categorySelected = AUDIO_CATEGORIES[category];
        this.context.setCategoriesSelected(this.categorySelected);
    }

    ngOnInit() {
    }

}
