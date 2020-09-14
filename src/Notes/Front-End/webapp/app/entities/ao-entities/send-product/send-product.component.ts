import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {SendProduct} from './send-product.model';
import {SendProductService} from './send-product.service';
import {Principal} from '../../../shared';
import {DayDepot, DayDepotService} from '../day-depot/.';
import {OilTank, OilTankService} from '../oil-tank/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {MainDayDepot} from '../main-day-depot/main-day-depot.model';
import {MainDayDepotService} from '../main-day-depot/main-day-depot.service';
import {Depot} from '../../depot/depot.model';
import {DepotService} from '../../depot/depot.service';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {getPath} from 'app/core/router';

@Component({
    selector: 'jhi-send-product',
    templateUrl: './send-product.component.html'
})
export class SendProductComponent implements OnInit, OnDestroy {

    currentAccount: any;
    sendProducts: SendProduct[];
    sendProduct: SendProduct = new SendProduct();
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
    dayDepotId: number;
    dayDepot: DayDepot;
    breadcrumbItems: any[];
    mainDayDepot: MainDayDepot;
    daydepots: DayDepot[];
    oiltanks: OilTank[];
    depots: Depot[];
    editable: Boolean;

    constructor(private sendProductService: SendProductService,
                private depotService: DepotService,
                private mainDayDepotService: MainDayDepotService,
                private oilTankService: OilTankService,
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
                    this.sendProduct[value[0]] = Number(value[1]);
                } else {
                    this.sendProduct[value[0]] = value[1];
                }
            }
        }
        this._hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'ins') {
                this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: ['send-product-new', this.dayDepotId]}}]);
                return false;
            }
        }));
    }

    loadAll() {
        this.sendProductService.query(this.dayDepotId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<SendProduct[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot/' + this.dayDepotId + '/send-product'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.sendProduct = new SendProduct();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.sendProduct.sendDate) {
            this.currentSearch += 'sendDate→' + this.sendProduct.sendDate + '&';
        }
        if (this.sendProduct.receivedDate) {
            this.currentSearch += 'receivedDate→' + this.sendProduct.receivedDate + '&';
        }
        if (this.sendProduct.sendEnvironmentTemperature) {
            this.currentSearch += 'sendEnvironmentTemperature☼' + this.sendProduct.sendEnvironmentTemperature + '&';
        }
        if (this.sendProduct.sendNatureAmount) {
            this.currentSearch += 'sendNatureAmount☼' + this.sendProduct.sendNatureAmount + '&';
        }
        if (this.sendProduct.sendSixtyAmount) {
            this.currentSearch += 'sendSixtyAmount☼' + this.sendProduct.sendSixtyAmount + '&';
        }
        if (this.sendProduct.sendSpecialWeight) {
            this.currentSearch += 'sendSpecialWeight☼' + this.sendProduct.sendSpecialWeight + '&';
        }
        if (this.sendProduct.sendProductTemperature) {
            this.currentSearch += 'sendProductTemperature☼' + this.sendProduct.sendProductTemperature + '&';
        }

        if (this.sendProduct.receivedEnvironmentTemperature) {
            this.currentSearch += 'receivedEnvironmentTemperature☼' + this.sendProduct.receivedEnvironmentTemperature + '&';
        }
        if (this.sendProduct.receivedNatureAmount) {
            this.currentSearch += 'receivedNatureAmount☼' + this.sendProduct.receivedNatureAmount + '&';
        }
        if (this.sendProduct.receivedSixtyAmount) {
            this.currentSearch += 'receivedSixtyAmount☼' + this.sendProduct.receivedSixtyAmount + '&';
        }
        if (this.sendProduct.receivedSpecialWeight) {
            this.currentSearch += 'receivedSpecialWeight☼' + this.sendProduct.receivedSpecialWeight + '&';
        }
        if (this.sendProduct.receivedProductTemperature) {
            this.currentSearch += 'receivedProductTemperature☼' + this.sendProduct.receivedProductTemperature + '&';
        }

        if (this.sendProduct.inventoryId) {
            this.currentSearch += 'inventoryId☼' + this.sendProduct.inventoryId + '&';
        }
        if (this.sendProduct.driverName) {
            this.currentSearch += 'driverName$' + this.sendProduct.driverName + '&';
        }
        if (this.sendProduct.vehicleId) {
            this.currentSearch += 'vehicleId$' + this.sendProduct.vehicleId + '&';
        }
        if (this.sendProduct.dayDepotId) {
            this.currentSearch += 'dayDepot.id☼' + this.sendProduct.dayDepotId + '&';
        }
        if (this.sendProduct.oilTankId) {
            this.currentSearch += 'oilTank.id☼' + this.sendProduct.oilTankId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot/' + this.dayDepotId + '/send-product'], {
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
        this.translateService.get('niopdcgatewayApp.sendProduct.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.depotService.query()
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.depots = res.body;
            });
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.dayDepotService.query().subscribe(
            (res: HttpResponse<DayDepot[]>) => {
                this.daydepots = res.body;
            }
        );
        this.oilTankService.query().subscribe(
            (res: HttpResponse<OilTank[]>) => {
                this.oiltanks = res.body;
            }
        );

        this.registerChangeInSendProducts();

        this.dayDepotService.find(this.dayDepotId).subscribe(
            (dayDepot: HttpResponse<DayDepot>) => {
                this.dayDepot = dayDepot.body;
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

    trackId(index: number, item: SendProduct) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    registerChangeInSendProducts() {
        this.eventSubscriber = this.eventManager.subscribe('sendProductListModification',response => this.loadAll());
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

            this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot', this.dayDepotId, 'send-product'], {
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
        this.sendProducts = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
