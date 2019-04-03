import {Component, OnInit} from '@angular/core';
import {ContextService} from 'src/app/services/context.service';
import {Actor} from 'src/app/shared/models/Actor';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {CreateSiteComponent} from 'src/app/sections/map/create-site/create-site.component';
import {User} from '../../../../shared/models/User';
import {LoginComponent} from '../../../../sections/account/components/login/login.component';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    isSelected: boolean;
    auth: string;
    user: User;
    subscription: Subscription = new Subscription();

    constructor(private context: ContextService,
                private matDialog: MatDialog,
                private cookieService: CookieService) {
        this.subscription.add(this.context.getAuth().asObservable().subscribe(auth => {
            this.auth = auth;
        }));
        this.subscription.add(this.context.getUser().asObservable().subscribe(user => {
            this.user = user;
        }));
    }

    ngOnInit() {
    }

    onSelect(): void {
        if (this.auth) {
            this.isSelected = !this.isSelected;
        } else {
            this.matDialog.open(LoginComponent, {
                width: '350px'
            });
        }
    }

    createSite() {
        this.matDialog.open(CreateSiteComponent, {
            width: '350px',
            data: {
                id: null,
                name: '',
                description: ''
            }
        });
    }

    logout() {
        this.isSelected = false;
        this.cookieService.delete('user');
        this.context.setUser(null);
        this.context.setAuth(null);
    }

}
