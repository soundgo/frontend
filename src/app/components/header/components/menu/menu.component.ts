import {Component, OnInit} from '@angular/core';
import { ContextService } from 'src/app/services/context.service';
import { Actor } from 'src/app/shared/models/Actor';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    isSelected:boolean;
    auth:string;
    actor: Actor;

    constructor(private context:ContextService) {
        this.auth = context.getAuth();
        this.actor = context.getUser().value;
    }

    ngOnInit() {
    }

    onSelect(): void {
        if (this.isSelected === true){
            this.isSelected = false;
        }else{
            this.isSelected = true;
        }
      }

    changeToUser(): void {
        this.auth = 'user';
        this.context.setAuth('user');
    }

    changeToAdvertiser(): void {
        this.auth = 'advertiser';
        this.context.setAuth('advertiser');
    }

    changeToAdministrator(): void {
        this.auth = 'administrator';
        this.context.setAuth('administrator');
    }

}
