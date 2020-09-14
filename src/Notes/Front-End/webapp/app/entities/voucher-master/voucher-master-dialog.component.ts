import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {VoucherMaster} from './voucher-master.model';
import {VoucherMasterPopupService} from './voucher-master-popup.service';
import {VoucherMasterService} from './voucher-master.service';
import {VoucherType, VoucherTypeService} from '../voucher-type';

@Component({
    selector: 'jhi-voucher-master-dialog',
    templateUrl: './voucher-master-dialog.component.html'
})
export class VoucherMasterDialogComponent implements OnInit {

    voucherMaster: VoucherMaster;
    isSaving: boolean;
    isView: boolean;

    vouchertypes: VoucherType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private voucherMasterService: VoucherMasterService,
        private voucherTypeService: VoucherTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.voucherTypeService.query()
            .subscribe((res: HttpResponse<VoucherType[]>) => {
                this.vouchertypes = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.voucherMaster.id !== undefined) {
            this.subscribeToSaveResponse(
                this.voucherMasterService.update(this.voucherMaster));
        } else {
            this.subscribeToSaveResponse(
                this.voucherMasterService.create(this.voucherMaster));
        }
    }

    trackVoucherTypeById(index: number, item: VoucherType) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VoucherMaster>>) {
        result.subscribe((res: HttpResponse<VoucherMaster>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VoucherMaster) {
        this.eventManager.broadcast({name: 'voucherMasterListModification', content: 'OK'});
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
    selector: 'jhi-voucher-master-popup',
    template: ''
})
export class VoucherMasterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherMasterPopupService: VoucherMasterPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.voucherMasterPopupService
                    .open(VoucherMasterDialogComponent as Component, params['id']);
            } else {
                this.voucherMasterPopupService
                    .open(VoucherMasterDialogComponent as Component);
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
