import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {ExportPiPayment} from './export-pi-payment.model';
import {ExportPiPaymentPopupService} from './export-pi-payment-popup.service';
import {ExportPiPaymentService} from './export-pi-payment.service';
import {ExportPi, ExportPiService} from '../export-pi';

@Component({
    selector: 'jhi-export-pi-payment-dialog',
    templateUrl: './export-pi-payment-dialog.component.html'
})
export class ExportPiPaymentDialogComponent implements OnInit {

    exportPiPayment: ExportPiPayment;
    isSaving: boolean;
    isView: boolean;

    exportpi: ExportPi[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private exportPiPaymentService: ExportPiPaymentService,
        private exportPiService: ExportPiService,
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
        if (this.exportPiPayment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.exportPiPaymentService.update(this.exportPiPayment));
        } else {
            this.subscribeToSaveResponse(
                this.exportPiPaymentService.create(this.exportPiPayment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ExportPiPayment>>) {
        result.subscribe((res: HttpResponse<ExportPiPayment>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ExportPiPayment) {
        this.eventManager.broadcast({name: 'exportPiPaymentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackExportPiById(index: number, item: ExportPi) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-export-pi-payment-popup',
    template: ''
})
export class ExportPiPaymentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exportPiPaymentPopupService: ExportPiPaymentPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.exportPiPaymentPopupService
                    .open(ExportPiPaymentDialogComponent as Component, params['id']);
            } else if (params['exportPiId']) {
                this.exportPiPaymentPopupService
                    .open(ExportPiPaymentDialogComponent as Component, null, params['exportPiId']);
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
