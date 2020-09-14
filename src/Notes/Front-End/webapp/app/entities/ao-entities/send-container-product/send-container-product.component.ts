import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {SendContainerProduct} from './send-container-product.model';
import {SendContainerProductService} from './send-container-product.service';
import {Principal} from '../../../shared/index';
import {OilTankContainer, OilTankContainerService} from '../oil-tank-container/index';
import {DayDepotContainer, DayDepotContainerService} from '../day-depot-container/index';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {MainDayDepot, MainDayDepotService} from '../main-day-depot/index';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Product, ProductService} from '../../product/index';
import {Container, ContainerService} from '../../container/index';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';

@Component({
    selector: 'jhi-send-container-product',
    templateUrl: './send-container-product.component.html'
})
export class SendContainerProductComponent implements OnInit, OnDestroy {

    currentAccount: any;
    sendContainerProducts: SendContainerProduct[];
    sendContainerProduct: SendContainerProduct = new SendContainerProduct();
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
    dayDepotContainerId: number;
    dayDepotContainer: DayDepotContainer;
    breadcrumbItems: any[];
    dayDepotContainerTitle: string;

    oiltankcontainers: OilTankContainer[];
    daydepotcontainers: DayDepotContainer[];
    editable: Boolean;

    constructor(private sendContainerProductService: SendContainerProductService,
                private mainDayDepotService: MainDayDepotService,
                private oilTankContainerService: OilTankContainerService,
                private productService: ProductService,
                private containerService: ContainerService,
                private dayDepotContainerService: DayDepotContainerService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private hotKeyService: HotkeyService,
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
        this.mainDayDepotId = activatedRoute.snapshot.params['mainDayDepotId'];
        this.dayDepotContainerId = activatedRoute.snapshot.params['dayDepotContainerId'];

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
                    this.sendContainerProduct[value[0]] = Number(value[1]);
                } else {
                    this.sendContainerProduct[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.sendContainerProductService.query(this.dayDepotContainerId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<SendContainerProduct[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot-container/' + this.dayDepotContainerId + '/send-container-product'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.sendContainerProduct = new SendContainerProduct();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.sendContainerProduct.sendDate) {
            this.currentSearch += 'sendDate→' + this.sendContainerProduct.sendDate + '&';
        }
        if (this.sendContainerProduct.receivedDate) {
            this.currentSearch += 'receivedDate→' + this.sendContainerProduct.receivedDate + '&';
        }
        if (this.sendContainerProduct.sendAmount) {
            this.currentSearch += 'sendAmount☼' + this.sendContainerProduct.sendAmount + '&';
        }
        if (this.sendContainerProduct.receivedAmount) {
            this.currentSearch += 'receivedAmount☼' + this.sendContainerProduct.receivedAmount + '&';
        }
        if (this.sendContainerProduct.sendCount) {
            this.currentSearch += 'sendCount☼' + this.sendContainerProduct.sendCount + '&';
        }
        if (this.sendContainerProduct.receivedCount) {
            this.currentSearch += 'receivedCount☼' + this.sendContainerProduct.receivedCount + '&';
        }
        if (this.sendContainerProduct.waybillNumber) {
            this.currentSearch += 'waybillNumber$' + this.sendContainerProduct.waybillNumber + '&';
        }
        if (this.sendContainerProduct.inventoryId) {
            this.currentSearch += 'inventoryId☼' + this.sendContainerProduct.inventoryId + '&';
        }
        if (this.sendContainerProduct.driverName) {
            this.currentSearch += 'driverName$' + this.sendContainerProduct.driverName + '&';
        }
        if (this.sendContainerProduct.truckNumber) {
            this.currentSearch += 'truckNumber$' + this.sendContainerProduct.truckNumber + '&';
        }
        if (this.sendContainerProduct.truckSerial) {
            this.currentSearch += 'truckSerial$' + this.sendContainerProduct.truckSerial + '&';
        }
        if (this.sendContainerProduct.oilTankContainerId) {
            this.currentSearch += 'oilTankContainer.id☼' + this.sendContainerProduct.oilTankContainerId + '&';
        }
        if (this.sendContainerProduct.dayDepotContainerId) {
            this.currentSearch += 'dayDepotContainer.id☼' + this.sendContainerProduct.dayDepotContainerId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot-container/' + this.dayDepotContainerId + '/send-container-product'], {
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
        const dayDepotContainerUrl = mainDayDepotUrl + '/' + this.mainDayDepotId + '/day-depot-container';
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.transfer.home.mainDayDepotTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: [mainDayDepotUrl]});
        });
        this.translateService.get('niopdcgatewayApp.sendContainerProduct.home.dayDepotContainerTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + `(${this.dayDepotContainerTitle})`,
                routerLink: [dayDepotContainerUrl]
            });
        });
        this.translateService.get('niopdcgatewayApp.sendContainerProduct.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.hotKeyService.add('ins', 'send-container-product-new/' + this.dayDepotContainerId, null, true);
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.mainDayDepotService.find(this.mainDayDepotId)
            .subscribe((res: HttpResponse<MainDayDepot>) => {
                this.mainDayDepot = res.body;
            });

        this.oilTankContainerService.query().subscribe(
            (res: HttpResponse<OilTankContainer[]>) => {
                this.oiltankcontainers = res.body;
            }
        );
        this.dayDepotContainerService.query(this.mainDayDepotId).subscribe(
            (res: HttpResponse<DayDepotContainer[]>) => {
                this.daydepotcontainers = res.body;
            }
        );

        this.registerChangeInSendContainerProducts();

        this.dayDepotContainerService.find(this.dayDepotContainerId).subscribe(
            (dayDepotContainer: HttpResponse<DayDepotContainer>) => {
                this.dayDepotContainer = dayDepotContainer.body;
                this.oilTankContainerService.find(this.dayDepotContainer.oilTankContainerId)
                    .subscribe((oilTankContainer: HttpResponse<OilTankContainer>) => {
                        if (oilTankContainer.body.productId) {
                            this.productService.find(oilTankContainer.body.productId)
                                .subscribe((product: HttpResponse<Product>) => {
                                    this.dayDepotContainerTitle = product.body.title;
                                    this.setBreadCrumb();
                                });
                        } else {
                            this.containerService.find(oilTankContainer.body.productUnitId)
                                .subscribe((container: HttpResponse<Container>) => {
                                    this.dayDepotContainerTitle = container.body.title;
                                    this.setBreadCrumb();
                                });
                        }
                    });
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

    trackId(index: number, item: SendContainerProduct) {
        return item.id;
    }

    trackOilTankContainerById(index: number, item: OilTankContainer) {
        return item.id;
    }

    registerChangeInSendContainerProducts() {
        this.eventSubscriber = this.eventManager.subscribe('sendContainerProductListModification',response => this.loadAll());
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

            this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot-container', this.dayDepotContainerId, 'send-container-product'], {
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
        this.sendContainerProducts = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
