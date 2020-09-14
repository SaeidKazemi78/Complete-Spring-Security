import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {AccessType, UserRefuelCenter} from './user-refuel-center.model';
import {UserRefuelCenterPopupService} from './user-refuel-center-popup.service';
import {UserRefuelCenterService} from './user-refuel-center.service';
import {RefuelCenter, RefuelCenterService} from '../refuel-center/index';

@Component({
    selector: 'jhi-user-refuel-center-dialog',
    templateUrl: './user-refuel-center-dialog.component.html'
})
export class UserRefuelCenterDialogComponent implements OnInit {

    userRefuelCenter: UserRefuelCenter;
    isSaving: boolean;

    refuelCenters: any[];
    refuelCenterSelected: any;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private userRefuelCenterService: UserRefuelCenterService,
                private refuelCenterService: RefuelCenterService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userRefuelCenterService.findByUsername(this.userRefuelCenter.username)
            .subscribe(userRefuelCenter => {
                if (userRefuelCenter.body.id) {
                    this.userRefuelCenter = userRefuelCenter.body;
                }
                this.refuelCenterService.queryByReadAccess()
                    .subscribe(res => {
                        this.refuelCenters = res.body;
                        for (let i = 0; i < this.refuelCenters.length; i++) {
                            this.refuelCenters[i].label = this.refuelCenters[i].persianTitle;
                            this.refuelCenters[i].value = this.refuelCenters[i].id;
                        }
                        if (this.userRefuelCenter.id != null) {
                            this.refuelCenterSelected = [];
                            for (let i = 0; i < this.userRefuelCenter.refuelCenters.length; i++) {
                                this.refuelCenterSelected.push(this.userRefuelCenter.refuelCenters[i].id);
                            }
                        }
                    }, res => this.onError(res.body));
            });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    onChangeRefuelCenters(data) {
        this.userRefuelCenter.refuelCenters = [];
        for (let i = 0; i < this.refuelCenterSelected.length; i++) {
            for (let j = 0; j < this.refuelCenters.length; j++) {
                if (this.refuelCenterSelected[i] === this.refuelCenters[j].id) {
                    this.userRefuelCenter.refuelCenters[i] = this.refuelCenters[j];
                }
            }
        }
    }

    save() {
        this.isSaving = true;
        this.userRefuelCenter.accessType = AccessType[AccessType.ACCESS];
        if (this.userRefuelCenter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userRefuelCenterService.update(this.userRefuelCenter));
        } else {
            this.subscribeToSaveResponse(
                this.userRefuelCenterService.create(this.userRefuelCenter));
        }
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserRefuelCenter>>) {
        result.subscribe((res: HttpResponse<UserRefuelCenter>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserRefuelCenter) {
        this.eventManager.broadcast({name: 'userRefuelCenterListModification', content: 'OK'});
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
    selector: 'jhi-user-refuel-center-popup',
    template: ''
})
export class UserRefuelCenterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private userRefuelCenterPopupService: UserRefuelCenterPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['username']) {
                this.userRefuelCenterPopupService
                    .open(UserRefuelCenterDialogComponent as Component, params['username']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
