import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ReceivedProduct} from './received-product.model';
import {ReceivedProductService} from './received-product.service';
import {Principal} from '../../../shared/index';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {DayDepot} from '../day-depot/day-depot.model';
import {DayDepotService} from '../day-depot/day-depot.service';
import {MainDayDepot} from '../main-day-depot/main-day-depot.model';
import {MainDayDepotService} from '../main-day-depot/main-day-depot.service';
import {Depot} from '../../depot/depot.model';
import {DepotService} from '../../depot/depot.service';
import {Product} from '../../product/product.model';
import {ProductService} from '../../product/product.service';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {getPath} from 'app/core/router';

@Component({
    selector: 'jhi-received-product',
    templateUrl: './received-product.component.html'
})
export class ReceivedProductComponent implements OnInit, OnDestroy {

    currentAccount: any;
    receivedProducts: ReceivedProduct[];
    receivedProduct: ReceivedProduct = new ReceivedProduct();
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
    daydepots: DayDepot[];
    mainDayDepot: MainDayDepot;
    depots: Depot[];
    products: Product[];
    editable: Boolean;

    constructor(private receivedProductService: ReceivedProductService,
                private productService: ProductService,
                private depotService: DepotService,
                private mainDayDepotService: MainDayDepotService,
                private dayDepotService: DayDepotService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private eventManager: JhiEventManager,
                private _hotkeysService: HotkeysService) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
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
                    this.receivedProduct[value[0]] = Number(value[1]);
                } else {
                    this.receivedProduct[value[0]] = value[1];
                }
            }
        }
        this._hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'ins') {
                this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: ['received-product-new', this.dayDepotId]}}]);
                return false;
            }
        }));
    }

    loadAll() {
        this.receivedProductService.query(this.dayDepotId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<ReceivedProduct[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([`main-day-depot/${this.mainDayDepotId}/day-depot/${this.dayDepotId}/received-product`], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.receivedProduct = new ReceivedProduct();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.receivedProduct.registerDate) {
            this.currentSearch += 'registerDate→' + this.receivedProduct.registerDate + '&';
        }
        if (this.receivedProduct.receivedProductType) {
            this.currentSearch += 'receivedProductType#ReceivedProductType.' + this.receivedProduct.receivedProductType + '&';
        }
        if (this.receivedProduct.startDate) {
            this.currentSearch += 'startDate→' + this.receivedProduct.startDate + '&';
        }
        if (this.receivedProduct.finishDate) {
            this.currentSearch += 'finishDate→' + this.receivedProduct.finishDate + '&';
        }
        if (this.receivedProduct.productId) {
            this.currentSearch += 'productId☼' + this.receivedProduct.productId + '&';
        }
        if (this.receivedProduct.inventoryId) {
            this.currentSearch += 'inventoryId☼' + this.receivedProduct.inventoryId + '&';
        }
        if (this.receivedProduct.vehicleId) {
            this.currentSearch += 'vehicleId$' + this.receivedProduct.vehicleId + '&';
        }
        if (this.receivedProduct.waybillNumber) {
            this.currentSearch += 'waybillNumber$' + this.receivedProduct.waybillNumber + '&';
        }
        if (this.receivedProduct.driverName) {
            this.currentSearch += 'driverName$' + this.receivedProduct.driverName + '&';
        }
        if (this.receivedProduct.contractorNumber) {
            this.currentSearch += 'contractorNumber☼' + this.receivedProduct.contractorNumber + '&';
        }

        if (this.receivedProduct.sendProductTemperature) {
            this.currentSearch += 'sendProductTemperature☼' + this.receivedProduct.sendProductTemperature + '&';
        }
        if (this.receivedProduct.sendEnvironmentTemperature) {
            this.currentSearch += 'sendEnvironmentTemperature☼' + this.receivedProduct.sendEnvironmentTemperature + '&';
        }
        if (this.receivedProduct.sendNatureAmount) {
            this.currentSearch += 'sendNatureAmount☼' + this.receivedProduct.sendNatureAmount + '&';
        }
        if (this.receivedProduct.sendSixtyAmount) {
            this.currentSearch += 'sendSixtyAmount☼' + this.receivedProduct.sendSixtyAmount + '&';
        }
        if (this.receivedProduct.sendSpecialWeight) {
            this.currentSearch += 'sendSpecialWeight☼' + this.receivedProduct.sendSpecialWeight + '&';
        }

        if (this.receivedProduct.receivedEnvironmentTemperature) {
            this.currentSearch += 'receivedEnvironmentTemperature☼' + this.receivedProduct.receivedEnvironmentTemperature + '&';
        }
        if (this.receivedProduct.receivedNatureAmount) {
            this.currentSearch += 'receivedNatureAmount☼' + this.receivedProduct.receivedNatureAmount + '&';
        }
        if (this.receivedProduct.receivedSixtyAmount) {
            this.currentSearch += 'receivedSixtyAmount☼' + this.receivedProduct.receivedSixtyAmount + '&';
        }
        if (this.receivedProduct.receivedSpecialWeight) {
            this.currentSearch += 'receivedSpecialWeight☼' + this.receivedProduct.receivedSpecialWeight + '&';
        }
        if (this.receivedProduct.receivedProductTemperature) {
            this.currentSearch += 'receivedProductTemperature☼' + this.receivedProduct.receivedProductTemperature + '&';
        }

        if (this.receivedProduct.description) {
            this.currentSearch += 'description$' + this.receivedProduct.description + '&';
        }
        if (this.receivedProduct.dayDepotId) {
            this.currentSearch += 'dayDepot.id☼' + this.receivedProduct.dayDepotId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate([`main-day-depot/${this.mainDayDepotId}/day-depot/${this.dayDepotId}/received-product`], {
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
        const dateJalaliPipe = new DateJalaliPipe();
        const mainDayDepotUrl = '/main-day-depot';
        const dayDepotUrl = mainDayDepotUrl + '/' + this.mainDayDepotId + '/day-depot';
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.transfer.home.mainDayDepotTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: `${title} (${dateJalaliPipe.transform(this.mainDayDepot.day)})`,
                routerLink: [mainDayDepotUrl]
            });
        });
        this.translateService.get('niopdcgatewayApp.transfer.home.dayDepotTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title + `(${this.dayDepot.oilTankTitle})`, routerLink: [dayDepotUrl]});
        });
        this.translateService.get('niopdcgatewayApp.receivedProduct.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.dayDepotService.query().subscribe(res => {
                this.daydepots = res.body;
            }
        );
        this.depotService.query()
            .subscribe(res => {
                this.depots = res.body;
            });

        this.registerChangeInReceivedProducts();

        this.mainDayDepotService.find(this.mainDayDepotId)
            .subscribe(res => {
                this.mainDayDepot = res.body;
                this.dayDepotService.find(this.dayDepotId).subscribe(dayDepot => {
                        this.dayDepot = dayDepot.body;
                        this.setBreadCrumb();
                    }
                );
            });
        this.productService.query()
            .subscribe(res => {
                this.products = res.body;
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

    trackId(index: number, item: ReceivedProduct) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    registerChangeInReceivedProducts() {
        this.eventSubscriber = this.eventManager.subscribe('receivedProductListModification',response => this.loadAll());
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

            this.router.navigate([`main-day-depot/${this.mainDayDepotId}/day-depot/${this.dayDepotId}/received-product`], {
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
        this.receivedProducts = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
