import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import {ShiftWork} from './shift-work.model';
import {ShiftWorkPopupService} from './shift-work-popup.service';
import {ShiftWorkService} from './shift-work.service';
import {Location, LocationService} from '../location';

@Component({
    selector: 'jhi-shift-work-dialog',
    templateUrl: './shift-work-dialog.component.html'
})
export class ShiftWorkDialogComponent implements OnInit {

    shiftWork: ShiftWork;
    isSaving: boolean;
    isView: boolean;

    locations: Location[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private shiftWorkService: ShiftWorkService,
        private locationService: LocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.locationService.query()
            .subscribe((res: HttpResponse<Location[]>) => { this.locations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.shiftWork.id !== undefined) {
            this.subscribeToSaveResponse(
                this.shiftWorkService.update(this.shiftWork));
        } else {
            this.subscribeToSaveResponse(
                this.shiftWorkService.create(this.shiftWork));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ShiftWork>>) {
        result.subscribe((res: HttpResponse<ShiftWork>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ShiftWork) {
        this.eventManager.broadcast({ name: 'shiftWorkListModification', content: 'OK'});
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
    selector: 'jhi-shift-work-popup',
    template: ''
})
export class ShiftWorkPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shiftWorkPopupService: ShiftWorkPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.shiftWorkPopupService
                    .open(ShiftWorkDialogComponent as Component, params['id']);
            } else if (params['locationId']) {
                this.shiftWorkPopupService
                    .open(ShiftWorkDialogComponent as Component, null, params['locationId']);
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
