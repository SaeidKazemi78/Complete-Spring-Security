import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ServiceOilTank} from './service-oil-tank.model';
import {ServiceOilTankPopupService} from './service-oil-tank-popup.service';
import {ServiceOilTankService} from './service-oil-tank.service';
import {OilTank, OilTankService} from '../oil-tank/index';
import {Product} from '../../product/index';
import {DayDepotService} from '../day-depot/index';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';

@Component({
    selector: 'jhi-service-oil-tank-dialog',
    templateUrl: './service-oil-tank-dialog.component.html'
})
export class ServiceOilTankDialogComponent implements OnInit {

    serviceOilTank: ServiceOilTank;
    isSaving: boolean;
    isView: boolean;
    saveDialog: boolean;

    oiltanks: OilTank[];
    useOilTankIdDayDepot: boolean;

    oilTankId: number;
    @ViewChild('editForm') editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private serviceOilTankService: ServiceOilTankService,
                private oilTankService: OilTankService,
                private dayDepotService: DayDepotService,
                private hotKeyService: HotkeyService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.hotKeyService.add('enter', null, this.editForm, false);
        this.oilTankId = UsefulId.oilTankId;
        this.isView = View.isView;
        this.isSaving = false;
        if (this.serviceOilTank.id) {
            this.saveDialog = false;
        } else {
            this.saveDialog = true;
        }
        if (this.serviceOilTank.id) {
            this.dayDepotService.getCountOfOilTankIdUsage(this.serviceOilTank.oilTankId)
                .subscribe(res => {
                    if (res !== 0) {
                        this.useOilTankIdDayDepot = true;
                    }
                },res => this.onError(res.message));
        }
        this.oilTankService.query()
            .subscribe(res => {
                this.oiltanks = res.body;
            },res => this.onError(res.message));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.serviceOilTank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.serviceOilTankService.update(this.serviceOilTank));
        } else {
            this.subscribeToSaveResponse(
                this.serviceOilTankService.create(this.serviceOilTank));
        }
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ServiceOilTank>>) {
        result.subscribe((res: HttpResponse<ServiceOilTank>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceOilTank) {
        this.eventManager.broadcast({name: 'serviceOilTankListModification', content: 'OK'});
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
    selector: 'jhi-service-oil-tank-popup',
    template: ''
})
export class ServiceOilTankPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private serviceOilTankPopupService: ServiceOilTankPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.serviceOilTankPopupService
                    .open(ServiceOilTankDialogComponent as Component, params['id']);
            } else {
                console.log('not be');
            }
            if (params['oilTankId']) {
                UsefulId.oilTankId = params['oilTankId'];
                this.serviceOilTankPopupService
                    .open(ServiceOilTankDialogComponent as Component, null, params['oilTankId']);
            } else if (params['dayDepotId']) {
                UsefulId.dayDepotId = params['dayDepotId'];
                this.serviceOilTankPopupService
                    .open(ServiceOilTankDialogComponent as Component, null, params['dayDepotId']);
            }
            if (params['parent'] === 'day-depot') {
                UsefulId.dayDepotId = params['parent-id'];
            } else if (params['parent'] === 'oil-tank') {
                UsefulId.oilTankId = params['parent-id'];
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
    static oilTankId: number;
    static dayDepotId: number;
}
