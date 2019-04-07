import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialogRef} from '@angular/material';
import {Audio} from '../../../shared/models/Audio';
import {ContextService} from 'src/app/services/context.service';

@Component({
    selector: 'app-audio-reproducer-panel',
    templateUrl: './audio-reproducer-panel.component.html',
})
export class AudioReproducerPanelComponent implements OnInit, OnDestroy {

    audio: Audio;
    actorId: any;

    isLoading = false;

    constructor(private api: ApiService,
                private context: ContextService,
                private cdr: ChangeDetectorRef,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        this.actorId = data.properties.actorId;
    }

    ngOnDestroy() {
        this.cdr.detach();
    }

    ngOnInit() {
        this.isLoading = true;
        this.api.getAudioById(this.data.properties.id).then((audio: Audio) => {
            this.audio = audio;
            this.isLoading = false;
            if (!this.cdr['destroyed']) {
                this.cdr.detectChanges();
            }
        });
    }

    onFinish() {
        this.api.audioReproduced(this.audio.id);
    }

    isEditable() {
        const user = this.context.getUser().getValue();
        return user && user.id === this.actorId;
    }

}
