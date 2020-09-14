import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TransferType} from './transfer-type.model';
import {TransferTypePopupService} from './transfer-type-popup.service';
import {TransferTypeService} from './transfer-type.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../shared/hotkey/HotkeyService';
import {OilTankType} from '../ao-entities/oil-tank';

@Component({
    selector: 'jhi-transfer-type-dialog',
    templateUrl: './transfer-type-dialog.component.html'
})
export class TransferTypeDialogComponent implements OnInit {

    transferType: TransferType;
    isSaving: boolean;
    isView: boolean;
    disableTransferTo: boolean;
    showTarget: boolean;
    showSource: boolean;
    OilTankType = OilTankType;
    @ViewChild('editForm') editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private transferTypeService: TransferTypeService,
                private hotKeyService: HotkeyService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.hotKeyService.add('enter', null, this.editForm, false);
        this.showSource = false;
        this.showTarget = false;
        this.isView = View.isView;
        this.isSaving = false;
        if (this.transferType.id) {
            this.transferFromHandle(this.transferType.transferFrom);
            this.transferToHandle(this.transferType.transferTo);
            this.transferToSelfHandle(null);
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transferType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transferTypeService.update(this.transferType));
        } else {
            this.subscribeToSaveResponse(
                this.transferTypeService.create(this.transferType));
        }
    }

    transferFromHandle(obj) {
        if (obj !== this.OilTankType[this.OilTankType.UNIT] && obj !== this.OilTankType[this.OilTankType.PLATFORM] && obj !== this.OilTankType[this.OilTankType.PIPE]) {
            this.transferType.activeMetre = null;
        }
        this.showSource = obj === 'UNIT' || obj === 'PLATFORM' || obj === 'PIPE';
    }

    transferToHandle(obj) {
        if (obj !== this.OilTankType[this.OilTankType.UNIT] && obj !== this.OilTankType[this.OilTankType.PLATFORM]) {
            this.transferType.activeMetre = null;
        }
        this.showTarget = obj === 'UNIT' || obj === 'PLATFORM';
    }

    transferToSelfHandle(obj) {
        if (this.transferType.transferToHimself) {
            this.transferType.transferTo = null;
            this.transferType.activeMetre = null;
            this.disableTransferTo = true;
            this.transferToHandle(this.transferType.transferTo);
        } else {
            this.disableTransferTo = false;
        }

    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TransferType>>) {
        result.subscribe((res: HttpResponse<TransferType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TransferType) {
        this.eventManager.broadcast({name: 'transferTypeListModification', content: 'OK'});
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
    selector: 'jhi-transfer-type-popup',
    template: ''
})
export class TransferTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private transferTypePopupService: TransferTypePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.transferTypePopupService
                    .open(TransferTypeDialogComponent as Component, params['id']);
            } else {
                this.transferTypePopupService
                    .open(TransferTypeDialogComponent as Component);
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
