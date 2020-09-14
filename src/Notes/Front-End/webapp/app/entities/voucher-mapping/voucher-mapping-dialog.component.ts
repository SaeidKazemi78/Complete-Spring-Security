import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {VoucherMapping} from './voucher-mapping.model';
import {VoucherMappingPopupService} from './voucher-mapping-popup.service';
import {VoucherMappingService} from './voucher-mapping.service';
import {BaseQuery, BaseQueryService} from '../base-query';
import {VoucherTemplate} from '../voucher-template';

@Component({
    selector: 'jhi-voucher-mapping-dialog',
    templateUrl: './voucher-mapping-dialog.component.html'
})
export class VoucherMappingDialogComponent implements OnInit {

    voucherMapping: VoucherMapping;
    isSaving: boolean;
    isView: boolean;

    basequeries: BaseQuery[];

    vouchertemplates: VoucherTemplate[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private voucherMappingService: VoucherMappingService,
        private baseQueryService: BaseQueryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.baseQueryService.query()
            .subscribe((res: HttpResponse<BaseQuery[]>) => {
                this.basequeries = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.voucherMapping.id !== undefined) {
            this.subscribeToSaveResponse(
                this.voucherMappingService.update(this.voucherMapping));
        } else {
            this.subscribeToSaveResponse(
                this.voucherMappingService.create(this.voucherMapping));
        }
    }

    trackVoucherTemplateById(index: number, item: VoucherTemplate) {
        return item.id;
    }

    trackBaseQueryById(index: number, item: BaseQuery) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VoucherMapping>>) {
        result.subscribe((res: HttpResponse<VoucherMapping>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VoucherMapping) {
        this.eventManager.broadcast({name: 'voucherMappingListModification', content: 'OK'});
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
    selector: 'jhi-voucher-mapping-popup',
    template: ''
})
export class VoucherMappingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherMappingPopupService: VoucherMappingPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.voucherMappingPopupService
                    .open(VoucherMappingDialogComponent as Component, params['id']);
            } else {
                this.voucherMappingPopupService
                    .open(VoucherMappingDialogComponent as Component);
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
