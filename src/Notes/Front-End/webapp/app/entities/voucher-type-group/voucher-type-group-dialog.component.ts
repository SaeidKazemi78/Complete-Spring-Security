import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VoucherTypeGroup } from './voucher-type-group.model';
import { VoucherTypeGroupPopupService } from './voucher-type-group-popup.service';
import { VoucherTypeGroupService } from './voucher-type-group.service';

@Component({
    selector: 'jhi-voucher-type-group-dialog',
    templateUrl: './voucher-type-group-dialog.component.html'
})
export class VoucherTypeGroupDialogComponent implements OnInit {

    voucherTypeGroup: VoucherTypeGroup;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
        private voucherTypeGroupService: VoucherTypeGroupService,
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
        if (this.voucherTypeGroup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.voucherTypeGroupService.update(this.voucherTypeGroup));
        } else {
            this.subscribeToSaveResponse(
                this.voucherTypeGroupService.create(this.voucherTypeGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VoucherTypeGroup>>) {
        result.subscribe((res: HttpResponse<VoucherTypeGroup>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VoucherTypeGroup) {
        this.eventManager.broadcast({ name: 'voucherTypeGroupListModification', content: 'OK'});
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
    selector: 'jhi-voucher-type-group-popup',
    template: ''
})
export class VoucherTypeGroupPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherTypeGroupPopupService: VoucherTypeGroupPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.voucherTypeGroupPopupService
                    .open(VoucherTypeGroupDialogComponent as Component, params['id']);
            } else {
                this.voucherTypeGroupPopupService
                    .open(VoucherTypeGroupDialogComponent as Component);
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
