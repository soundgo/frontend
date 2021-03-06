import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContextService} from 'src/app/services/context.service';
import {Actor} from 'src/app/shared/models/Actor';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MatDialog, MatBottomSheet} from '@angular/material';
import {CreateSiteComponent} from 'src/app/sections/map/create-site/create-site.component';
import {User} from '../../../../shared/models/User';
import {LoginComponent} from '../../../../sections/account/components/login/login.component';
import {CookieService} from 'ngx-cookie-service';
import {TagPanelSheetComponent} from 'src/app/sections/map/tag-panel-sheet/tag-panel-sheet.component';
import {ProfileComponent} from 'src/app/sections/account/components/profile/profile.component';
import {SiteSearchComponent} from '../../../../sections/map/site-search/site-search.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

    isSelected: boolean;
    auth: string;
    user: User;
    subscription: Subscription = new Subscription();

    tagPanelSheet: any;

    constructor(private context: ContextService,
                private matDialog: MatDialog,
                private cookieService: CookieService,
                private bottomSheet: MatBottomSheet) {
        this.subscription.add(this.context.getAuth().subscribe(auth => {
            if (auth) {
                this.auth = auth;
            } else {
                if (this.auth) {
                    this.auth = auth;
                    this.cookieService.delete('user');
                }
            }
        }));
        this.subscription.add(this.context.getUser().asObservable().subscribe(user => {
            this.user = user;
        }));
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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
        this.isSelected = false;
        this.matDialog.open(CreateSiteComponent, {
            width: '350px',
            data: {
                site: {
                    name: '',
                    description: ''
                },
                editable: false,
            }
        });
    }

    searchByTags() {
        this.isSelected = false;
        if (this.tagPanelSheet) {
            this.tagPanelSheet.dismiss();
            setTimeout(() => {
                this.tagPanelSheet = this.bottomSheet.open(TagPanelSheetComponent, {
                    disableClose: true,
                    hasBackdrop: false
                });
            }, 500);
        } else {
            this.tagPanelSheet = this.bottomSheet.open(TagPanelSheetComponent, {
                disableClose: true,
                hasBackdrop: false
            });
        }
    }

    searchBySites() {
        this.isSelected = false;
        this.bottomSheet.open(SiteSearchComponent, {
            disableClose: true,
            hasBackdrop: false
        });
    }

    showProfile() {
        this.isSelected = false;
        this.matDialog.open(ProfileComponent, {
            width: '330px'
        });
    }

    logout() {
        this.isSelected = false;
        this.context.setUser(null);
        this.context.setAuth(null);
        this.context.setAudioEntity(null);
        this.context.setIsMarkerSiteVisible(false);
        this.context.setDeleteAdLocation(true);
        this.context.setAdEntity(null);
        this.context.setSiteEntity(null);
        this.matDialog.closeAll();
        this.bottomSheet.dismiss();
        this.cookieService.delete('user');
    }

}
