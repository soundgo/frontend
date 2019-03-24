import {Component, OnInit} from '@angular/core';
import {ContextService} from 'src/app/services/context.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-errors-management',
    templateUrl: './errors-management.component.html',
})
export class ErrorsManagementComponent implements OnInit {

    subscription: Subscription;

    constructor(private context: ContextService, private snackBar: MatSnackBar, private translateService: TranslateService) {

        this.subscription = this.context.getError().subscribe((response) => {
            if (response.error) {
                this.createSnackBar(response.error);
            }
        });

    }

    ngOnInit() {
    }

    createSnackBar(error: string): void {
        const snackBarRef = this.snackBar.open(this.translateService.instant(error));

        snackBarRef.afterDismissed().subscribe(() => {
            this.clearError();
        });
    }

    clearError(): void {
        this.context.setError(null);
    }

}
