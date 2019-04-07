import {Component, OnInit} from '@angular/core';
import {ContextService} from 'src/app/services/context.service';
import { MatDialog } from '@angular/material';
import { TimeLeftModalComponent } from '../time-left-modal/time-left-modal.component';

@Component({
    selector: 'app-time-left',
    templateUrl: './time-left.component.html',
    styleUrls: ['./time-left.component.scss']
})
export class TimeLeftComponent implements OnInit {

    valueBar = 0;
    maxTimeUserProgressBar: number;

    constructor(private context: ContextService,
        protected dialog: MatDialog) {

        this.maxTimeUserProgressBar = this.context.getConfig().getValue().maxTimeUserProgressBar;

        this.context.getUser().subscribe(user => {
            if (user && this.valueBar !== Math.round(user.minutes / 60)) {
                this.calculatePercentBar(user.minutes);
            } else {
                this.valueBar = 0;
            }
        });
    }

    ngOnInit() {
    }

    calculatePercentBar(userMinutes) {
        this.valueBar = Math.round(((userMinutes / 60) / this.maxTimeUserProgressBar) * 100);
    }

    showTimeLeftModal() {
        const userMinutes = this.maxTimeUserProgressBar * (this.valueBar / 100);
        console.log(userMinutes)
        this.dialog.open(TimeLeftModalComponent, {
            width: '350px',
            data: userMinutes
        })
    }

}
