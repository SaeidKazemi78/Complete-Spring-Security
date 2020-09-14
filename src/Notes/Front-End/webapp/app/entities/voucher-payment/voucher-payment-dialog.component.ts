import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {VoucherPayment} from './voucher-payment.model';
import {VoucherPaymentPopupService} from './voucher-payment-popup.service';
import {VoucherPaymentService} from './voucher-payment.service';
import {VoucherType, VoucherTypeService} from '../voucher-type';
import {Product} from '../product';
import {Customer, CustomerService} from '../customer';
import {LocationService} from '../location';

@Component({
    selector: 'jhi-voucher-payment-dialog',
    templateUrl: './voucher-payment-dialog.component.html'
})
export class VoucherPaymentDialogComponent implements OnInit {

    voucherPayment: VoucherPayment;
    isSaving: boolean;
    isView: boolean;

    vouchertypes: VoucherType[];
    allCustomers: any[];
    customers: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private customerService: CustomerService,
        private jhiAlertService: JhiAlertService,
        private voucherPaymentService: VoucherPaymentService,
        private voucherTypeService: VoucherTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.voucherTypeService.findByReferrer('VOUCHER_PAYMENT')
            .subscribe((res: HttpResponse<VoucherType[]>) => {
                this.vouchertypes = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.voucherPayment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.voucherPaymentService.update(this.voucherPayment));
        } else {
            this.subscribeToSaveResponse(
                this.voucherPaymentService.create(this.voucherPayment));
        }
    }

    locationChanged(data) {
        this.customerService.findByLocation(data).subscribe((products) => {
            this.allCustomers = products.body;
            if (this.voucherPayment.customerIds != null)
            this.voucherPayment.customerIds = this.voucherPayment.customerIds.filter((value) => this.allCustomers.find((valueC) => valueC.id === value));
            this.customers = [];
            this.allCustomers.forEach((value: Customer) => {
                const newVar = {
                    label: value.name,
                    value: value.id
                };
                this.customers.push(newVar);
            });
            console.log(this.customers);
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VoucherPayment>>) {
        result.subscribe((res: HttpResponse<VoucherPayment>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VoucherPayment) {
        this.eventManager.broadcast({name: 'voucherPaymentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVoucherTypeById(index: number, item: VoucherType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-voucher-payment-popup',
    template: ''
})
export class VoucherPaymentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherPaymentPopupService: VoucherPaymentPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.voucherPaymentPopupService
                    .open(VoucherPaymentDialogComponent as Component, params['id']);
            } else {
                this.voucherPaymentPopupService
                    .open(VoucherPaymentDialogComponent as Component);
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
