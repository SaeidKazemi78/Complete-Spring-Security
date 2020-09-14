import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ReceivedProductContainer} from './received-product-container.model';
import {ReceivedProductContainerService} from './received-product-container.service';
import {Principal} from '../../../shared';
import {OilTankContainer, OilTankContainerService} from '../oil-tank-container/.';
import {DayDepotContainer, DayDepotContainerService} from '../day-depot-container/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {MainDayDepotService} from '../main-day-depot/main-day-depot.service';
import {MainDayDepot} from '../main-day-depot/main-day-depot.model';
import {Product, ProductService} from '../../product';
import {Container, ContainerService} from '../../container';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';

@Component({
    selector: 'jhi-received-product-container',
    templateUrl: './received-product-container.component.html'
})
export class ReceivedProductContainerComponent implements OnInit, OnDestroy {

    currentAccount: any;
    receivedProductContainers: ReceivedProductContainer[];
    receivedProductContainer: ReceivedProductContainer = new ReceivedProductContainer();
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

    @ViewChild('editForm') editForm: NgForm;

    constructor(private receivedProductContainerService: ReceivedProductContainerService,
                private oilTankContainerService: OilTankContainerService,
                private dayDepotContainerService: DayDepotContainerService,
                private mainDayDepotService: MainDayDepotService,
                private productService: ProductService,
                private containerService: ContainerService,
                private parseLinks: JhiParseLinks,
                private maindayDepotService: MainDayDepotService,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private hotkeyService: HotkeyService,
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
                    this.receivedProductContainer[value[0]] = Number(value[1]);
                } else {
                    this.receivedProductContainer[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.receivedProductContainerService.query(this.dayDepotContainerId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<ReceivedProductContainer[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot-container/' + this.dayDepotContainerId + '/received-product-container'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.receivedProductContainer = new ReceivedProductContainer();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.receivedProductContainer.registerDate) {
            this.currentSearch += 'registerDate→' + this.receivedProductContainer.registerDate + '&';
        }
        if (this.receivedProductContainer.inventoryId) {
            this.currentSearch += 'inventoryId☼' + this.receivedProductContainer.inventoryId + '&';
        }
        if (this.receivedProductContainer.truckNumber) {
            this.currentSearch += 'truckNumber$' + this.receivedProductContainer.truckNumber + '&';
        }
        if (this.receivedProductContainer.truckSerial) {
            this.currentSearch += 'truckSerial$' + this.receivedProductContainer.truckSerial + '&';
        }
        if (this.receivedProductContainer.waybillNumber) {
            this.currentSearch += 'waybillNumber$' + this.receivedProductContainer.waybillNumber + '&';
        }
        if (this.receivedProductContainer.driverName) {
            this.currentSearch += 'driverName$' + this.receivedProductContainer.driverName + '&';
        }
        if (this.receivedProductContainer.contractorNumber) {
            this.currentSearch += 'contractorNumber☼' + this.receivedProductContainer.contractorNumber + '&';
        }
        if (this.receivedProductContainer.sendCount) {
            this.currentSearch += 'sendCount☼' + this.receivedProductContainer.sendCount + '&';
        }
        if (this.receivedProductContainer.receiveCount) {
            this.currentSearch += 'receiveCount☼' + this.receivedProductContainer.receiveCount + '&';
        }
        if (this.receivedProductContainer.description) {
            this.currentSearch += 'description$' + this.receivedProductContainer.description + '&';
        }
        if (this.receivedProductContainer.oilTankContainerId) {
            this.currentSearch += 'oilTankContainer.id☼' + this.receivedProductContainer.oilTankContainerId + '&';
        }
        if (this.receivedProductContainer.dayDepotContainerId) {
            this.currentSearch += 'dayDepotContainer.id☼' + this.receivedProductContainer.dayDepotContainerId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot-container/' + this.dayDepotContainerId + '/received-product-container'], {
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
        this.translateService.get('niopdcgatewayApp.receivedProductContainer.home.dayDepotContainerTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + `(${this.dayDepotContainerTitle})`,
                routerLink: [dayDepotContainerUrl]
            });
        });
        this.translateService.get('niopdcgatewayApp.receivedProductContainer.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.hotkeyService.add('ins', 'received-product-container-new/' + this.dayDepotContainerId, null, true);
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.maindayDepotService.find(this.mainDayDepotId)
            .subscribe(res => {
                this.mainDayDepot = res.body;
            });

        this.oilTankContainerService.query().subscribe(res => {
                this.oiltankcontainers = res.body;
            }
        );
        this.dayDepotContainerService.query(this.mainDayDepotId).subscribe(res => {
                this.daydepotcontainers = res.body;
            }
        );

        this.registerChangeInReceivedProductContainers();

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

    trackId(index: number, item: ReceivedProductContainer) {
        return item.id;
    }

    trackOilTankContainerById(index: number, item: OilTankContainer) {
        return item.id;
    }

    trackDayDepotContainerById(index: number, item: DayDepotContainer) {
        return item.id;
    }

    registerChangeInReceivedProductContainers() {
        this.eventSubscriber = this.eventManager.subscribe('receivedProductContainerListModification',response => this.loadAll());
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

            this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot-container', this.dayDepotContainerId, 'received-product-container'], {
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
        this.receivedProductContainers = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
