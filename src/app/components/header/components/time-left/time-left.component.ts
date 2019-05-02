import {Component, OnDestroy} from '@angular/core';
import {ContextService} from 'src/app/services/context.service';
import { MatDialog } from '@angular/material';
import { TimeLeftModalComponent } from '../time-left-modal/time-left-modal.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-time-left',
    templateUrl: './time-left.component.html',
    styleUrls: ['./time-left.component.scss']
})
export class TimeLeftComponent implements OnDestroy {

    userTimeSeconds: number = 0;
    valueBar = 0;
    maxTimeProgressBar: number;
    subscription: Subscription = new Subscription();

    constructor(private context: ContextService,
        protected dialog: MatDialog) {

        // Max time is in minutes in config
        this.maxTimeProgressBar = this.context.getConfig().getValue().maxTimeUserProgressBar * 60;

        this.subscription = this.context.getUser().subscribe(user => {
            if (user && user.minutes) {
                this.userTimeSeconds = user.minutes;
                this.calculatePercentBar(this.userTimeSeconds);
            } else {
                this.valueBar = 0;
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    calculatePercentBar(userTimeSeconds) {
        this.valueBar = Math.round((userTimeSeconds / this.maxTimeProgressBar) * 100);
    }

    showTimeLeftModal() {
        this.userTimeSeconds = this.context.getUser().getValue().minutes;
        
        this.dialog.open(TimeLeftModalComponent, {
            width: '350px',
            data: this.userTimeSeconds
        })
    }

}
