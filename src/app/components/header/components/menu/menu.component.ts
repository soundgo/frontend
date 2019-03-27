import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';
import { MatDialog } from '@angular/material';
import { CreateSiteComponent } from 'src/app/sections/map/create-site/create-site.component';
import { User } from 'src/app/shared/models/User';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    
    isSelected: boolean;
    auth: string;
    user: User;

    constructor(private context: ContextService, private matDialog: MatDialog) {
        this.auth = context.getAuth();
        this.user = context.getUser().getValue();
    }

    ngOnInit() {
    }

    onSelect(): void {
       this.isSelected = !this.isSelected;
    }

    createSite() {
        this.matDialog.open(CreateSiteComponent, {
            width: '350px',
        });
    }

    changeToUser(): void {
        this.auth = 'user';
        this.context.setAuth('user');
    }

    changeToAdvertiser(): void {
        this.auth = 'advertiser';
        this.context.setAuth('advertiser');
    }

    logout(): void {
        this.auth = 'null';
        this.context.setAuth(null);
    }

}
