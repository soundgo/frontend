import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Audio} from '../../../../shared/models/Audio';
import {ApiService} from '../../../../services/api.service';
import {Tag} from '../../../../shared/models/Tag';

@Component({
    selector: 'app-edit-audio',
    templateUrl: './edit-audio.component.html',
    styleUrls: ['./edit-audio.component.scss']
})
export class EditAudioComponent implements OnInit {

    @Input() audio = new Audio({
        category: 'Experience',
        id: 53,
        isInappropriate: false,
        latitude: 37.4081397,
        liked: false,
        longitude: -5.9657532,
        name: 'carlos',
        numberLikes: 0,
        numberReproductions: 1,
        path: 'https://res.cloudinary.com/soundgo2/video/upload/v1554574854/records/gc5emavvatdmttufr8yi.ogg',
        photo: '',
        reported: false,
        site: null,
        tags: [],
        timestampCreation: '2019-04-06T18:20:55.638823Z',
        timestampFinish: '2019-04-09T18:20:55.386290Z'
    });
    tags: any;
    options: any;

    constructor(private api: ApiService,
                private dialogRef: MatDialogRef<EditAudioComponent>) {
    }

    ngOnInit() {
        this.api.getTags().then((response: []) => {
            this.tags = response;
        });
    }

    addTag($event) {
        const term = $event.target.value;
        if (term !== '' && this.audio.tags.indexOf(term) === -1) {
            this.audio.tags.push(term);
            $event.target.value = '';
        }
    }

    removeTag(tag) {
        const tagIndex = this.audio.tags.indexOf(tag);
        if (tagIndex !== -1) {
            this.audio.tags.splice(tagIndex, 1);
        }
    }

    search($event) {
        const term = $event.target.value;
        this.options = this.tags.filter((tag: any) => {
            return this.audio.tags.indexOf(term) === -1 && tag.name.toLowerCase().includes(term.toLowerCase());
        }).map((item: Tag) => item.name);
    }

    isSelected(category) {
        return this.audio.category === category;
    }

    selectCategory(category) {
        this.audio.category = category;
    }

    editAudio() {
        this.api.updateAudio(this.audio).then(_ => {
            this.dialogRef.close();
        });
    }

}
