import { Component, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';

import {LoginModalService, LoginService, Principal} from '../../shared';
import {ProfileService} from '../profiles/profile.service';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {MenuService} from 'app/entities/menu';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager} from 'ng-jhipster';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['main.css']

})
export class JhiMainComponent implements OnInit {

    inProduction: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    eventSubscriber: Subscription;
    sidebarIsActive;
    expanded;
    expandedRight;
    overlayVisible = false;
    identity: any;
    currentAccount;
    menus: any[] = [];

    constructor(private jhiLanguageHelper: JhiLanguageHelper,
                private router: Router,
                private principal: Principal,
                private loginService: LoginService,
                private languageHelper: JhiLanguageHelper,
                private loginModalService: LoginModalService,
                private menuService: MenuService,
                private eventManager: JhiEventManager,
                private profileService: ProfileService) {

        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'niopdcgatewayApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }


    loadMenu() {
        this.principal.getAuthenticationState().subscribe(identity => {
            this.identity = identity;
            if (this.identity) {
                this.menuService.queryForMenu().subscribe(v => {
                    this.menus = v.body;
                    this.menus.sort((a, b) => a.priority - b.priority);
                    this.menus.forEach(menu => {
                        if (menu.subMenu) {
                            menu.subMenu.sort((a, b) => a.priority - b.priority);
                            menu.subMenu.forEach(subMenu => {
                                if (subMenu.subMenu) {
                                    subMenu.subMenu.sort((a, b) => a.priority - b.priority);
                                }
                            });
                        }
                    });
                    this.menus.forEach(value => {
                        value.count = 0;
                        if (value.queryParams) {
                            value.query = JSON.parse(value.queryParams);
                        }
                        value.subMenu.forEach(value2 => {
                            if (value2.queryParams) {
                                value2.query = JSON.parse(value2.queryParams);
                            }
                            if (!value2.subMenu || (value2.subMenu && value2.subMenu.length === 0)) {
                                this.principal.hasAnyAuthority(value2.auth).then(result => {
                                    if (result) {
                                        value.count++;
                                    }
                                });
                            } else {
                                value2.count = 0;
                                let hasAnyAccess = false;
                                value2.subMenu.forEach(value3 => {
                                    if (value3.queryParams) {
                                        value3.query = JSON.parse(value3.queryParams);
                                    }
                                    this.principal.hasAnyAuthority(value3.auth).then(result => {
                                        if (result) {
                                            value2.count++;
                                            if (!hasAnyAccess) {
                                                hasAnyAccess = true;
                                                value.count++;
                                            }
                                        }
                                    });
                                });
                            }
                        });
                    });
                    console.log(this.menus);
                });
            }
        });
    }

    ngOnInit() {

        this.loadMenu();
        // this.registerChangeInMenu();

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
        /*        this.principal.getAuthenticationState().subscribe(identity => {
                    this.identity = identity;
                    this.menuService.query()
                        .subscribe(value => {
                            this.menus = value.body;
                            for (let i = 0; i < this.menus.length; i++) {
                                this.calculateCount(this.menus[i]);
                                console.log(this.menus);
                            }
                        });
                });*/

        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    navbarToggle() {
        this.expanded = !this.expanded;
    }

    navbarRightToggle() {
        this.expandedRight = !this.expandedRight;
    }

    getClass(menu) {
        return {
            collapsing: menu.collapsing,
            collapse: !menu.collapsing,
            'in': !menu.collapsing && menu.collapseIn
        };
    }

    getStyle(menu) {
        return {height: menu.heights};
    }

    timerToggle(menu) {

        this.menus.forEach(menu1 => {
            if (menu1 !== menu && menu.level === menu1.level) {
                menu1.collapsing = true;
                if (menu1.collapseIn) {
                    menu1.heights = ((menu1.count * 43.7) + 'px');
                }
                setTimeout(() => {
                    menu1.heights = null;
                }, 50);

                setTimeout(() => {
                    menu1.heights = null;
                    menu1.collapsing = false;
                    menu1.collapseIn = false;
                }, 500);
            }
        });

        menu.collapsing = true;
        if (menu.collapseIn) {
            menu.heights = ((menu.count * 43.7) + 'px');
        }

        setTimeout(() => {
            menu.heights = !menu.collapseIn ? ((menu.count * 43.7) + 'px') : null;
        }, 50);

        setTimeout(() => {
            menu.heights = null;
            menu.collapsing = false;
            menu.collapseIn = !menu.collapseIn;
        }, 500);
    }

    sidebarActive(active) {
        this.sidebarIsActive = active;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    chargeWallet() {
        this.router.navigate(['/wallet']);

    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    register() {
        this.router.navigateByUrl('/person/register');
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }

    registerChangeInMenu() {
        this.eventSubscriber = this.eventManager.subscribe('menuListModification', response => {
            this.loadMenu();
        });
    }
}
