import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {RefuelCenter} from './refuel-center.model';
import {RefuelCenterPopupService} from './refuel-center-popup.service';
import {RefuelCenterService} from './refuel-center.service';
import {TransferType, TransferTypeService} from '../../transfer-type/index';
import {DepotService} from '../../depot/depot.service';
import {Depot} from '../../depot/depot.model';
import {RegionService} from '../../region/region.service';
import {CountryService} from '../../country/country.service';
import {AirportService} from '../airport/index';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';

@Component({
    selector: 'jhi-refuel-center-dialog',
    templateUrl: './refuel-center-dialog.component.html'
})
export class RefuelCenterDialogComponent implements OnInit {

    refuelCenter: RefuelCenter;
    isSaving: boolean;
    isView: boolean;
    depots: any[];
    transfertypes: any[];
    transferTypeSelected: any;
    refuelCenters: any;
    foreignRefuelCenter: boolean;
    airports: any[];
    disableFuel = false;
    disableWaybill = false;
    @ViewChild('editForm') editForm: NgForm;

    constructor(private activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private refuelCenterService: RefuelCenterService,
                private depotService: DepotService,
                private regionService: RegionService,
                private countryService: CountryService,
                private airportService: AirportService,
                private hotKeyService: HotkeyService,
                private transferTypeService: TransferTypeService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.hotKeyService.add('enter', null, this.editForm, false);
        this.isView = View.isView;
        this.isSaving = false;

        this.transferTypeService.query()
            .subscribe((res: HttpResponse<TransferType[]>) => {
                this.transfertypes = res.body;
                for (let i = 0; i < this.transfertypes.length; i++) {
                    this.transfertypes[i].label = this.transfertypes[i].title;
                    this.transfertypes[i].value = this.transfertypes[i].id;
                }
                if (this.refuelCenter.id != null) {
                    this.transferTypeSelected = [];
                    for (let i = 0; i < this.refuelCenter.transferTypes.length; i++) {
                        this.transferTypeSelected.push(this.refuelCenter.transferTypes[i].id);
                    }
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.handleDisableOrderNumbers();
    }

    handleDisableOrderNumbers() {
        if (this.refuelCenter.wayBillStartNumber !== this.refuelCenter.wayBillCurrentNumber) {
            this.disableWaybill = true;
        } else {
            this.disableWaybill = false;
        }
    }

    onChangeTransferType(data) {
        this.refuelCenter.transferTypes = [];
        for (let i = 0; i < this.transferTypeSelected.length; i++) {
            for (let j = 0; j < this.transfertypes.length; j++) {
                if (this.transferTypeSelected[i] === this.transfertypes[j].id) {
                    this.refuelCenter.transferTypes[i] = this.transfertypes[j];
                }
            }
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.refuelCenter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.refuelCenterService.update(this.refuelCenter));
        } else {
            this.subscribeToSaveResponse(
                this.refuelCenterService.create(this.refuelCenter));
        }
    }

    trackTransferTypeById(index: number, item: TransferType) {
        return item.id;
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

    changeWayBillStartNumber(data) {
        this.refuelCenter.wayBillCurrentNumber = this.refuelCenter.wayBillStartNumber;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RefuelCenter>>) {
        result.subscribe((res: HttpResponse<RefuelCenter>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RefuelCenter) {
        this.eventManager.broadcast({name: 'refuelCenterListModification', content: 'OK'});
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
    selector: 'jhi-refuel-center-popup',
    template: ''
})
export class RefuelCenterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private refuelCenterPopupService: RefuelCenterPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.refuelCenterPopupService
                    .open(RefuelCenterDialogComponent as Component, params['id']);
            } else {
                this.refuelCenterPopupService
                    .open(RefuelCenterDialogComponent as Component);
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
