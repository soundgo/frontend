import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Audio} from '../../../../shared/models/Audio';
import {ApiService} from '../../../../services/api.service';
import {Tag} from '../../../../shared/models/Tag';

@Component({
    selector: 'app-edit-audio',
    templateUrl: './edit-audio.component.html',
    styleUrls: ['./edit-audio.component.scss']
})
export class EditAudioComponent implements OnInit {

    @Input() audio;
    tags: any;
    options: any;

    constructor(private api: ApiService,
                private dialogRef: MatDialogRef<EditAudioComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.audio = data.audio;
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
            this.dialogRef.close(this.audio);
        });
    }

}
