import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ReceivedProduct, ReceivedProductType} from './received-product.model';
import {ReceivedProductPopupService} from './received-product-popup.service';
import {ReceivedProductService} from './received-product.service';
import {DayDepot, DayDepotService} from '../day-depot/index';
import {Product} from '../../product/product.model';
import {Depot} from '../../depot/depot.model';
import {DepotService} from '../../depot/depot.service';
import {ProductService} from '../../product/product.service';
import {OilTankService} from '../oil-tank/oil-tank.service';
import {SixtyConverter, SixtyDegreeConverterService} from '../../../shared/sixty-degree-converter/index';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'jhi-received-product-dialog',
    templateUrl: './received-product-dialog.component.html'
})
export class ReceivedProductDialogComponent implements OnInit {

    receivedProduct: ReceivedProduct;
    receivedProductType = ReceivedProductType;
    isSaving: boolean;
    isView: boolean;

    product: Product;
    daydepots: DayDepot[];
    products: Product[];
    dayDepotId: number;
    depots: Depot[];
    @ViewChild('editForm') editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,
                private productService: ProductService,
                private sixtyConverterService: SixtyDegreeConverterService,
                private oilTankService: OilTankService,
                private depotService: DepotService,
                private jhiAlertService: JhiAlertService,
                private receivedProductService: ReceivedProductService,
                private dayDepotService: DayDepotService,
                private router: Router,
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
        this.dayDepotService.query()
            .subscribe(res => {
                this.daydepots = res.body;
            },res => this.onError(res.message));
        this.dayDepotService.find(this.dayDepotId).subscribe(dayDepot => {
            this.oilTankService.find(dayDepot.body.oilTankId).subscribe(oilTank => {
                this.productService.find(oilTank.body.productId).subscribe(product => {
                    this.product = product.body;
                    this.receivedProduct.productId = this.product.id;
                });
            });
        },res => this.onError(res.message));
        this.depotService.queryForReceivedProduct(this.dayDepotId).subscribe(res => {
            this.depots = res.body;
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNext ?: boolean) {
        this.isSaving = true;
        if (this.receivedProduct.id !== undefined) {
            this.subscribeToSaveResponse(
                this.receivedProductService.update(this.receivedProduct));
        } else {
            this.subscribeToSaveResponse(
                this.receivedProductService.create(this.receivedProduct), showNext);
        }
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    trackProductById(index: number, item: DayDepot) {
        return item.id;
    }

    trackDepotById(index: number, item: Depot) {
        return item.id;
    }

    calculateQuantity60(type) {
        if (type === 'receive') {
            let model = new SixtyConverter();
            model.envTemp = this.receivedProduct.receivedEnvironmentTemperature;
            model.proTmp = this.receivedProduct.receivedProductTemperature;
            model.quantity = this.receivedProduct.receivedNatureAmount;
            model.speWei = this.receivedProduct.receivedSpecialWeight;
            this.sixtyConverterService.getQuantity60Tank(model)
                .subscribe(res => {
                    model = res.body;
                    this.receivedProduct.receivedSixtyAmount = res.body.quantity60;
                });
            console.log(model);
        } else if (type === 'send') {
            let model = new SixtyConverter();
            model.envTemp = this.receivedProduct.sendEnvironmentTemperature;
            model.proTmp = this.receivedProduct.sendProductTemperature;
            model.quantity = this.receivedProduct.sendNatureAmount;
            model.speWei = this.receivedProduct.sendSpecialWeight;
            this.sixtyConverterService.getQuantity60Tank(model)
                .subscribe(res => {
                    model = res.body;
                    this.receivedProduct.sendSixtyAmount = res.body.quantity60;
                });
            console.log(model);
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReceivedProduct>>, showNext ?: boolean) {
        result.subscribe((res: HttpResponse<ReceivedProduct>) =>
            this.onSaveSuccess(res.body, showNext), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReceivedProduct, showNext ?: boolean) {
        this.eventManager.broadcast({name: 'receivedProductListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNext) {
            setTimeout(() => {
                this.router.navigateByUrl(
                    `main-day-depot/${result.mainDayDepotId}/day-depot/${result.dayDepotId}/received-product(popup:received-product-new/${result.dayDepotId})`
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
    selector: 'jhi-received-product-popup',
    template: ''
})
export class ReceivedProductPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private receivedProductPopupService: ReceivedProductPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id'] && params['dayDepotId']) {
                UsefulId.dayDepotId = params['dayDepotId'];
                this.receivedProductPopupService
                    .open(ReceivedProductDialogComponent as Component, params['id']);
            } else if (params['dayDepotId']) {
                UsefulId.dayDepotId = params['dayDepotId'];
                this.receivedProductPopupService
                    .open(ReceivedProductDialogComponent as Component, null, params['dayDepotId']);
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
