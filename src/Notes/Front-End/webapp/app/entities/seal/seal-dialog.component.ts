import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Seal } from './seal.model';
import { SealPopupService } from './seal-popup.service';
import { SealService } from './seal.service';
import {RefuelCenter, RefuelCenterService} from "app/entities/ao-entities/refuel-center";

@Component({
    selector: 'jhi-seal-dialog',
    templateUrl: './seal-dialog.component.html'
})
export class SealDialogComponent implements OnInit {

    seal: Seal;
    isSaving: boolean;
    isView: boolean;



    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sealService: SealService,
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
        if (this.seal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sealService.update(this.seal));
        } else {
            this.subscribeToSaveResponse(
                this.sealService.create(this.seal));
        }
    }

private subscribeToSaveResponse(result: Observable<HttpResponse<Seal>>) {
        result.subscribe((res: HttpResponse<Seal>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

private onSaveSuccess(result: Seal) {
        this.eventManager.broadcast({ name: 'sealListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

private onSaveError() {
        this.isSaving = false;
    }

private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

            trackRefuelCenterById(index: number, item: RefuelCenter) {
                return item.id;
            }
}

@Component({
    selector: 'jhi-seal-popup',
    template: ''
})
export class SealPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sealPopupService: SealPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.sealPopupService
                    .open(SealDialogComponent as Component, params['id']);
            } else if (params['refuelCenterId'])  {
                this.sealPopupService
                    .open(SealDialogComponent as Component, null, params['refuelCenterId']);
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
