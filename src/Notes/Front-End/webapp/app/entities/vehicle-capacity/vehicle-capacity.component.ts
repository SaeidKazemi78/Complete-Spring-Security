import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {VehicleCapacity} from './vehicle-capacity.model';
import {VehicleCapacityService} from './vehicle-capacity.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {VehicleModel, VehicleModelService} from '../vehicle-model/.';
import {Product, ProductService} from '../product/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {CustomerGroup} from '../customer-type';

@Component({
    selector: 'jhi-vehicle-capacity',
    templateUrl: './vehicle-capacity.component.html'
})
export class VehicleCapacityComponent implements OnInit, OnDestroy {

    currentAccount: any;
    vehicleCapacities: VehicleCapacity[];
    vehicleCapacity: VehicleCapacity = new VehicleCapacity();
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
    vehicleModelId: number;
    vehicleModel: VehicleModel;
    breadcrumbItems: any[];
    vehiclemodels: VehicleModel[];
    products: Product[];

    constructor(
        private vehicleCapacityService: VehicleCapacityService,
        private productService: ProductService,
        private vehicleModelService: VehicleModelService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.vehicleModelId = activatedRoute.snapshot.params['vehicleModelId'];

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
                    this.vehicleCapacity[value[0]] = Number(value[1]);
                } else {
                    this.vehicleCapacity[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.vehicleCapacityService.query(this.vehicleModelId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<VehicleCapacity[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['vehicle-model/' + this.vehicleModelId + '/vehicle-capacity'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.vehicleCapacity = new VehicleCapacity();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.vehicleCapacity.capacity) {
            this.currentSearch += 'capacity☼' + this.vehicleCapacity.capacity + '&';
        }
        if (this.vehicleCapacity.vehicleModelId) {
            this.currentSearch += 'vehicleModel.id☼' + this.vehicleCapacity.vehicleModelId + '&';
        }
        if (this.vehicleCapacity.productId) {
            this.currentSearch += 'product.id☼' + this.vehicleCapacity.productId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['vehicle-model/' + this.vehicleModelId + '/vehicle-capacity'], {
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
        this.translateService.get('niopdcgatewayApp.vehicleCapacity.home.vehicleModelTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title + ` (${this.vehicleModel.title})`, routerLink: ['/vehicle-model']});
        });
        this.translateService.get('niopdcgatewayApp.vehicleCapacity.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.productService.queryByCustomerGroup(CustomerGroup[CustomerGroup.BOUNDARY]).subscribe(res => {
                this.products = res.body;
            }
        );

        this.registerChangeInVehicleCapacities();

        this.vehicleModelService.find(this.vehicleModelId).subscribe(vehicleModel => {
                this.vehicleModel = vehicleModel.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: VehicleCapacity) {
        return item.id;
    }

    trackVehicleModelById(index: number, item: VehicleModel) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    registerChangeInVehicleCapacities() {
        this.eventSubscriber = this.eventManager.subscribe('vehicleCapacityListModification',response => this.loadAll());
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
            this.reverse != reverse) {

            this.router.navigate(['vehicle-model', this.vehicleModelId, 'vehicle-capacity'], {
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
        this.vehicleCapacities = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
