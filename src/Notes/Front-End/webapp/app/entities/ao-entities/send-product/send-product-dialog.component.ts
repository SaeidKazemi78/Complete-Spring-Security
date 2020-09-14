import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {SendProduct} from './send-product.model';
import {SendProductPopupService} from './send-product-popup.service';
import {SendProductService} from './send-product.service';
import {DayDepot, DayDepotService} from '../day-depot/index';
import {OilTank, OilTankService} from '../oil-tank/index';
import {Depot} from '../../depot/depot.model';
import {DepotService} from '../../depot/depot.service';
import {SixtyConverter, SixtyDegreeConverterService} from '../../../shared/sixty-degree-converter/index';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'jhi-send-product-dialog',
    templateUrl: './send-product-dialog.component.html'
})
export class SendProductDialogComponent implements OnInit {

    dayDepotId: number;
    sendProduct: SendProduct;
    isSaving: boolean;
    isView: boolean;
    isZeroSendAmount: boolean;

    daydepots: DayDepot[];

    oiltanks: OilTank[];
    depots: Depot[];
    dayDepot: DayDepot;
    dayDepotTitle: string;
    @ViewChild('editForm') editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,
                private router: Router,
                private depotService: DepotService,
                private sixtyConverterService: SixtyDegreeConverterService,
                private jhiAlertService: JhiAlertService,
                private sendProductService: SendProductService,
                private dayDepotService: DayDepotService,
                private oilTankService: OilTankService,
                private _hotkeysService: HotkeysService,
                private eventManager: JhiEventManager) {
        this._hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'enter') {
                this.editForm.onSubmit(null);
                return false;
            }
        }));
        this._hotkeysService.add(new Hotkey(['ctrl+enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'ctrl+enter') {
                this.save(true);
                return false;
            }
        }));
    }

    ngOnInit() {
        this.dayDepotId = UsefulId.dayDepotId;
        this.isView = View.isView;
        this.isSaving = false;
        this.dayDepotService.find(this.sendProduct.dayDepotId)
            .subscribe((res: HttpResponse<DayDepot>) => {
                this.dayDepotTitle = res.body.oilTankTitle;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.oilTankService.query()
            .subscribe((res: HttpResponse<OilTank[]>) => {
                this.oiltanks = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.depotService.queryForSendProduct(this.dayDepotId)
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.depots = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.dayDepotService.find((this.dayDepotId) ? this.dayDepotId : this.sendProduct.dayDepotId)
            .subscribe((res: HttpResponse<DayDepot>) => {
                this.dayDepot = res.body;
                this.sendProduct.oilTankId = res.body.oilTankId;
            });
        if (this.dayDepotId && !this.sendProduct.id) {
            this.dayDepotService.getWaybillNumber(this.dayDepotId)
                .subscribe((res: HttpResponse<string>) => {
                    this.sendProduct.waybillNumber = res.body;
                });
        }

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNext ?: boolean) {
        this.isSaving = true;
        if (this.sendProduct.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sendProductService.update(this.sendProduct));
        } else {
            this.subscribeToSaveResponse(
                this.sendProductService.create(this.sendProduct), showNext
            );
        }
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackDepotById(index: number, item: Depot) {
        return item.id;
    }

    checkNoneZero(newValue, caseTitle) {
        const num = parseInt(newValue);
        switch (caseTitle) {
            case 'sendAmount': {
                if (num < 0) {
                    this.isZeroSendAmount = true;
                } else {
                    this.isZeroSendAmount = false;
                }
            }
        }
    }

    calculateQuantity60(type) {
        if (type === 'receive') {
            let model = new SixtyConverter();
            model.envTemp = this.sendProduct.receivedEnvironmentTemperature;
            model.proTmp = this.sendProduct.receivedProductTemperature;
            model.quantity = this.sendProduct.receivedNatureAmount;
            model.speWei = this.sendProduct.receivedSpecialWeight;
            this.sixtyConverterService.getQuantity60Tank(model)
                .subscribe(res => {
                    model = res.body;
                    this.sendProduct.receivedSixtyAmount = res.body.quantity60;
                });
            console.log(model);
        } else if (type === 'send') {
            let model = new SixtyConverter();
            model.envTemp = this.sendProduct.sendEnvironmentTemperature;
            model.proTmp = this.sendProduct.sendProductTemperature;
            model.quantity = this.sendProduct.sendNatureAmount;
            model.speWei = this.sendProduct.sendSpecialWeight;
            this.sixtyConverterService.getQuantity60Tank(model)
                .subscribe(res => {
                    model = res.body;
                    this.sendProduct.sendSixtyAmount = res.body.quantity60;
                });
            console.log(model);
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SendProduct>>, showNext ?: boolean) {
        result.subscribe((res: HttpResponse<SendProduct>) =>
            this.onSaveSuccess(res.body, showNext), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SendProduct, showNext ?: boolean) {
        this.eventManager.broadcast({name: 'sendProductListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNext) {
            setTimeout(() => {
                this.router.navigateByUrl(
                    `main-day-depot/${result.mainDayDepotId}/day-depot/${result.dayDepotId}/send-product(popup:send-product-new/${result.dayDepotId})`
                );
            }, 1000);
        }
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-send-product-popup',
    template: ''
})
export class SendProductPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private sendProductPopupService: SendProductPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.sendProductPopupService
                    .open(SendProductDialogComponent as Component, params['id']);
            } else if (params['dayDepotId']) {
                UsefulId.dayDepotId = params['dayDepotId'];
                this.sendProductPopupService
                    .open(SendProductDialogComponent as Component, null, params['dayDepotId']);
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

class UsefulId {
    static dayDepotId: number;
}
