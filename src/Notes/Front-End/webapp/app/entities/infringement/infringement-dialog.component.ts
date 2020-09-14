import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';

import {Infringement} from './infringement.model';
import {InfringementPopupService} from './infringement-popup.service';
import {InfringementService} from './infringement.service';
import {LocationService} from '../location/location.service';
import {Principal, UserType} from 'app/shared';
import {TranslateService} from '@ngx-translate/core';
import {Product, ProductService} from 'app/entities/product';
import {Location} from 'app/entities/location';
import {Customer, CustomerService} from 'app/entities/customer';

@Component({
    selector: 'jhi-infringement-dialog',
    templateUrl: './infringement-dialog.component.html'
})
export class InfringementDialogComponent implements OnInit {

    infringement: Infringement = new Infringement();
    isSaving: boolean;
    isView: boolean;
    text: any;
    userTypes: any[];
    fileUploading: boolean;
    UserType = UserType;
    customProducts: any[];
    products: Product[];
    customerId: number;
    customer: Customer;
    locations: Location[];
    customLocation: any[];

    constructor(public activeModal: NgbActiveModal,
                private dataUtils: JhiDataUtils,
                private jhiAlertService: JhiAlertService,
                private infringementService: InfringementService,
                private locationService: LocationService,
                private productService: ProductService,
                private customerService: CustomerService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private elementRef: ElementRef,
                private eventManager: JhiEventManager,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.principal.identity().then(value => {
            this.userTypes = value.userTypes;
        });
        this.isSaving = false;
        this.loadProducts();
        this.loadLocation();
    }

    loadLocation() {
        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;
                this.customLocation = [];
                this.customLocation.push({
                    value: '',
                    label: ''
                });
                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }
            });
    }

    loadProducts() {
        const customerGroup = 'BOUNDARY';
        this.productService.queryByCustomerGroup(customerGroup)
            .subscribe(res => {
                this.products = res.body;
                const product = {
                    value: '',
                    label: ''
                };
                this.customProducts = [];
                this.customProducts.push(product);
                for (let i = 0; i < this.products.length; i++) {
                    this.customProducts.push({
                        value: this.products[i].id,
                        label: this.products[i].title
                    });
                }
            }, res => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.infringement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.infringementService.update(this.infringement));
        } else {
            this.subscribeToSaveResponse(
                this.infringementService.create(this.infringement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Infringement>>) {
        result.subscribe((res: HttpResponse<Infringement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Infringement) {
        this.eventManager.broadcast({name: 'infringementListModification', content: 'OK'});
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
    selector: 'jhi-infringement-popup',
    template: ''
})
export class InfringementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private infringementPopupService: InfringementPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            if (params['id']) {
                this.infringementPopupService
                    .open(InfringementDialogComponent as Component, params['id']);
            } else {
                UsefulId.customerId = params['customerId'];

                this.infringementPopupService
                    .open(InfringementDialogComponent as Component, null, UsefulId.customerId);
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

class UsefulId {
    static customerId: number;
}
