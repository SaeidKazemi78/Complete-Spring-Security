import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerScore } from './customer-score.model';
import { CustomerScorePopupService } from './customer-score-popup.service';
import { CustomerScoreService } from './customer-score.service';
import { Customer, CustomerService } from '../customer';

@Component({
    selector: 'jhi-customer-score-dialog',
    templateUrl: './customer-score-dialog.component.html'
})
export class CustomerScoreDialogComponent implements OnInit {

    customerScore: CustomerScore;
    isSaving: boolean;
    isView: boolean;

        customers: Customer[];

    constructor(
        public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
        private customerScoreService: CustomerScoreService,
            private customerService: CustomerService,
    private eventManager: JhiEventManager
) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customerScore.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerScoreService.update(this.customerScore));
        } else {
            this.subscribeToSaveResponse(
                this.customerScoreService.create(this.customerScore));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerScore>>) {
        result.subscribe((res: HttpResponse<CustomerScore>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerScore) {
        this.eventManager.broadcast({ name: 'customerScoreListModification', content: 'OK'});
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
    selector: 'jhi-customer-score-popup',
    template: ''
})
export class CustomerScorePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerScorePopupService: CustomerScorePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.customerScorePopupService
                    .open(CustomerScoreDialogComponent as Component, params['id']);
            } else if (params['customerId'])  {
                this.customerScorePopupService
                    .open(CustomerScoreDialogComponent as Component, null, params['customerId']);
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
