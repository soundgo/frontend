import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Audio} from '../../models/Audio';
import {Ad} from '../../models/Ad';
import {ContextService} from 'src/app/services/context.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NumberReproductionsAdvertisementsComponent} from 'src/app/sections/record/components/number-reproductions-advertisements/number-reproductions-advertisements.component';
import {DeleteModalComponent} from '../delete-modal/delete-modal.component';
import {EditAudioComponent} from '../../../sections/record/components/edit-audio/edit-audio.component';
import { User } from '../../models/User';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

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
    @Input() isAudio = false;
    @Output() finishAction = new EventEmitter<any>();
    @Output() startAction = new EventEmitter<any>();
    isLiked:boolean;
    editActive: boolean = false;
    deleteActive: boolean = false;

    isReported:boolean;
    user: User;
    subscription: Subscription = new Subscription();

    constructor(protected context: ContextService,
                protected dialog: MatDialog, protected api: ApiService) {

                    this.subscription.add(this.context.getUser().asObservable().subscribe(user => {
                        this.user = user;
                    }));
                
                    if(this.isAudio===true){
                        const audio = this.record as Audio;
                        this.isLiked = audio.liked;
                        this.isReported = audio.reported;
                    }
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
        this.deleteActive = true;
        this.dialog
            .open(DeleteModalComponent, {
                width: '350px',
                data: {
                    entity: record,
                    entityType: record instanceof Audio ? 'audio' : 'ad'
                }
            }).afterClosed().subscribe(() => {
                this.deleteActive = false;
            });
    }

    editRecord() {
        this.editActive = true;
        if (this.record instanceof Ad) {
            this.dialog
                .open(NumberReproductionsAdvertisementsComponent, {
                    width: '350px',
                    data: {
                        ad: this.record,
                        properties: this.properties
                    }
                }).afterClosed().subscribe(() => {
                    this.editActive = false;
                });;
        } else {
            this.dialog.open(EditAudioComponent, {
                width: '350px',
                data: {
                    audio: this.record
                }
            }).afterClosed().subscribe(() => {
                this.editActive = false;
            });
        }
    }
    
    like() {
        this.isLiked=true;
        const audio = this.record as Audio;
        audio.liked = true;
        audio.numberLikes = audio.numberLikes+1;
        this.record = audio;
        this.api.likeAudio(audio);
    }

    report() {
        this.isReported=true;
        const audio = this.record as Audio;
        audio.reported = true;
        audio.numberReports = audio.numberReports+1;
        this.record = audio;
        this.api.reportAudio(audio);
    }


}
