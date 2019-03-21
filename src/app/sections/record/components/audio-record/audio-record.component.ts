import {Component, OnInit} from '@angular/core';
import {RecorderComponent} from '../../../../shared/components/recorder/recorder.component';
import {AudioRecordService} from '../../../../services/audio-record.service';
import {ContextService} from '../../../../services/context.service';
import {Audio} from '../../../../shared/models/Audio';

@Component({
    selector: 'app-audio-record',
    templateUrl: './audio-record.component.html',
    styleUrls: ['./audio-record.component.scss']
})
export class AudioRecordComponent extends RecorderComponent implements OnInit {

    constructor(protected audioRecord: AudioRecordService,
                private context: ContextService) {
        super(audioRecord);
        this.entity = new Audio();
        this.entitySetter = this.context.setAudioEntity;
    }

    ngOnInit() {
    }

}
