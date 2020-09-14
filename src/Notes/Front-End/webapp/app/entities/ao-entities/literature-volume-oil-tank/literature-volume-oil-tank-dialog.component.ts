import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {LiteratureVolumeOilTank} from './literature-volume-oil-tank.model';
import {LiteratureVolumeOilTankPopupService} from './literature-volume-oil-tank-popup.service';
import {LiteratureVolumeOilTankService} from './literature-volume-oil-tank.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {OilTank, OilTankService} from '../oil-tank';
import {ServiceOilTank, ServiceOilTankService} from '../service-oil-tank';

@Component({
    selector: 'jhi-literature-volume-oil-tank-dialog',
    templateUrl: './literature-volume-oil-tank-dialog.component.html'
})
export class LiteratureVolumeOilTankDialogComponent implements OnInit {

    literatureVolumeOilTank: LiteratureVolumeOilTank;
    isSaving: boolean;
    isView: boolean;

    oiltanks: OilTank[];

    serviceoiltanks: ServiceOilTank[];

    serviceOilTank: ServiceOilTank;
    oilTankId: number;
    oilTank: OilTank;
    serviceOilTankId: number;
    parentMeasureType: any;
    @ViewChild('editForm') editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private literatureVolumeOilTankService: LiteratureVolumeOilTankService,
                private oilTankService: OilTankService,
                private serviceOilTankService: ServiceOilTankService,
                private hotKeyService: HotkeyService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.hotKeyService.add('enter', null, this.editForm, false);
        this.isView = View.isView;
        this.isSaving = false;
        if (UsefulId.oilTankId != null) {
            this.oilTankId = UsefulId.oilTankId;
            this.literatureVolumeOilTank.oilTankId = this.oilTankId;
            this.oilTankService.find(this.oilTankId).subscribe(oilTank => {
                    this.parentMeasureType = oilTank.body.measureType;
                }
            );
        }
        if (UsefulId.serviceOilTankId != null) {
            this.serviceOilTankId = UsefulId.serviceOilTankId;
            this.literatureVolumeOilTank.serviceOilTankId = this.serviceOilTankId;
            this.serviceOilTankService.find(this.serviceOilTankId).subscribe(oilTank => {
                    this.parentMeasureType = oilTank.body.measureType;
                }
            );
        }

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (UsefulId.serviceOilTankId != null) {
            this.literatureVolumeOilTank.oilTankId = null;
        }
        if (this.literatureVolumeOilTank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.literatureVolumeOilTankService.update(this.literatureVolumeOilTank));
        } else {
            this.subscribeToSaveResponse(
                this.literatureVolumeOilTankService.create(this.literatureVolumeOilTank));
        }
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackServiceOilTankById(index: number, item: ServiceOilTank) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LiteratureVolumeOilTank>>) {
        result.subscribe((res: HttpResponse<LiteratureVolumeOilTank>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LiteratureVolumeOilTank) {
        this.eventManager.broadcast({name: 'literatureVolumeOilTankListModification', content: 'OK'});
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
    selector: 'jhi-literature-volume-oil-tank-popup',
    template: ''
})
export class LiteratureVolumeOilTankPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private literatureVolumeOilTankPopupService: LiteratureVolumeOilTankPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['serviceOilTankId'] && !params['parent']) {
                UsefulId.oilTankId = null;
                UsefulId.serviceOilTankId = params['serviceOilTankId'];
                this.literatureVolumeOilTankPopupService
                    .open(LiteratureVolumeOilTankDialogComponent as Component, null, params['serviceOilTankId']);
            } else if (params['oilTankId']) {
                UsefulId.oilTankId = params['oilTankId'];
                UsefulId.serviceOilTankId = null;
                this.literatureVolumeOilTankPopupService
                    .open(LiteratureVolumeOilTankDialogComponent as Component, null, params['oilTankId']);
            }
            if (params['parent'] === 'service-oil-tank') {
                UsefulId.serviceOilTankId = params['parentId'];
                UsefulId.oilTankId = null;
                if (params['id']) {
                    this.literatureVolumeOilTankPopupService
                        .open(LiteratureVolumeOilTankDialogComponent as Component, params['id'], params['parentId']);
                } else {
                    UsefulId.serviceOilTankId = params['parentId'];
                    this.literatureVolumeOilTankPopupService
                        .open(LiteratureVolumeOilTankDialogComponent as Component, null, params['parentId']);
                }
            } else if (params['parent'] === 'oil-tank') {
                UsefulId.oilTankId = params['parentId'];
                UsefulId.serviceOilTankId = null;
                if (params['id']) {
                    this.literatureVolumeOilTankPopupService
                        .open(LiteratureVolumeOilTankDialogComponent as Component, params['id'], params['parentId']);
                } else {
                    UsefulId.serviceOilTankId = params['parentId'];
                    this.literatureVolumeOilTankPopupService
                        .open(LiteratureVolumeOilTankDialogComponent as Component, null, params['parentId']);
                }
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
    static serviceOilTankId: number;
}
