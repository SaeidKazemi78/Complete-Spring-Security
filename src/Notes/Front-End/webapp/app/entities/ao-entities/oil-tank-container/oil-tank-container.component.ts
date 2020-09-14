import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {OilTankContainer} from './oil-tank-container.model';
import {OilTankContainerService} from './oil-tank-container.service';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {Container, ContainerService} from '../../container';
import {Product, ProductService} from '../../product';
import {RefuelCenter, RefuelCenterService} from '../refuel-center';
import {Principal} from '../../../shared';
import {getPath} from 'app/core/router';

@Component({
    selector: 'jhi-oil-tank-container',
    templateUrl: './oil-tank-container.component.html'
})
export class OilTankContainerComponent implements OnInit, OnDestroy {

    isContainerFull: boolean;

    currentAccount: any;
    oilTankContainers: OilTankContainer[];
    oilTankContainer: OilTankContainer = new OilTankContainer();
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
    breadcrumbItems: any[];
    productUnits: Container[];
    products: Product[];
    basePath;

    refuelCenters: RefuelCenter[];

    constructor(private oilTankContainerService: OilTankContainerService,
                private productService: ProductService,
                private containerService: ContainerService,
                private refuelCenterService: RefuelCenterService,
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
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.activatedRoute.params.subscribe(params => {
            if (params['status']) {
                const containerType = params['status'];
                if (containerType === 'product-unit') {
                    this.isContainerFull = false;
                } else if (containerType === 'product') {
                    this.isContainerFull = true;
                }
                this.setBreadCrumb();
            }
            this.loadAll();
        });

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
                    this.oilTankContainer[value[0]] = Number(value[1]);
                } else {
                    this.oilTankContainer[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        if (this.isContainerFull) {
            this.oilTankContainerService.queryGetFullContainer({
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<OilTankContainer[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else if (!this.isContainerFull) {
            this.oilTankContainerService.queryGetEmptyContainer({
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<OilTankContainer[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        if (this.isContainerFull) {
            this.router.navigate(['/oil-tank-container/product', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else {
            this.router.navigate(['/oil-tank-container/product-unit', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.oilTankContainer = new OilTankContainer();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.oilTankContainer.productId) {
            this.currentSearch += 'productId☼' + this.oilTankContainer.productId + '&';
        }
        if (this.oilTankContainer.productUnitId) {
            this.currentSearch += 'productUnitId☼' + this.oilTankContainer.productUnitId + '&';
        }
        if (this.oilTankContainer.amount) {
            this.currentSearch += 'amount☼' + this.oilTankContainer.amount + '&';
        }
        if (this.oilTankContainer.refuelCenterId) {
            this.currentSearch += 'refuelCenter.id☼' + this.oilTankContainer.refuelCenterId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (this.isContainerFull) {
            this.router.navigate(['/oil-tank-container/product', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else {
            this.router.navigate(['/oil-tank-container/product-unit', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        if (this.isContainerFull) {
            this.translateService.get('niopdcgatewayApp.oilTankContainer.home.title').subscribe(title => {
                this.breadcrumbItems.push({label: title});
            });
        } else {
            this.translateService.get('niopdcgatewayApp.oilTankContainer.home.titleProductUnit').subscribe(title => {
                this.breadcrumbItems.push({label: title});
            });
        }
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(value => {
            this.basePath = ['/', ...getPath(this.router, '/').pathParts];
        });
        if (this.isContainerFull) {
            this.hotKeyService.add('ins', 'oil-tank-container-new/product', null, true);
        } else {
            this.hotKeyService.add('ins', 'oil-tank-container-new/container', null, true);
        }
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.refuelCenterService.query().subscribe(res => {
                this.refuelCenters = res.body;
            }
        );

        this.productService.queryByHasContainer(true)
            .subscribe(res => {
                this.products = res.body;
            });
        this.containerService.query()
            .subscribe(res => {
                this.productUnits = res.body;
            });
        this.registerChangeInOilTankContainers();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OilTankContainer) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    registerChangeInOilTankContainers() {
        this.eventSubscriber = this.eventManager.subscribe('oilTankContainerListModification', response => this.loadAll());
    }
    _gePath(popup) {
        return  [...this.basePath, popup] ;
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

            if (this.isContainerFull) {
                this.router.navigate(['/oil-tank-container/product'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            } else {
                this.router.navigate(['/oil-tank-container/product-unit'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            }
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.oilTankContainers = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
