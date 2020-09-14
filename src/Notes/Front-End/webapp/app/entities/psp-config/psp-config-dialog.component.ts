import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PspConfig } from './psp-config.model';
import { PspConfigPopupService } from './psp-config-popup.service';
import { PspConfigService } from './psp-config.service';

@Component({
    selector: 'jhi-psp-config-dialog',
    templateUrl: './psp-config-dialog.component.html'
})
export class PspConfigDialogComponent implements OnInit {

    pspConfig: PspConfig;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pspConfigService: PspConfigService,
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
        if (this.pspConfig.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pspConfigService.update(this.pspConfig));
        } else {
            this.subscribeToSaveResponse(
                this.pspConfigService.create(this.pspConfig));
        }
    }

private subscribeToSaveResponse(result: Observable<HttpResponse<PspConfig>>) {
        result.subscribe((res: HttpResponse<PspConfig>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

private onSaveSuccess(result: PspConfig) {
        this.eventManager.broadcast({ name: 'pspConfigListModification', content: 'OK'});
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
    selector: 'jhi-psp-config-popup',
    template: ''
})
export class PspConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pspConfigPopupService: PspConfigPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.pspConfigPopupService
                    .open(PspConfigDialogComponent as Component, params['id']);
            } else {
                this.pspConfigPopupService
                    .open(PspConfigDialogComponent as Component);
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
