import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {Audio} from '../../../shared/models/Audio';

@Component({
    selector: 'app-audio-reproducer-panel',
    templateUrl: './audio-reproducer-panel.component.html',
    styleUrls: ['./audio-reproducer-panel.component.scss']
})
export class AudioReproducerPanelComponent implements OnInit {

    audio: Audio;

    constructor(private api: ApiService,
                private bottomSheetRef: MatBottomSheetRef<AudioReproducerPanelComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        this.audio = data.audio;
    }

    ngOnInit() {
    }

    onFinish() {
        this.api.audioReproduced(this.audio.id);
    }

    closePanel() {
        this.bottomSheetRef.dismiss();
    }

}
