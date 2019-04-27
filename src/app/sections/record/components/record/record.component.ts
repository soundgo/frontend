import {Component, OnInit} from '@angular/core';
import {ContextService} from 'src/app/services/context.service';
import {MatDialog} from '@angular/material';
import {ApiService} from 'src/app/services/api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-record',
    template: '',
})
export class RecordComponent implements OnInit {

    constructor(
        protected context: ContextService,
        protected dialog: MatDialog,
        protected api: ApiService
    ) {
        this.context.getSendRecord().subscribe(value => {
            if (value) {
                this.sendRecord(value);
            }
        });
    }

    ngOnInit() {
    }

    sendRecord(sendRecord: string) {

        if (sendRecord === 'ad') {
            this.createAd(this.context.getAdEntity().getValue());
        } else if (sendRecord === 'site') {
            this.createAudioSite(this.context.getAudioEntity().getValue());
        } else if (sendRecord === 'audio') {
            this.createAudio(this.context.getAudioEntity().getValue());
        }

        this.context.setSendRecord(null);
        this.context.setRecordType(null);
        this.context.setIsRecorded(true);
    }

    createAd(adEntity) {
        this.context.setLoading(true);
        this.api
            .createAd(adEntity)
            .then(response => {
                this.context.setLoading(false);
            });
    }

    createAudioSite(audioEntity) {
        this.context.setLoading(true);
        this.api.createSiteAudio(audioEntity, this.context.getSiteId().getValue())
            .then(response => {
                this.context.setSiteId(null);
                const user = this.context.getUser().getValue();
                user.minutes -= audioEntity.duration;
                this.context.setUser(user);
                this.context.setLoading(false);
            });
    }

    createAudio(audioEntity) {
        this.context.setLoading(true);
        this.api.createAudio(audioEntity).then(response => {
            console.log('createAudio:', response);
            // Reduce minutes of user
            const user = this.context.getUser().getValue();
            user.minutes -= audioEntity.duration;
            this.context.setUser(user);
            this.context.setLoading(false);
        });
    }

}
