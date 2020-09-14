import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {VoucherType} from './voucher-type.model';
import {VoucherTypePopupService} from './voucher-type-popup.service';
import {VoucherTypeService} from './voucher-type.service';
import {VoucherTypeGroup} from '../voucher-type-group';

@Component({
    selector: 'jhi-voucher-type-dialog',
    templateUrl: './voucher-type-dialog.component.html'
})
export class VoucherTypeDialogComponent implements OnInit {

    voucherType: VoucherType;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private voucherTypeService: VoucherTypeService,
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
        if (this.voucherType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.voucherTypeService.update(this.voucherType));
        } else {
            this.subscribeToSaveResponse(
                this.voucherTypeService.create(this.voucherType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VoucherType>>) {
        result.subscribe((res: HttpResponse<VoucherType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VoucherType) {
        this.eventManager.broadcast({name: 'voucherTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVoucherTypeGroupById(index: number, item: VoucherTypeGroup) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-voucher-type-popup',
    template: ''
})
export class VoucherTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherTypePopupService: VoucherTypePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.voucherTypePopupService
                    .open(VoucherTypeDialogComponent as Component, params['id']);
            } else if (params['voucherTypeGroupId']) {
                this.voucherTypePopupService
                    .open(VoucherTypeDialogComponent as Component, null, params['voucherTypeGroupId']);
            } else {
                this.voucherTypePopupService
                    .open(VoucherTypeDialogComponent as Component);
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
