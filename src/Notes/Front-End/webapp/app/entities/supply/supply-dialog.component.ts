import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Supply} from './supply.model';
import {SupplyPopupService} from './supply-popup.service';
import {SupplyService} from './supply.service';
import {Product, ProductService} from '../product';
import {Depot, DepotService} from '../depot';
import {Country, CountryService} from '../country';

@Component({
    selector: 'jhi-supply-dialog',
    templateUrl: './supply-dialog.component.html'
})
export class SupplyDialogComponent implements OnInit {

    supply: Supply;
    isSaving: boolean;
    isView: boolean;

    product: Product[];
    customProducts: any[];
    customDepot: any[];
    customCountry: any[];
    depot: Depot[];

    country: Country[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private supplyService: SupplyService,
        private productService: ProductService,
        private depotService: DepotService,
        private countryService: CountryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => {
                this.product = res.body;
                const productItem = {
                    value: '',
                    label: ''
                };
                this.customProducts = [];
                this.customProducts.push(productItem);
                for (let i = 0; i < this.product.length; i++) {
                    this.customProducts.push({
                        value: this.product[i].id,
                        label: this.product[i].title
                    });
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.depotService.query()
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.depot = res.body;
                const depotItem = {
                    value: '',
                    label: ''
                };
                this.customDepot = [];
                this.customDepot.push(depotItem);
                for (let i = 0; i < this.depot.length; i++) {
                    this.customDepot.push({
                        value: this.depot[i].id,
                        label: this.depot[i].title
                    });
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.countryService.query()
            .subscribe((res: HttpResponse<Country[]>) => {
                this.country = res.body;
                const countryItem = {
                    value: '',
                    label: ''
                };
                this.customCountry = [];
                this.customCountry.push(countryItem);
                for (let i = 0; i < this.country.length; i++) {
                    this.customCountry.push({
                        value: this.country[i].id,
                        label: this.country[i].name
                    });
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.supply.id !== undefined) {
            this.subscribeToSaveResponse(
                this.supplyService.update(this.supply));
        } else {
            this.subscribeToSaveResponse(
                this.supplyService.create(this.supply));
        }
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackDepotById(index: number, item: Depot) {
        return item.id;
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Supply>>) {
        result.subscribe((res: HttpResponse<Supply>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Supply) {
        this.eventManager.broadcast({name: 'supplyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-supply-popup',
    template: ''
})
export class SupplyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyPopupService: SupplyPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.supplyPopupService
                    .open(SupplyDialogComponent as Component, params['id']);
            } else {
                this.supplyPopupService
                    .open(SupplyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
