import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {DayDepotContainer} from './day-depot-container.model';
import {DayDepotContainerService} from './day-depot-container.service';
import {Principal} from '../../../shared';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {MainDayDepot, MainDayDepotService} from '../main-day-depot';
import {OilTankContainer, OilTankContainerService} from '../oil-tank-container';

@Component({
    selector: 'jhi-day-depot-container',
    templateUrl: './day-depot-container.component.html'
})
export class DayDepotContainerComponent implements OnInit, OnDestroy {
    isClose: boolean;

    currentAccount: any;
    dayDepotContainers: DayDepotContainer[];
    dayDepotContainer: DayDepotContainer = new DayDepotContainer();
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
    mainDayDepotId: number;
    mainDayDepot: MainDayDepot;
    breadcrumbItems: any[];

    oiltankcontainers: OilTankContainer[];
    editable: Boolean;

    constructor(private dayDepotContainerService: DayDepotContainerService,
                private oilTankContainerService: OilTankContainerService,
                private mainDayDepotService: MainDayDepotService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.mainDayDepotId = activatedRoute.snapshot.params['mainDayDepotId'];

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
                    this.dayDepotContainer[value[0]] = Number(value[1]);
                } else {
                    this.dayDepotContainer[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.dayDepotContainerService.query(this.mainDayDepotId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<DayDepotContainer[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot-container'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.dayDepotContainer = new DayDepotContainer();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.dayDepotContainer.deductible) {
            this.currentSearch += 'deductible☼' + this.dayDepotContainer.deductible + '&';
        }
        if (this.dayDepotContainer.addition) {
            this.currentSearch += 'addition☼' + this.dayDepotContainer.addition + '&';
        }
        if (this.dayDepotContainer.systemAmount) {
            this.currentSearch += 'systemAmount☼' + this.dayDepotContainer.systemAmount + '&';
        }
        if (this.dayDepotContainer.startCount) {
            this.currentSearch += 'startCount☼' + this.dayDepotContainer.startCount + '&';
        }
        if (this.dayDepotContainer.endCount) {
            this.currentSearch += 'endCount☼' + this.dayDepotContainer.endCount + '&';
        }
        if (this.dayDepotContainer.description) {
            this.currentSearch += 'description$' + this.dayDepotContainer.description + '&';
        }
        if (this.dayDepotContainer.oilTankContainerId) {
            this.currentSearch += 'oilTankContainer.id☼' + this.dayDepotContainer.oilTankContainerId + '&';
        }
        if (this.dayDepotContainer.mainDayDepotId) {
            this.currentSearch += 'mainDayDepot.id☼' + this.dayDepotContainer.mainDayDepotId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot-container'], {
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
        this.translateService.get('niopdcgatewayApp.dayDepotContainer.home.mainDayDepotTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/main-day-depot']});
        });
        this.translateService.get('niopdcgatewayApp.dayDepotContainer.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.oilTankContainerService.query().subscribe(res => {
                this.oiltankcontainers = res.body;
            }
        );
        this.registerChangeInDayDepotContainers();

        this.mainDayDepotService.find(this.mainDayDepotId).subscribe(mainDayDepot => {
                this.isClose = mainDayDepot.body.close;
                this.mainDayDepot = mainDayDepot.body;
                this.setBreadCrumb();
            }
        );

        if (this.mainDayDepotId != null) {
            this.mainDayDepotService.editable(this.mainDayDepotId).subscribe(res => {
                    this.editable = res;
                }
            );
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DayDepotContainer) {
        return item.id;
    }

    trackOilTankContainerById(index: number, item: OilTankContainer) {
        return item.id;
    }

    trackMainDayDepotById(index: number, item: MainDayDepot) {
        return item.id;
    }

    registerChangeInDayDepotContainers() {
        this.eventSubscriber = this.eventManager.subscribe('dayDepotContainerListModification',response => this.loadAll());
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

        console.log(this.page,
            this.page, page,
            this.itemsPerPage, itemsPerPage,
            this.predicate, predicate,
            this.reverse, reverse);

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse !== reverse) {

            this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot-container'], {
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
        this.dayDepotContainers = data;

    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
