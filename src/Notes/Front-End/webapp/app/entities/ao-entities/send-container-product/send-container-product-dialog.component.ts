import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {SendContainerProduct} from './send-container-product.model';
import {SendContainerProductPopupService} from './send-container-product-popup.service';
import {SendContainerProductService} from './send-container-product.service';
import {OilTankContainer, OilTankContainerService} from '../oil-tank-container/index';
import {DayDepotContainer, DayDepotContainerService} from '../day-depot-container/index';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';

@Component({
    selector: 'jhi-send-container-product-dialog',
    templateUrl: './send-container-product-dialog.component.html'
})
export class SendContainerProductDialogComponent implements OnInit {

    sendContainerProduct: SendContainerProduct;
    isSaving: boolean;
    isView: boolean;
    dayDepotContainerId: number;

    oiltankcontainers: OilTankContainer[];

    daydepotcontainers: DayDepotContainer[];
    @ViewChild('editForm') editForm: NgForm;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sendContainerProductService: SendContainerProductService,
        private oilTankContainerService: OilTankContainerService,
        private dayDepotContainerService: DayDepotContainerService,
        private hotKeyService: HotkeyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.hotKeyService.add('enter', null, this.editForm, false);
        this.dayDepotContainerId = UsefulId.dayDepotContainerId;
        this.isView = View.isView;
        this.isSaving = false;
        this.oilTankContainerService.query()
            .subscribe((res: HttpResponse<OilTankContainer[]>) => {
                this.oiltankcontainers = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        if (this.dayDepotContainerId && !this.sendContainerProduct.id) {
            this.dayDepotContainerService.getWaybillNumber(this.dayDepotContainerId)
                .subscribe(res => {
                    this.sendContainerProduct.waybillNumber = res.body;
                });
        }

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sendContainerProduct.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sendContainerProductService.update(this.sendContainerProduct));
        } else {
            this.subscribeToSaveResponse(
                this.sendContainerProductService.create(this.sendContainerProduct));
        }
    }

    trackOilTankContainerById(index: number, item: OilTankContainer) {
        return item.id;
    }

    trackDayDepotContainerById(index: number, item: DayDepotContainer) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SendContainerProduct>>) {
        result.subscribe((res: HttpResponse<SendContainerProduct>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SendContainerProduct) {
        this.eventManager.broadcast({name: 'sendContainerProductListModification', content: 'OK'});
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
    selector: 'jhi-send-container-product-popup',
    template: ''
})
export class SendContainerProductPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sendContainerProductPopupService: SendContainerProductPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.sendContainerProductPopupService
                    .open(SendContainerProductDialogComponent as Component, params['id']);
            } else if (params['dayDepotContainerId']) {
                UsefulId.dayDepotContainerId = params['dayDepotContainerId'];
                this.sendContainerProductPopupService
                    .open(SendContainerProductDialogComponent as Component, null, params['dayDepotContainerId']);
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
    static dayDepotContainerId: number;
}
