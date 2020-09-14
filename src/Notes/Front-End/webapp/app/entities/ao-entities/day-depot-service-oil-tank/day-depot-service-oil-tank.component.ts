import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {DayDepotServiceOilTank} from './day-depot-service-oil-tank.model';
import {DayDepotServiceOilTankService} from './day-depot-service-oil-tank.service';
import {Principal} from '../../../shared';
import {DayDepot, DayDepotService} from '../day-depot';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {MainDayDepot, MainDayDepotService} from '../main-day-depot';
import {OilTank} from '../oil-tank';
import {ServiceOilTank, ServiceOilTankService} from '../service-oil-tank';

@Component({
    selector: 'jhi-day-depot-service-oil-tank',
    templateUrl: './day-depot-service-oil-tank.component.html'
})
export class DayDepotServiceOilTankComponent implements OnInit, OnDestroy {

    currentAccount: any;
    dayDepotServiceOilTanks: DayDepotServiceOilTank[];
    dayDepotServiceOilTank: DayDepotServiceOilTank = new DayDepotServiceOilTank();
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
    dayDepotId: number;
    dayDepot: DayDepot;
    breadcrumbItems: any[];
    mainDayDepotId: number;
    mainDayDepot: MainDayDepot;
    oilTank: OilTank;

    oiltankservices: ServiceOilTank[];
    daydepots: DayDepot[];
    editable: Boolean;

    constructor(private dayDepotServiceOilTankService: DayDepotServiceOilTankService,
                private mainDayDepotService: MainDayDepotService,
                private oilTankServiceService: ServiceOilTankService,
                private dayDepotService: DayDepotService,
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
        this.dayDepotId = activatedRoute.snapshot.params['dayDepotId'];
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
                    this.dayDepotServiceOilTank[value[0]] = Number(value[1]);
                } else {
                    this.dayDepotServiceOilTank[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.dayDepotServiceOilTankService.query(this.dayDepotId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<DayDepotServiceOilTank[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['main-day-depot/' + this.dayDepot.mainDayDepotId + '/day-depot/' + this.dayDepotId + '/day-depot-service-oil-tank'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.dayDepotServiceOilTank = new DayDepotServiceOilTank();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.dayDepotServiceOilTank.description) {
            this.currentSearch += 'description$' + this.dayDepotServiceOilTank.description + '&';
        }
        if (this.dayDepotServiceOilTank.oilTankServiceTitle) {
            this.currentSearch += 'oilTankService.title$' + this.dayDepotServiceOilTank.oilTankServiceTitle + '&';
        }
        if (this.dayDepotServiceOilTank.dayDepotId) {
            this.currentSearch += 'dayDepot.id☼' + this.dayDepotServiceOilTank.dayDepotId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['main-day-depot/' + this.dayDepot.mainDayDepotId + '/day-depot/' + this.dayDepotId + '/day-depot-service-oil-tank'], {
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
        this.translateService.get('niopdcgatewayApp.dayDepotServiceOilTank.home.mainDayDepotTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title,
                routerLink: ['/main-day-depot']
            });
        });
        this.translateService.get('niopdcgatewayApp.dayDepotServiceOilTank.home.dayDepotTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.dayDepot.oilTankTitle})`,
                routerLink: ['/main-day-depot/' + this.dayDepot.mainDayDepotId + '/day-depot']
            });
        });
        this.translateService.get('niopdcgatewayApp.dayDepotServiceOilTank.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        /*this.dayDepotService.query().subscribe(
            (res: HttpResponse<DayDepot[]>) => {
                this.daydepots = res.body.filter((dayDepot) => dayDepot.oilTankOilTankType === 'SERVICE_TANK');
            }
        );*/

        this.registerChangeInDayDepotServiceOilTanks();

        this.dayDepotService.find(this.dayDepotId).subscribe(
            (dayDepot: HttpResponse<DayDepot>) => {
                this.dayDepot = dayDepot.body;
                /*this.oilTankServiceService.queryByOilTankId(this.dayDepot.oilTankId).subscribe(
                    (res: HttpResponse<OilTank[]>) => {
                        this.oiltankservices = res.body;
                    }
                );*/
                this.setBreadCrumb();
            }
        );

        this.mainDayDepotService.find(this.mainDayDepotId)
            .subscribe((res: HttpResponse<MainDayDepot>) => {
                this.mainDayDepot = res.body;
            });

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

    trackId(index: number, item: DayDepotServiceOilTank) {
        return item.id;
    }

    trackServiceOilTankById(index: number, item: ServiceOilTank) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    registerChangeInDayDepotServiceOilTanks() {
        this.eventSubscriber = this.eventManager.subscribe('dayDepotServiceOilTankListModification',response => this.loadAll());
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

            this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot/' + this.dayDepotId + '/day-depot-service-oil-tank'], {
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
        this.dayDepotServiceOilTanks = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
