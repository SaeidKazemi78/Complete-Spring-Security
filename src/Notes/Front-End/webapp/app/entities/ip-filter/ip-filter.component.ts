import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {IpFilter} from './ip-filter.model';
import {IpFilterService} from './ip-filter.service';
import {Principal} from '../../shared';
import {Location} from '../location/.';
import {Region} from '../region/.';
import {Person, PersonService} from '../person/.';
import {SellContract} from '../sell-contract/.';
import {Customer, CustomerService} from '../customer/.';
import {CustomerType, CustomerTypeService} from '../customer-type/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../shared/user/user.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {UserManagementService} from 'app/entities/user-management';

@Component({
    selector: 'jhi-ip-filter',
    templateUrl: './ip-filter.component.html'
})
export class IpFilterComponent implements OnInit, OnDestroy {

    currentAccount: any;
    ipfilters: IpFilter[];
    ipFilter: IpFilter = new IpFilter();
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

    constructor(private ipFilterService: IpFilterService,
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
        this.routeData = this.activatedRoute.data.subscribe(data => {
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
                    this.ipFilter[value[0]] = Number(value[1]);
                } else {
                    this.ipFilter[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.ipFilterService.query(this.userManagementId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<IpFilter[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['user-management/' + this.userManagementId + '/ip-filter'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.ipFilter.ip) {
            this.currentSearch += 'ip$' + this.ipFilter.ip + '&';
        } if (this.ipFilter.netMask) {
            this.currentSearch += 'netMask$' + this.ipFilter.netMask + '&';
        }
        if (this.ipFilter.accessStatus) {
            this.currentSearch += 'accessStatus#AccessStatus.' + this.ipFilter.accessStatus + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['user-management/' + this.userManagementId + '/ip-filter'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('userManagement.home.title').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.userManagement.login})`,
                routerLink: ['/user-management']
            });
        });
        this.translateService.get('niopdcgatewayApp.ipFilter.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInIpfilters();

        this.userManagementService.find(this.userManagementId).subscribe(userManagement => {
                this.userManagement = userManagement.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IpFilter) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackRegionById(index: number, item: Region) {
        return item.id;
    }

    registerChangeInIpfilters() {
        this.eventSubscriber = this.eventManager.subscribe('ipFilterListModification',response => this.loadAll());
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

            this.router.navigate(['user-management', this.userManagementId, 'ip-filter'], {
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
        this.ipfilters = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
