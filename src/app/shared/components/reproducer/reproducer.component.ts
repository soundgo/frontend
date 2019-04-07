import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Audio} from '../../models/Audio';
import {Ad} from '../../models/Ad';
import {ContextService} from 'src/app/services/context.service';
import {MatDialog} from '@angular/material';
import {NumberReproductionsAdvertisementsComponent} from 'src/app/sections/record/components/number-reproductions-advertisements/number-reproductions-advertisements.component';
import {DeleteModalComponent} from '../delete-modal/delete-modal.component';
import {EditAudioComponent} from '../../../sections/record/components/edit-audio/edit-audio.component';

@Component({
    selector: 'app-reproducer',
    templateUrl: './reproducer.component.html',
    styleUrls: ['./reproducer.component.scss']
})
export class ReproducerComponent implements OnInit {

    @Input() record: Audio | Ad;
    @Input() properties: any;
    @Input() isAdvertiser = false;
    @Input() isEditable = false;
    @Output() finishAction = new EventEmitter<any>();
    @Output() startAction = new EventEmitter<any>();

    constructor(protected context: ContextService,
                protected dialog: MatDialog) {
    }

    ngOnInit() {
    }

    onStart() {
        if (this.startAction) {
            this.startAction.emit({});
        }
    }

    onFinish(params) {
        const {timeToListenAnAdvertisement} = this.context.getConfig().getValue();
        this.record.numberReproductions = this.record.numberReproductions + 1;
        const duration = (params.currentTarget.children[1].duration * timeToListenAnAdvertisement);
        if (this.finishAction) {
            this.finishAction.emit({duration});
        }
    }

    deleteRecord(record) {
        this.dialog
            .open(DeleteModalComponent, {
                width: '350px',
                data: {
                    entity: this.record,
                    entityType: record instanceof Audio ? 'audio' : 'ad'
                }
            });
    }

    editRecord() {
        if (this.record instanceof Ad) {
            this.dialog
                .open(NumberReproductionsAdvertisementsComponent, {
                    width: '350px',
                    data: {
                        ad: this.record,
                        properties: this.properties
                    }
                });
        } else {
            this.dialog.open(EditAudioComponent, {
                width: '350px',
                data: {
                    audio: this.record
                }
            }).afterClosed().subscribe(res => {
                this.record = res;
            });
        }
    }


}
