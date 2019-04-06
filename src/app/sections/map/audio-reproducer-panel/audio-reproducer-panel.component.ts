import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {Audio} from '../../../shared/models/Audio';
import { ContextService } from 'src/app/services/context.service';

@Component({
    selector: 'app-audio-reproducer-panel',
    templateUrl: './audio-reproducer-panel.component.html',
})
export class AudioReproducerPanelComponent implements OnInit {

    audio: Audio;
    actorId: any;

    constructor(private api: ApiService,
                private context: ContextService,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        this.audio = data.audio;
        this.actorId = data.actorId;
    }

    ngOnInit() {
    }

    onFinish() {
        this.api.audioReproduced(this.audio.id);
    }

    isEditable() {
        const user = this.context.getUser().getValue();
        return user && user.id === this.data.properties.actorId;
    }

}
