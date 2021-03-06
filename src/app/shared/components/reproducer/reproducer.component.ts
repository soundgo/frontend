import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input, OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {Audio} from '../../models/Audio';
import {Ad} from '../../models/Ad';
import {ContextService} from 'src/app/services/context.service';
import {MatBottomSheetRef, MatDialog, MatDialogRef} from '@angular/material';
import {NumberReproductionsAdvertisementsComponent} from 'src/app/sections/record/components/number-reproductions-advertisements/number-reproductions-advertisements.component';
import {DeleteModalComponent} from '../delete-modal/delete-modal.component';
import {EditAudioComponent} from '../../../sections/record/components/edit-audio/edit-audio.component';
import {User} from '../../models/User';
import {ApiService} from 'src/app/services/api.service';
import {ReportModalComponent} from '../report-modal/report-modal.component';
import {LikeModalComponent} from '../like-modal/like-modal.component';

@Component({
    selector: 'app-reproducer',
    templateUrl: './reproducer.component.html',
    styleUrls: ['./reproducer.component.scss']
})
export class ReproducerComponent implements OnInit, OnDestroy {

    @Input() record: Audio | Ad;
    @Input() properties: any;
    @Input() isAdvertiser = false;
    @Input() isEditable = false;
    @Input() isAudio = false;
    @Input() isLoading = false;
    @Output() finishAction = new EventEmitter<any>();
    @Output() startAction = new EventEmitter<any>();

    editActive = false;
    deleteActive = false;

    user: User;


    constructor(protected context: ContextService,
                protected dialog: MatDialog,
                protected api: ApiService,
                private cdr: ChangeDetectorRef,
                private dialogRef: MatBottomSheetRef<ReproducerComponent>) {
    }

    ngOnInit() {
        // For testing
        if (!this.record) {
            this.record = new Audio();
        }
    }

    ngOnDestroy() {
        this.cdr.detach();
    }

    onStart() {
        if (this.startAction) {
            this.startAction.emit({});
        }
    }

    onFinish() {
        this.record.numberReproductions = this.record.numberReproductions + 1;
        if (this.finishAction) {
            this.finishAction.emit({
                nickname: this.record.name,
                duration: this.record.duration
            });
        }
    }

    canShowLike() {
        const user = this.context.getUser().getValue();
        return user !== null && this.isAudio && !this.isEditable && !this.record.reported;
    }

    canShowReport() {
        const user = this.context.getUser().getValue();
        return user !== null && this.isAudio && !this.isEditable;
    }

    reportRecord() {
        if (!(this.record as Audio).reported) {
            this.dialog.open(ReportModalComponent, {
                width: '350px',
                data: {
                    audio: this.record
                }
            }).afterClosed().subscribe(isReported => {
                if (isReported) {
                    const audio = this.record as Audio;
                    audio.reported = true;
                    audio.numberReports = audio.numberReports + 1;
                    this.record = audio;
                    if (!this.cdr['destroyed']) {
                        this.cdr.detectChanges();
                    }
                }
            });
        }
    }

    deleteRecord(record) {
        this.deleteActive = true;
        this.dialog.open(DeleteModalComponent, {
            width: '350px',
            data: {
                entity: record,
                entityType: record instanceof Audio ? 'audio' : 'ad'
            }
        }).afterClosed().subscribe(isDeleted => {
            this.deleteActive = false;
            if (!this.cdr['destroyed']) {
                this.cdr.detectChanges();
            }
            if (isDeleted) {
                this.dialogRef.dismiss();
            }
        });
    }

    editAudio() {
        this.editActive = true;
        this.dialog.open(EditAudioComponent, {
            width: '350px',
            data: {
                audio: this.record
            }
        }).afterClosed().subscribe(audio => {
            this.editActive = false;
            if (audio) {
                this.record = new Audio(audio);
            }
            if (!this.cdr['destroyed']) {
                this.cdr.detectChanges();
            }
        });
    }

    editAd() {
        this.editActive = true;
        this.dialog.open(NumberReproductionsAdvertisementsComponent, {
            width: '350px',
            data: {
                ad: new Ad(this.record),
                properties: this.properties
            }
        }).afterClosed().subscribe(ad => {
            this.editActive = false;
            if (ad) {
                this.record = new Ad(ad);
            }
            if (!this.cdr['destroyed']) {
                this.cdr.detectChanges();
            }
        });
    }

    isEditActive() {
        return this.editActive;
    }

    like() {
        if (!(this.record as Audio).liked) {
            this.dialog.open(LikeModalComponent, {
                width: '350px',
                data: {
                    audio: this.record
                }
            }).afterClosed().subscribe(isLiked => {
                if (isLiked) {
                    const audio = this.record as Audio;
                    audio.liked = true;
                    audio.numberLikes += 1;
                    this.record = audio;
                    if (!this.cdr['destroyed']) {
                        this.cdr.detectChanges();
                    }
                }
            });
        }
    }

}
