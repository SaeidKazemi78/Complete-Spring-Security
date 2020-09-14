import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SealUse } from './seal-use.model';
import { SealUsePopupService } from './seal-use-popup.service';
import { SealUseService } from './seal-use.service';
import { Seal, SealService } from '../seal';
import { WayBill, WayBillService } from '../way-bill';

@Component({
    selector: 'jhi-seal-use-dialog',
    templateUrl: './seal-use-dialog.component.html'
})
export class SealUseDialogComponent implements OnInit {

    sealUse: SealUse;
    isSaving: boolean;

    seals: Seal[];

    waybills: WayBill[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sealUseService: SealUseService,
        private sealService: SealService,
        private wayBillService: WayBillService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
   }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sealUse.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sealUseService.update(this.sealUse));
        } else {
            this.subscribeToSaveResponse(
                this.sealUseService.create(this.sealUse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SealUse>>) {
        result.subscribe((res: HttpResponse<SealUse>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SealUse) {
        this.eventManager.broadcast({ name: 'sealUseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSealById(index: number, item: Seal) {
        return item.id;
    }

    trackWayBillById(index: number, item: WayBill) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-seal-use-popup',
    template: ''
})
export class SealUsePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sealUsePopupService: SealUsePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.sealUsePopupService
                    .open(SealUseDialogComponent as Component, params['id']);
            } else {
                this.sealUsePopupService
                    .open(SealUseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
