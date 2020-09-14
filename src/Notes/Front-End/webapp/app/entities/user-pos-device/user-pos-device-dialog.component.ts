import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserPosDevice } from './user-pos-device.model';
import { UserPosDevicePopupService } from './user-pos-device-popup.service';
import { UserPosDeviceService } from './user-pos-device.service';
import { PosDevice, PosDeviceService } from '../pos-device';

@Component({
    selector: 'jhi-user-pos-device-dialog',
    templateUrl: './user-pos-device-dialog.component.html'
})
export class UserPosDeviceDialogComponent implements OnInit {

    userPosDevice: UserPosDevice;
    isSaving: boolean;
    isView: boolean;
    posDevices: PosDevice[];
    posDeviceItems = [];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userPosDeviceService: UserPosDeviceService,
        private posDeviceService: PosDeviceService,
        private eventManager: JhiEventManager,

    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.posDeviceService.query()
            .subscribe((res: HttpResponse<PosDevice[]>) => {
                this.posDevices = res.body;
                this.posDeviceItems = [];
                this.posDeviceItems.push({'label': '', 'value': null});
                this.posDevices.forEach(pos => {
                    this.posDeviceItems.push({'label': pos.name, 'value': pos.id});
                });
                }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userPosDevice.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userPosDeviceService.update(this.userPosDevice));
        } else {
            this.subscribeToSaveResponse(
                this.userPosDeviceService.create(this.userPosDevice));
        }
    }

private subscribeToSaveResponse(result: Observable<HttpResponse<UserPosDevice>>) {
        result.subscribe((res: HttpResponse<UserPosDevice>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

private onSaveSuccess(result: UserPosDevice) {
        this.eventManager.broadcast({ name: 'userPosDeviceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

private onSaveError() {
        this.isSaving = false;
    }

private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

            trackPosDeviceById(index: number, item: PosDevice) {
                return item.id;
            }
}

@Component({
    selector: 'jhi-user-pos-device-popup',
    template: ''
})
export class UserPosDevicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userPosDevicePopupService: UserPosDevicePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.userPosDevicePopupService
                    .open(UserPosDeviceDialogComponent as Component, params['id']);
            } else {
                this.userPosDevicePopupService
                    .open(UserPosDeviceDialogComponent as Component);
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
