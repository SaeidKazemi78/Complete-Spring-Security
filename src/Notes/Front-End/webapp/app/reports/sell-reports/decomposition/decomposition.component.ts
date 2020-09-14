import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {Decomposition, DecompositionRequest} from './decomposition.model';
import {DecompositionService} from './decomposition.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {Product, ProductService} from '../../../entities/product';
import {Depot, DepotService} from '../../../entities/depot';
import {BuyGroup} from '../../../entities/buy-type';
import {OrderStatus} from 'app/entities/order';

@Component({
    selector: 'jhi-decomposition',
    templateUrl: './decomposition.component.html'
})
export class DecompositionComponent implements OnInit, OnDestroy {

    currentAccount: any;
    decomposition: Decomposition[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: DecompositionRequest = new DecompositionRequest({});
    aggregates: any[] = [{field: 'count', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.decomposition, this.state);

    buyGroups: any = [];
    orderStatusOptions: any[] =[]
    depots: any;
    products: any;
    BuyGroup = BuyGroup;
    cols: string[] = [];

    allLocations = true;
    allRegions = true;
    allProducts = true;
    loading: boolean;
    allStatus = true;
    OrderStatus = OrderStatus;
    constructor(
        private decompositionService: DecompositionService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private productService: ProductService,
        private depotService: DepotService,
        private eventManager: JhiEventManager
    ) {
        for (const buyGroup in BuyGroup) {
            if (parseInt(buyGroup, 10) >= 0) {
                this.buyGroups.push({
                    label: this.translateService.instant('niopdcgatewayApp.BuyGroup.' + BuyGroup[buyGroup]),
                    value: BuyGroup[buyGroup]
                });
            }
        }

        for(const status in OrderStatus){
            if(isNaN(parseInt(status, 10)) &&
                status != this.OrderStatus[OrderStatus.PAID_PUMP] &&
                status != this.OrderStatus[OrderStatus.BORDER_CONFIRM] &&
                status != this.OrderStatus[OrderStatus.TICKET] &&
                status != this.OrderStatus[OrderStatus.WAY_BILL] &&
                status != this.OrderStatus[OrderStatus.BORDER_CONFIRM] &&
                status != this.OrderStatus[OrderStatus.CUSTOMS_CONFIRM]){
                this.orderStatusOptions.push({
                    label: this.translateService.instant('niopdcgatewayApp.OrderStatus.' + status),
                    value: status
                })
            }
        }
    }

    loadAll() {
        if (this.allProducts) {
            this.req.products = null;
        }
        if (this.allLocations) {
            this.req.locations = null;
        }
        if (this.allRegions) {
            this.req.regions = null;
        }
        if(this.allStatus ){
            this.req.statuses = null;
        }
        this.loading = true;
        this.decompositionService.query(this.req).subscribe(
            (res: HttpResponse<Decomposition[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.decomposition.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);
        this.setBreadCrumb();
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body.map((p: Product) => {
                    return {label: p.title, value: p.id};
                });
            }, (res: HttpErrorResponse) => this.onError(res.error));

        this.depotService.query()
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.depots = res.body.map(p => {
                    return {label: p.title, value: p.id};
                });
            }, (res: HttpErrorResponse) => this.onError(res.error));
    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.loading = false;
        this.decomposition = data;
        if (data && data.length && data.length > 0) {
            this.cols = Object.keys(data[0]).filter((value, index) => index > 3);
        } else {
            this.cols = [];
        }
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.decomposition, this.state);
    }

    private onError(error) {
        this.loading = false;
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
