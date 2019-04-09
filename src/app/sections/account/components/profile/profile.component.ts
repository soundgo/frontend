import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ContextService } from 'src/app/services/context.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CreateCreditCardComponent } from '../create-credit-card/create-credit-card.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  auth: string;

  constructor(private context: ContextService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    protected dialog: MatDialog,
    private cdr: ChangeDetectorRef) {
    this.user = this.context.getUser().getValue();
    this.auth = this.context.getAuth().getValue();
    this.context.getAuth().subscribe(value => {
      if (value) {
        this.auth = value;
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.cdr.detach();
}

  becomeAdvertiser() {
    this.dialog.open(CreateCreditCardComponent, {
      width: '350px',
      data: {
        creditcard: {
          name: '',
          number: '',
          month: '',
          year: '',
          cvc: ''
        }
      }
    }).afterClosed().subscribe(() => {
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
    }
    })
  }

  onClose() {
    this.dialogRef.close();
  }

}
