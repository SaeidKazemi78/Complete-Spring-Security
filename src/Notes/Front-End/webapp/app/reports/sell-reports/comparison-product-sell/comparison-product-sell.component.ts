import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';
import {TranslateService} from '@ngx-translate/core';
import {Product, ProductService} from '../../../entities/product';
import {Comparison, ComparisonRequest} from 'app/reports/sell-reports/comparison-product-sell/comparison-product-sell.model';
import {DateJalaliPipe} from 'app/shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {ComparisonProductSellService} from 'app/reports/sell-reports/comparison-product-sell/comparison-product-sell.service';
import {CustomerType, CustomerTypeService} from "app/entities/customer-type";
import {Consumption, ConsumptionService} from "app/entities/consumption";

@Component({
    selector: 'jhi-comparison',
    templateUrl: './comparison-product-sell.component.html'
})
export class ComparisonProductSellComponent implements OnInit, OnDestroy {


    years: number[] = [];
    breadcrumbItems: any[];
    req: ComparisonRequest = new ComparisonRequest();
    comparisions : Comparison[];
    products: any;

    allLocations = true;
    allRegions = true;
    allProducts = true;
    allCustomerTypes = true;
    allConsumptions = true;
    loading: boolean;
    customerTypes: any;
    consumptions: any[];


    constructor(
        private comparisonProductSellService: ComparisonProductSellService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private productService: ProductService,
        private customerTypeService: CustomerTypeService,
        private consumptionService: ConsumptionService,
    ) {

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

        if (this.allCustomerTypes) {
            this.req.customerTypes = null;
        }

        if (this.allConsumptions) {
            this.req.consumptions = null;
        }


        this.loading = true;
        this.comparisonProductSellService.query(this.req).subscribe(
            (res: HttpResponse<Comparison[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.comparisonProductSellReport.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        const date = new Date();
        const persianDate = new DateJalaliPipe().transform(date);
        const year: number = persianDate.toString().split('/')[0];
        this.years.push(year - 4);
        this.years.push(year - 3);
        this.years.push(year - 2);
        this.years.push(year - 1);
        this.years.push(year);

        this.setBreadCrumb();
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body.map((p: Product) => {
                    return {label: p.title, value: p.id};
                });
            }, (res: HttpErrorResponse) => this.onError(res.error));

        this.customerTypeService.query()
            .subscribe((res: HttpResponse<CustomerType[]>) => {
                this.customerTypes = res.body.map((p: CustomerType) => {
                    return {label: p.title, value: p.id};
                });
            }, (res: HttpErrorResponse) => this.onError(res.error));

        this.consumptionService.query().subscribe(
            (res: HttpResponse<Consumption[]>) => {
                this.consumptions = res.body.map((p: Consumption) => {
                    return {label: p.title, value: p.id};
                });
            }, (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.loading = false;
        this.comparisions = data;

    }

    private onError(error) {
        this.loading = false;
        this.jhiAlertService.error(error.message, null, null);
    }

}
