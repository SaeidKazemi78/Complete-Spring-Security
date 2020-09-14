import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CeilingQuota} from './ceiling-quota.model';
import {CeilingQuotaPopupService} from './ceiling-quota-popup.service';
import {CeilingQuotaService} from './ceiling-quota.service';
import {CustomerCredit, CustomerCreditService} from '../customer-credit';

@Component({
    selector: 'jhi-ceiling-quota-dialog',
    templateUrl: './ceiling-quota-dialog.component.html'
})
export class CeilingQuotaDialogComponent implements OnInit {

    ceilingQuota: CeilingQuota;
    isSaving: boolean;
    isView: boolean;

    customercredits: CustomerCredit[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ceilingQuotaService: CeilingQuotaService,
        private customerCreditService: CustomerCreditService,
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
        if (this.ceilingQuota.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ceilingQuotaService.update(this.ceilingQuota));
        } else {
            this.subscribeToSaveResponse(
                this.ceilingQuotaService.create(this.ceilingQuota));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CeilingQuota>>) {
        result.subscribe((res: HttpResponse<CeilingQuota>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CeilingQuota) {
        this.eventManager.broadcast({name: 'ceilingQuotaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerCreditById(index: number, item: CustomerCredit) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ceiling-quota-popup',
    template: ''
})
export class CeilingQuotaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ceilingQuotaPopupService: CeilingQuotaPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.ceilingQuotaPopupService
                    .open(CeilingQuotaDialogComponent as Component, params['customerId'], params['id']);
            } else if (params['customerCreditId']) {
                this.ceilingQuotaPopupService
                    .open(CeilingQuotaDialogComponent as Component, params['customerId'], null, params['customerCreditId']);
            } else {
                console.log('not be');
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
