import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {SellGroundFuel} from './sell-ground-fuel.model';
import {SellGroundFuelService} from './sell-ground-fuel.service';
import {Principal} from '../../../shared';
import {DayDepot, DayDepotService} from '../day-depot/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {MainDayDepot, MainDayDepotService} from '../../ao-entities/main-day-depot';
import {MainDayOperation, MainDayOperationService} from '../../ao-entities/main-day-operation';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {getPath} from 'app/core/router';

@Component({
    selector: 'jhi-sell-ground-fuel',
    templateUrl: './sell-ground-fuel.component.html'
})
export class SellGroundFuelComponent implements OnInit, OnDestroy {

    currentAccount: any;
    sellGroundFuels: SellGroundFuel[];
    sellGroundFuel: SellGroundFuel = new SellGroundFuel();
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
    mainDayOperationId: number;
    mainDayDepot: MainDayDepot;
    mainDayOperation: MainDayOperation;
    dayDepotId: number;
    dayDepot: DayDepot;
    breadcrumbItems: any[];

    daydepots: DayDepot[];
    editable: Boolean;

    constructor(private sellGroundFuelService: SellGroundFuelService,
                private mainDayDepotService: MainDayDepotService,
                private mainDayOperationService: MainDayOperationService,
                private dayDepotService: DayDepotService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private _hotkeysService: HotkeysService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.mainDayDepotId = activatedRoute.snapshot.params['mainDayDepotId'];
        this.dayDepotId = activatedRoute.snapshot.params['dayDepotId'];
        this.sellGroundFuel.sellToDifferent = null;

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
                    this.sellGroundFuel[value[0]] = Number(value[1]);
                } else if (value[0] === 'sellToDifferent') {
                    this.sellGroundFuel[value[0]] = Boolean(value[1]);
                } else {
                    this.sellGroundFuel[value[0]] = value[1];
                }
            }
        }
        this._hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'ins') {
                this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: ['sell-ground-fuel-new', this.dayDepotId]}}]);
                return false;
            }
        }));
    }

    loadAll() {
        this.sellGroundFuelService.query(this.dayDepotId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<SellGroundFuel[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot/' + this.dayDepotId + '/sell-ground-fuel'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.sellGroundFuel = new SellGroundFuel();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.sellGroundFuel.amount) {
            this.currentSearch += 'amount☼' + this.sellGroundFuel.amount + '&';
        }
        if (this.sellGroundFuel.sellToDifferent) {
            this.currentSearch += 'sellToDifferent;' + this.sellGroundFuel.sellToDifferent + '&';
        }
        if (this.sellGroundFuel.rate) {
            this.currentSearch += 'rate☼' + this.sellGroundFuel.rate + '&';
        }
        if (this.sellGroundFuel.totalPrice) {
            this.currentSearch += 'totalPrice☼' + this.sellGroundFuel.totalPrice + '&';
        }
        if (this.sellGroundFuel.dayDepotId) {
            this.currentSearch += 'dayDepot.id☼' + this.sellGroundFuel.dayDepotId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate([`main-day-depot/${this.mainDayDepotId}/day-depot/${this.dayDepotId}/sell-ground-fuel`], {
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
        const mainDayDepotUrl = '/main-day-depot';
        const dayDepotUrl = mainDayDepotUrl + '/' + this.mainDayDepotId + '/day-depot';
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.transfer.home.mainDayDepotTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: [mainDayDepotUrl]});
        });
        this.translateService.get('niopdcgatewayApp.transfer.home.dayDepotTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title + `(${this.dayDepot.oilTankTitle})`, routerLink: [dayDepotUrl]});
        });
        this.translateService.get('niopdcgatewayApp.sellGroundFuel.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        if (this.mainDayOperationId) {
            this.mainDayOperationService.find(this.mainDayOperationId)
                .subscribe((res: HttpResponse<MainDayOperation>) => {
                    this.mainDayOperation = res.body;
                });
        } else if (this.mainDayDepotId) {
            this.mainDayDepotService.find(this.mainDayDepotId)
                .subscribe((res: HttpResponse<MainDayDepot>) => {
                    this.mainDayDepot = res.body;
                });
        }

        this.registerChangeInSellGroundFuels();

        this.dayDepotService.find(this.dayDepotId).subscribe(
            (dayDepot: HttpResponse<DayDepot>) => {
                this.dayDepot = dayDepot.body;
                this.setBreadCrumb();
            }
        );

        if (this.mainDayDepotId != null) {
            this.mainDayDepotService.editable(this.mainDayDepotId).subscribe(res => {
                    this.editable = res;
                }
            );
        }
        if (this.mainDayOperationId != null) {
            this.mainDayOperationService.editable(this.mainDayOperationId).subscribe(res => {
                    this.editable = res;
                }
            );
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SellGroundFuel) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    registerChangeInSellGroundFuels() {
        this.eventSubscriber = this.eventManager.subscribe('sellGroundFuelListModification',response => this.loadAll());
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

            this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot', this.dayDepotId, 'sell-ground-fuel'], {
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
        this.sellGroundFuels = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
