import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';
import { Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-errors-management',
  templateUrl: './errors-management.component.html',
  styleUrls: ['./errors-management.component.sass']
})
export class ErrorsManagementComponent implements OnInit {

  constructor(private context: ContextService, private snackBar: MatSnackBar) {
    
    this.subscription = this.context.getError().subscribe(value => {
      if(value !== null){
        this.createSnackBar(value.error);
      }
  });

  }

  subscription:Subscription;

  ngOnInit() {
  }

  createSnackBar(value:string):void{
    let snackBarRef = this.snackBar.open('value');

    snackBarRef.afterDismissed().subscribe(() => {
      this.clearError();
    });
  }

  clearError():void{
    this.context.setError(null);
  }
  

}
