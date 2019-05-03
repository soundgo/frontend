import {Component, HostBinding, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ContextService} from '../../../services/context.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnDestroy {

    subscription = new Subscription();

    @HostBinding('class.show')
    loading = false;

    constructor(private context: ContextService) {
        this.subscription = this.context.getLoading().subscribe(loading => {
            this.loading = loading;
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
