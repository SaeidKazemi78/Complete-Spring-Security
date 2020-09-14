import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CostElement} from './cost-element.model';
import {CostElementPopupService} from './cost-element-popup.service';
import {CostElementService} from './cost-element.service';
import {CostGroup, CostGroupService} from '../cost-group';
import {Cost} from '../cost';

@Component({
    selector: 'jhi-cost-element-dialog',
    templateUrl: './cost-element-dialog.component.html'
})
export class CostElementDialogComponent implements OnInit {

    costElement: CostElement;
    isSaving: boolean;
    isView: boolean;
    selectedProduct: any;
    customProducts: any[];
    products: any[];
    costId: number;
    costGroupId: number;
    costGroup: CostGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private costElementService: CostElementService,
        private costGroupService: CostGroupService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {

        this.costGroupService.find(UsefulId.costGroupId).subscribe(value => {
            this.costGroup = value.body;
        });

        this.isView = View.isView;
        this.isSaving = false;
        if (!this.costElement.id) {
            this.costId = UsefulId.costId;
            this.costGroupId = UsefulId.costGroupId;
        } else {
            this.costId = this.costElement.costId;
            this.costGroupId = this.costElement.costGroupId;
        }
        this.costElementService.queryForProducts(this.costGroupId, this.costId).subscribe(value => {
            this.products = value.body;

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
            }
            if (this.costElement.id) {
                this.selectedProduct = this.costElement.productId;
            }
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.costElement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costElementService.update(this.costElement));
        } else {
            this.subscribeToSaveResponse(
                this.costElementService.create(this.costElement));
        }
    }

    trackCostGroupById(index: number, item: CostGroup) {
        return item.id;
    }

    trackCostById(index: number, item: Cost) {
        return item.id;
    }

    onChangeProduct(data) {
        this.costElement.productId = data;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CostElement>>) {
        result.subscribe((res: HttpResponse<CostElement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CostElement) {
        this.eventManager.broadcast({name: 'costElementListModification', content: 'OK'});
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
    selector: 'jhi-cost-element-popup',
    template: ''
})
export class CostElementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costElementPopupService: CostElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.costElementPopupService
                    .open(CostElementDialogComponent as Component, params['id']);
            } else if (params['costGroupId'] && !params['costId']) {
                UsefulId.costGroupId = params['costGroupId'];
                this.costElementPopupService
                    .open(CostElementDialogComponent as Component, null, params['costGroupId']);
            } else if (params['costId']) {
                UsefulId.costGroupId = params['costGroupId'];
                UsefulId.costId = params['costId'];
                this.costElementPopupService
                    .open(CostElementDialogComponent as Component, null, params['costGroupId'], params['costId']);
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
    static costId: number;
    static costGroupId: number;
}
