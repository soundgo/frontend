import {ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Audio} from '../../../../shared/models/Audio';
import {ApiService} from '../../../../services/api.service';
import {Tag} from '../../../../shared/models/Tag';

@Component({
    selector: 'app-edit-audio',
    templateUrl: './edit-audio.component.html',
    styleUrls: ['./edit-audio.component.scss']
})
export class EditAudioComponent implements OnInit, OnDestroy {

    @Input() audio;
    tags: any[] = [];
    options: any;
    term = '';

    showTermMaxLengthError = false;

    @ViewChild('tagInput') tagInput;

    constructor(private api: ApiService,
                private dialogRef: MatDialogRef<EditAudioComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private cdr: ChangeDetectorRef) {
        this.audio = data.audio;
    }

    ngOnDestroy() {
        this.cdr.detach();
    }

    ngOnInit() {
        this.api.getTags().then((response: []) => {
            this.tags = response;
        });
    }

    addTag($event) {
        if (typeof $event === 'string') {
            this.audio.tags.push($event);
            this.tagInput.nativeElement.value = '';
        } else {
            const term = $event.target.value;
            if (term.length <= 200) {
                if (term !== '' && this.audio.tags.indexOf(term) === -1) {
                    this.audio.tags.push(term);
                    $event.target.value = '';
                }
            }
        }
    }

    removeTag(tag) {
        const tagIndex = this.audio.tags.indexOf(tag);
        if (tagIndex !== -1) {
            this.audio.tags.splice(tagIndex, 1);
        }
    }

    changeTerm($event) {
        this.term = $event.target.value;
    }

    search($event) {
        this.term = $event.target.value;
        this.showTermMaxLengthError = this.term.length > 200;
        this.cdr.detectChanges();
        this.options = this.tags.filter((tag: any) => {
            return this.audio.tags.indexOf(this.term) === -1 && tag.name.toLowerCase().includes(this.term.toLowerCase());
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
