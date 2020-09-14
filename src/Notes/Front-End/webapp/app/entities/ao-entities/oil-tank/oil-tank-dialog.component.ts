import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {OilTank, OilTankType} from './oil-tank.model';
import {OilTankPopupService} from './oil-tank-popup.service';
import {OilTankService} from './oil-tank.service';
import {DayDepotService} from '../day-depot/day-depot.service';
import {Product} from '../../product/product.model';
import {ProductService} from '../../product/product.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {RefuelCenter, RefuelCenterService} from '../refuel-center';
import {DayDepot} from '../day-depot';

@Component({
    selector: 'jhi-oil-tank-dialog',
    templateUrl: './oil-tank-dialog.component.html'
})
export class OilTankDialogComponent implements OnInit {

    oilTank: OilTank;
    isSaving: boolean;
    isView: boolean;
    useOilTankIdDayDepot: boolean;
    products: any[];
    refuelCenters: RefuelCenter[];
    OilTankType = OilTankType;
    selectedProduct: any;
    customProducts: any[];
    @ViewChild('editForm') editForm: NgForm;
    oilTanks: DayDepot[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private oilTankService: OilTankService,
                private refuelCenterService: RefuelCenterService,
                private productService: ProductService,
                private eventManager: JhiEventManager,
                private hotKeyService: HotkeyService,
                private dayDepotService: DayDepotService) {
    }

    ngOnInit() {
        this.hotKeyService.add('enter', null, this.editForm, false);
        this.isView = View.isView;
        this.isSaving = false;
        this.useOilTankIdDayDepot = false;
        if (this.oilTank.id) {
            this.oilTankChange(this.oilTank.oilTankType);
            this.dayDepotService.getCountOfOilTankIdUsage(this.oilTank.id)
                .subscribe(res => {
                    if (res !== 0) {
                        this.useOilTankIdDayDepot = true;
                    }
                }, res => this.onError(res.message));
        }

        this.refuelCenterService.queryByNational(true)
            .subscribe(res => {
                this.refuelCenters = res.body;
                if (this.refuelCenters.length === 1) {
                    this.oilTank.refuelCenterId = this.refuelCenters[0].id;
                }
            }, res => this.onError(res.message));
        this.productService.queryByHasContainer(false)
            .subscribe(res => {
                this.products = res.body;
                const product = {
                    value: '',
                    label: ''
                };
                this.customProducts = [];
                this.customProducts.push(product);
                for (let i = 0; i < this.products.length; i++) {
                    this.customProducts.push({
                        value: this.products[i].id,
                        label: this.products[i].title
                    });
                    /*        this.products[i].value = this.products[i].id;
                            this.products[i].label = this.products[i].title;*/
                }
                if (this.oilTank.id) {
                    this.selectedProduct = this.oilTank.productId;
                }
            }, res => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    getStyle(): Object {
        return {'display': 'block'};
    }

    save() {
        this.isSaving = true;
        if (this.oilTank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.oilTankService.update(this.oilTank));
        } else {
            this.subscribeToSaveResponse(
                this.oilTankService.create(this.oilTank));
        }
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    oilTankChange(data) {
        if (data === this.OilTankType[this.OilTankType.SERVICE_TANK] || data === this.OilTankType[this.OilTankType.PLATFORM] || data === this.OilTankType[this.OilTankType.PIPE]) {
            this.oilTank.capacity = null;
            this.oilTank.virtualCapacity = null;
        }
        if (data === this.OilTankType[this.OilTankType.PIPE]) {
            this.oilTankService.queryByRefuelCenterAndOilTank(this.oilTank.refuelCenterId, this.OilTankType[this.OilTankType.MAIN])
                .subscribe(value => {
                    this.oilTanks = value.body;
                });
        } else if (data === this.OilTankType[this.OilTankType.PLATFORM]) {
            this.oilTankService.queryByRefuelCenterAndOilTank(this.oilTank.refuelCenterId, this.OilTankType[this.OilTankType.SERVICE_TANK])
                .subscribe(value => {
                    this.oilTanks = value.body;
                });
        } else {
            this.oilTank.parentId = null;
        }
    }

    onChangeProduct(data) {
        console.log(data);
        console.log(this.selectedProduct);
        this.oilTank.productId = data;
        console.log(this.oilTank);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OilTank>>) {
        result.subscribe((res: HttpResponse<OilTank>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OilTank) {
        this.eventManager.broadcast({name: 'oilTankListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    parentOilTankChange(parentId) {
        this.selectedProduct = null;
        const parnetOilTank: OilTank = this.oilTanks.find(value => value.id === parentId);
        this.selectedProduct = parnetOilTank.productId;
        this.oilTank.productId = parnetOilTank.productId;
    }
}

@Component({
    selector: 'jhi-oil-tank-popup',
    template: ''
})
export class OilTankPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private oilTankPopupService: OilTankPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.oilTankPopupService
                    .open(OilTankDialogComponent as Component, params['id']);
            } else {
                this.oilTankPopupService
                    .open(OilTankDialogComponent as Component);
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
