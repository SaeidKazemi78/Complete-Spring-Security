import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerCapacity } from './customer-capacity.model';
import { CustomerCapacityPopupService } from './customer-capacity-popup.service';
import { CustomerCapacityService } from './customer-capacity.service';
import { Customer, CustomerService } from '../customer';
import { ProductGroup, ProductGroupService } from '../product-group';

@Component({
    selector: 'jhi-customer-capacity-dialog',
    templateUrl: './customer-capacity-dialog.component.html'
})
export class CustomerCapacityDialogComponent implements OnInit {

    customerCapacity: CustomerCapacity;
    isSaving: boolean;
    isView: boolean;

        customer: Customer[];

        productgroups: ProductGroup[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerCapacityService: CustomerCapacityService,
        private customerService: CustomerService,
        private productGroupService: ProductGroupService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customer = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productGroupService.query()
            .subscribe((res: HttpResponse<ProductGroup[]>) => { this.productgroups = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customerCapacity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerCapacityService.update(this.customerCapacity));
        } else {
            this.subscribeToSaveResponse(
                this.customerCapacityService.create(this.customerCapacity));
        }
    }

private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerCapacity>>) {
        result.subscribe((res: HttpResponse<CustomerCapacity>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

private onSaveSuccess(result: CustomerCapacity) {
        this.eventManager.broadcast({ name: 'customerCapacityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

private onSaveError() {
        this.isSaving = false;
    }

private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

            trackCustomerById(index: number, item: Customer) {
                return item.id;
            }

            trackProductGroupById(index: number, item: ProductGroup) {
                return item.id;
            }
}

@Component({
    selector: 'jhi-customer-capacity-popup',
    template: ''
})
export class CustomerCapacityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerCapacityPopupService: CustomerCapacityPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.customerCapacityPopupService
                    .open(CustomerCapacityDialogComponent as Component, params['id']);
            } else if (params['customerId'])  {
                this.customerCapacityPopupService
                    .open(CustomerCapacityDialogComponent as Component, null, params['customerId']);
            } else { console.log('not be'); }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class View {
    static isView: boolean;
}
