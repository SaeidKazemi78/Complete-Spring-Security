import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DayDepotContainer} from './day-depot-container.model';
import {DayDepotContainerPopupService} from './day-depot-container-popup.service';
import {DayDepotContainerService} from './day-depot-container.service';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {OilTankContainer, OilTankContainerService} from '../oil-tank-container';
import {MainDayDepot, MainDayDepotService} from '../main-day-depot';

@Component({
    selector: 'jhi-day-depot-container-dialog',
    templateUrl: './day-depot-container-dialog.component.html'
})
export class DayDepotContainerDialogComponent implements OnInit {

    dayDepotContainer: DayDepotContainer;
    isSaving: boolean;
    isView: boolean;

    oiltankcontainers: OilTankContainer[];

    maindaydepots: MainDayDepot[];
    @ViewChild('editForm') editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private dayDepotContainerService: DayDepotContainerService,
                private oilTankContainerService: OilTankContainerService,
                private mainDayDepotService: MainDayDepotService,
                private hotkeyService: HotkeyService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.hotkeyService.add('enter', null, this.editForm, false);
        this.isView = View.isView;
        this.isSaving = false;
        this.oilTankContainerService.query()
            .subscribe((res: HttpResponse<OilTankContainer[]>) => {
                this.oiltankcontainers = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.mainDayDepotService.query()
            .subscribe((res: HttpResponse<MainDayDepot[]>) => {
                this.maindaydepots = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.initDayDepotContainer();
    }

    initDayDepotContainer() {
        if (!this.dayDepotContainer.addition) {
            this.dayDepotContainer.addition = 0;
        }
        if (!this.dayDepotContainer.deductible) {
            this.dayDepotContainer.deductible = 0;
        }
        if (!this.dayDepotContainer.systemAmount) {
            this.dayDepotContainer.systemAmount = 0;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dayDepotContainer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dayDepotContainerService.update(this.dayDepotContainer));
        } else {
            this.subscribeToSaveResponse(
                this.dayDepotContainerService.create(this.dayDepotContainer));
        }
    }

    trackOilTankContainerById(index: number, item: OilTankContainer) {
        return item.id;
    }

    trackMainDayDepotById(index: number, item: MainDayDepot) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DayDepotContainer>>) {
        result.subscribe((res: HttpResponse<DayDepotContainer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DayDepotContainer) {
        this.eventManager.broadcast({name: 'dayDepotContainerListModification', content: 'OK'});
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
    selector: 'jhi-day-depot-container-popup',
    template: ''
})
export class DayDepotContainerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private dayDepotContainerPopupService: DayDepotContainerPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.dayDepotContainerPopupService
                    .open(DayDepotContainerDialogComponent as Component, params['id']);
            } else if (params['mainDayDepotId']) {
                this.dayDepotContainerPopupService
                    .open(DayDepotContainerDialogComponent as Component, null, params['mainDayDepotId']);
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
