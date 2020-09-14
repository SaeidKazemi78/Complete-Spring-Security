import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {UserToken} from './user-token.model';
import {UserTokenService} from './user-token.service';
import {Principal} from '../../shared';
import {Location} from '../location/.';
import {Region} from '../region/.';
import {Person, PersonService} from '../person/.';
import {Customer, CustomerService} from '../customer/.';
import {CustomerType, CustomerTypeService} from '../customer-type/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../shared/user/user.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {UserManagementService} from 'app/entities/user-management';

@Component({
    selector: 'jhi-user-token',
    templateUrl: './user-token.component.html'
})
export class UserTokenComponent implements OnInit, OnDestroy {

    currentAccount: any;
    userTokens: UserToken[];
    userToken: UserToken = new UserToken();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    userManagementId: string;
    userManagement: User;
    breadcrumbItems: any[];

    locations: Location[];
    regions: Region[];
    people: Person[];
    customers: Customer[];
    customertypes: CustomerType[];

    constructor(private userTokenService: UserTokenService,
                private personService: PersonService,
                private customerService: CustomerService,
                private customerTypeService: CustomerTypeService,
                private userManagementService: UserManagementService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.userManagementId = activatedRoute.snapshot.params['username'];

        const x = this.currentSearch.split('&');
        for (const key of x) {
            let value = key.split('$');
            if (key.lastIndexOf('#') >= 0) { // enum
                value = key.split('#');
            } else if (key.lastIndexOf(';') >= 0) { // Boolean
                value = key.split(';');
            } else if (key.lastIndexOf('☼') >= 0) { // equal number
                value = key.split('☼');
            } else if (key.lastIndexOf('>') >= 0) { // number
                value = key.split('>');
            } else if (key.lastIndexOf('<') >= 0) { // number
                value = key.split('<');
            } else if (key.lastIndexOf('→') >= 0) { // start date
                value = key.split('→');
            } else if (key.lastIndexOf('←') >= 0) { // end date
                value = key.split('←');
            }

            if (value.length > 1) {
                if (value[0].indexOf('.') > 0) {
                    const z = value[0].split('.');
                    value[0] = z[0] + z[1].substring(0, 1).toUpperCase() + z[1].substring(1);
                    this.userToken[value[0]] = Number(value[1]);
                } else {
                    this.userToken[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        if (this.userManagementId != null)
            this.userTokenService.query(this.userManagementId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<UserToken[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        else {
            this.userTokenService.query(this.principal.getUsername(), {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<UserToken[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }

    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        if (this.userManagementId != null)
            this.router.navigate(['user-management/' + this.userManagementId + '/user-token', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        else
            this.router.navigate(['user-token', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.userToken.username) {
            this.currentSearch += 'username$' + this.userToken.username + '&';
        }
        if (this.userToken.lastLoginDate) {
            this.currentSearch += 'lastLoginDate→' + this.userToken.lastLoginDate + '&';
        }
        if (this.userToken.ip) {
            this.currentSearch += 'ip$' + this.userToken.ip + '&';
        }
        if (this.userToken.clientId) {
            this.currentSearch += 'clientId$' + this.userToken.clientId + '&';
        }

        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (this.userManagementId != null)
            this.router.navigate(['user-management/' + this.userManagementId + '/user-token', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        else
            this.router.navigate(['user-token', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        if (this.userManagementId != null) {
            this.translateService.get('userManagement.home.title').subscribe((title) => {
                this.breadcrumbItems.push({
                    label: title + ` (${this.userManagement.login})`,
                    routerLink: ['/user-management']
                });
            });
        }
        this.translateService.get('niopdcgatewayApp.userToken.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.registerChangeInIpfilters();

        if (this.userManagementId != null)
            this.userManagementService.find(this.userManagementId).subscribe(
                (userManagement) => {
                    this.userManagement = userManagement.body;
                    this.setBreadCrumb();
                }
            );
        else
            this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserToken) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackRegionById(index: number, item: Region) {
        return item.id;
    }

    registerChangeInIpfilters() {
        this.eventSubscriber = this.eventManager.subscribe('userTokenListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    loadLazy(event: LazyLoadEvent) {
        const predicate = this.predicate;
        const reverse = this.reverse;
        const page = this.page;
        const itemsPerPage = this.itemsPerPage;
        this.page = (event.first / event.rows) + 1;
        this.itemsPerPage = event.rows;
        if (event.sortField) {
            this.predicate = event.sortField;
            this.reverse = event.sortOrder !== 1;
        }

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse !== reverse) {

            if (this.userManagementId != null)
                this.router.navigate(['user-management', this.userManagementId, 'user-token'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            else
                this.router.navigate(['user-token'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.userTokens = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
