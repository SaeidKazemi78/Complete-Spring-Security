import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerVisit } from './customer-visit.model';
import { CustomerVisitPopupService } from './customer-visit-popup.service';
import { CustomerVisitService } from './customer-visit.service';
import { Customer, CustomerService } from '../customer';
import {EditorModule} from 'primeng/editor';

@Component({
    selector: 'jhi-customer-visit-dialog',
    templateUrl: './customer-visit-dialog.component.html'
})
export class CustomerVisitDialogComponent implements OnInit {

    customerVisit: CustomerVisit;
    isSaving: boolean;
    isView: boolean;


    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerVisitService: CustomerVisitService,
        private customerService: CustomerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
            }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customerVisit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerVisitService.update(this.customerVisit));
        } else {
            this.subscribeToSaveResponse(
                this.customerVisitService.create(this.customerVisit));
        }
    }

private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerVisit>>) {
        result.subscribe((res: HttpResponse<CustomerVisit>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

private onSaveSuccess(result: CustomerVisit) {
        this.eventManager.broadcast({ name: 'customerVisitListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-customer-visit-popup',
    template: ''
})
export class CustomerVisitPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerVisitPopupService: CustomerVisitPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.customerVisitPopupService
                    .open(CustomerVisitDialogComponent as Component, params['id']);
            } else if (params['customerId'])  {
                this.customerVisitPopupService
                    .open(CustomerVisitDialogComponent as Component, null, params['customerId']);
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
