import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {MainDayOperation} from './main-day-operation.model';
import {MainDayOperationPopupService} from './main-day-operation-popup.service';
import {MainDayOperationService} from './main-day-operation.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {RefuelCenter, RefuelCenterService} from '../refuel-center';

@Component({
    selector: 'jhi-main-day-operation-dialog',
    templateUrl: './main-day-operation-dialog.component.html'
})
export class MainDayOperationDialogComponent implements OnInit {

    mainDayOperation: MainDayOperation;
    isSaving: boolean;
    isView: boolean;
    isEdit: boolean;

    refuelCenters: RefuelCenter[];
    @ViewChild('editForm') editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private mainDayOperationService: MainDayOperationService,
                private refuelCenterService: RefuelCenterService,
                private hotKeyService: HotkeyService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.mainDayOperation.day = null;
        this.hotKeyService.add('enter', null, this.editForm, false);
        this.isView = View.isView;
        this.isEdit = this.mainDayOperation.id && !this.isView;
        this.isSaving = false;
        this.refuelCenterService.queryByNational(true)
            .subscribe((res: HttpResponse<RefuelCenter[]>) => {
                this.refuelCenters = res.body;
                if (this.refuelCenters.length === 1) {
                    this.mainDayOperation.refuelCenterId = this.refuelCenters[0].id;
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mainDayOperation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mainDayOperationService.update(this.mainDayOperation));
        } else {
            this.subscribeToSaveResponse(
                this.mainDayOperationService.create(this.mainDayOperation));
        }
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MainDayOperation>>) {
        result.subscribe((res: HttpResponse<MainDayOperation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MainDayOperation) {
        this.eventManager.broadcast({name: 'mainDayOperationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    public selectRefuelCenter() {
        this.mainDayOperationService.getLastOperationDay(this.mainDayOperation.refuelCenterId).subscribe(c =>
           this.mainDayOperation.day = c
        );

    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-main-day-operation-popup',
    template: ''
})
export class MainDayOperationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private mainDayOperationPopupService: MainDayOperationPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.mainDayOperationPopupService
                    .open(MainDayOperationDialogComponent as Component, params['id']);
            } else {
                this.mainDayOperationPopupService
                    .open(MainDayOperationDialogComponent as Component);
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
