import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ChangeContainer, ChangeContainerType} from './change-container.model';
import {ChangeContainerPopupService} from './change-container-popup.service';
import {ChangeContainerService} from './change-container.service';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {DayDepotContainer, DayDepotContainerService} from '../day-depot-container';
import {DayDepot, DayDepotService} from '../day-depot';
import {OilTankContainer, OilTankContainerService} from '../oil-tank-container';
import {MainDayDepotService} from "app/entities/ao-entities/main-day-depot";
import {MainDayOperationService} from "app/entities/ao-entities/main-day-operation";

@Component({
    selector: 'jhi-change-container-dialog',
    templateUrl: './change-container-dialog.component.html'
})
export class ChangeContainerDialogComponent implements OnInit {
    dayDepotId: number;
    dayDepotContainerId: number;
    mainDayDepotId: number;
    mainDayOperationId: number;
    sources: DayDepotContainer[];
    targets: DayDepotContainer[];
    changeContainer: ChangeContainer;
    source: DayDepotContainer;
    target: DayDepotContainer;
    capacity: number;
    isSaving: boolean;
    isView: boolean;
    dayDepots: DayDepot[];
    ChangeContainerType = ChangeContainerType;
    dayDepot: DayDepot;
    dayDepotContainer: DayDepotContainer;
    @ViewChild('editForm') editForm: NgForm;
    daydepotcontainers: DayDepotContainer[];

    daydepots: DayDepot[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private changeContainerService: ChangeContainerService,
                private oilTankContainerService: OilTankContainerService,
                private dayDepotContainerService: DayDepotContainerService,
                private dayDepotService: DayDepotService,
                private mainDayDepotService: MainDayDepotService,
                private mainDayOperationService: MainDayOperationService,
                private hotKeyService: HotkeyService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.hotKeyService.add('enter', null, this.editForm, false);

        this.isView = View.isView;
        this.isSaving = false;
        this.fillData();
    }

    fillData() {
        this.dayDepotId = UsefulId.dayDepotId;
        this.dayDepotContainerId = UsefulId.dayDepotContainerId;
        if (this.changeContainer.id) {

        } else {
            if (this.dayDepotId) {

            } else if (this.dayDepotContainerId) {
                this.dayDepotContainerService.find(this.dayDepotContainerId)
                    .subscribe(value => {
                        this.sources = [];
                        this.changeContainer.sourceId = value.body.id;
                        this.source = value.body;
                        this.capacity = this.source.capacity;
                        this.sources.push(value.body);
                        this.onSourceChange(this.source.id);
                    });
            }
        }
    }

    onSourceChange(sourceId) {
        this.dayDepotContainerService.queryForTarget(sourceId).subscribe(value1 => {
            this.targets = value1.body;
            if (this.targets.length === 1) {
                this.changeContainer.targetId = this.targets[0].id;
            }
        });
        this.mainDayDepotService.find(this.source.mainDayDepotId)
            .subscribe(value => {
                this.dayDepotService.queryByRefuelCenterAndOilTank(value.body.refuelCenterId, 'UNIT')
                    .subscribe(value1 => {
                        this.dayDepots = value1.body;
                    });
            });
    }

    onChangeCount(data) {
        this.changeContainer.amount = data * this.capacity;
    }

    clear() {
        this.activeModal.dismiss('cancel');
        UsefulId.dayDepotContainerId = null;
        UsefulId.dayDepotId = null;
    }

    save() {
        this.isSaving = true;
        this.changeContainer.changeContainerType = this.ChangeContainerType[this.ChangeContainerType.WITH_CONTAINER];
        if (this.changeContainer.id !== undefined) {
            /* if (this.dayDepotContainerId) {
                 this.subscribeToSaveResponse(
                     this.changeContainerService.updateByDayDepotContainer(this.changeContainer));
             }
             /!*else if (this.dayDepotId) {
                            this.changeContainer.dayDepotContainerId = null;
                            this.subscribeToSaveResponse(
                                this.changeContainerService.updateByDayDepot(this.changeContainer));
                        }*!/
         } else {
             if (this.dayDepotContainerId) {*/
            this.subscribeToSaveResponse(
                this.changeContainerService.updateByDayDepot(this.changeContainer));
        } else {
            this.subscribeToSaveResponse(
                this.changeContainerService.createByDayDepot(this.changeContainer));
        }
    }

    trackOilTankContainerById(index: number, item: OilTankContainer) {
        return item.id;
    }

    trackDayDepotContainerById(index: number, item: DayDepotContainer) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChangeContainer>>) {
        result.subscribe((res: HttpResponse<ChangeContainer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChangeContainer) {
        this.eventManager.broadcast({name: 'changeContainerListModification', content: 'OK'});
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
    selector: 'jhi-change-container-popup',
    template: ''
})
export class ChangeContainerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private changeContainerPopupService: ChangeContainerPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['dayDepotContainerId']) {
                UsefulId.dayDepotContainerId = params['dayDepotContainerId'];
                this.changeContainerPopupService
                    .open(ChangeContainerDialogComponent as Component, null, params['dayDepotContainerId']);
            } else if (params['dayDepotId']) {
                UsefulId.dayDepotId = params['dayDepotId'];
                this.changeContainerPopupService
                    .open(ChangeContainerDialogComponent as Component, null, null, params['dayDepotId']);
            }
            if (params['parent'] === 'day-depot') {
                UsefulId.dayDepotId = params['parent-id'];
                this.changeContainerPopupService
                    .open(ChangeContainerDialogComponent as Component, params['id'], null, params['parent-id']);
            } else if (params['parent'] === 'day-depot-container') {
                UsefulId.dayDepotContainerId = params['parent-id'];
                this.changeContainerPopupService
                    .open(ChangeContainerDialogComponent as Component, params['id'], params['parent-id']);
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

class UsefulId {
    static dayDepotContainerId: number;
    static dayDepotId: number;
}
