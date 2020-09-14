import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {SixtyBaseInformation} from './sixty-base-information.model';
import {SixtyBaseInformationPopupService} from './sixty-base-information-popup.service';
import {SixtyBaseInformationService} from './sixty-base-information.service';
import {RefuelCenter, RefuelCenterService} from '../ao-entities/refuel-center';
import {ProductService} from "app/entities/product";

@Component({
    selector: 'jhi-sixty-base-information-dialog',
    templateUrl: './sixty-base-information-dialog.component.html'
})
export class SixtyBaseInformationDialogComponent implements OnInit {

    sixtyBaseInformation: SixtyBaseInformation;
    isSaving: boolean;
    isView: boolean;

    refuelcenters: RefuelCenter[];
    customProducts: any[];
    products: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sixtyBaseInformationService: SixtyBaseInformationService,
        private refuelCenterService: RefuelCenterService,
        private eventManager: JhiEventManager,
        private productService: ProductService
    ) {
    }

    ngOnInit() {
        if (!this.sixtyBaseInformation.id) {
            if (View.mode === 'operation') {
                this.sixtyBaseInformation.type = 'OPERATION';
            } else {
                this.sixtyBaseInformation.type = 'DEPOT';
            }
        }
        this.isView = View.isView;
        this.isSaving = false;
        this.refuelCenterService.query()
            .subscribe((res: HttpResponse<RefuelCenter[]>) => {
                this.refuelcenters = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

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
            }, res => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
        this.sixtyBaseInformation = new SixtyBaseInformation();
    }

    save() {
        this.isSaving = true;
        if (this.sixtyBaseInformation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sixtyBaseInformationService.update(this.sixtyBaseInformation));
        } else {
            this.subscribeToSaveResponse(
                this.sixtyBaseInformationService.create(this.sixtyBaseInformation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SixtyBaseInformation>>) {
        result.subscribe((res: HttpResponse<SixtyBaseInformation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SixtyBaseInformation) {
        this.eventManager.broadcast({name: 'sixtyBaseInformationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sixty-base-information-popup',
    template: ''
})
export class SixtyBaseInformationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sixtyBaseInformationPopupService: SixtyBaseInformationPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            if (params['mode']) {
                View.mode = params['mode'];
            }
            if (params['id']) {
                this.sixtyBaseInformationPopupService
                    .open(SixtyBaseInformationDialogComponent as Component, params['id']);
            } else {
                this.sixtyBaseInformationPopupService
                    .open(SixtyBaseInformationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
    static mode: string;
}
