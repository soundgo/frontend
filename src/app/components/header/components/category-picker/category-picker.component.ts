import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';
import { AUDIO_CATEGORIES } from 'src/app/shared/models/Audio';

@Component({
    selector: 'app-category-picker',
    templateUrl: './category-picker.component.html',
    styleUrls: ['./category-picker.component.scss']
})
export class CategoryPickerComponent implements OnInit {
    categoriesSelected: string = 'Experience,Tourism,Leisure';

    constructor(
        private context: ContextService,
    ) {
        this.context.setCategoriesSelected(this.categoriesSelected);
    }

    isActive(category) {
        const categorySelected = AUDIO_CATEGORIES[category];
        const categories = this.categoriesSelected.trim().split(',');

        for (let cat of categories) {
            if (cat == categorySelected)
                return true;
        }
        return false;
    }

    selectCategory(category) {
        const categorySelected = AUDIO_CATEGORIES[category];
        let categories = []
        if (this.categoriesSelected.trim().length != 0)
            categories = this.categoriesSelected.split(',');

        if (this.isActive(category))
            categories = this.remove(categories, categorySelected);
        else
            categories.push(categorySelected);
        
        this.categoriesSelected = categories.toString();
        this.context.setCategoriesSelected(this.categoriesSelected);
    }

    remove(array, value) {
        const idx = array.indexOf(value);
        if (idx > -1) {
            array.splice(idx, 1);
        }

        return array;
    }

    ngOnInit() {}

}
