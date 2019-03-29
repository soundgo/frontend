import {Component, OnInit} from '@angular/core';
import { ContextService } from 'src/app/services/context.service';

@Component({
    selector: 'app-time-left',
    templateUrl: './time-left.component.html',
    styleUrls: ['./time-left.component.scss']
})
export class TimeLeftComponent implements OnInit {

    valueBar:number = 0;
    
    constructor(private context: ContextService) {

        this.context.getUser().subscribe(user => {
            if (user && this.valueBar != Math.round(user.minutes/60)) {
                this.calculatePercentBar(user.minutes);
            }
        })
    }

    ngOnInit() {}

    calculatePercentBar(userMinutes) {
        const maxTimeUserProgressBar = this.context.getConfig().getValue().maxTimeUserProgressBar;
        this.valueBar = Math.round(((userMinutes/60)/maxTimeUserProgressBar)*100)
    }

}
