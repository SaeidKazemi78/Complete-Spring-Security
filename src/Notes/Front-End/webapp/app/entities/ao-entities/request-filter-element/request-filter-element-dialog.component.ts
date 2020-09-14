import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {FilterLocation, RequestFilterElement} from './request-filter-element.model';
import {RequestFilterElementPopupService} from './request-filter-element-popup.service';
import {RequestFilterElementService} from './request-filter-element.service';
import {RefuelCenter, RefuelCenterService} from '../refuel-center/index';
import {Filter, FilterService} from '../filter/index';
import {Element} from '../element/element.model';
import {ElementService} from '../element/index';
import {ProductService} from '../../product/index';
import {RequestElement} from '../request-element/index';
import {CustomerGroup} from '../../customer-type';
import {OilTank, OilTankService} from '../oil-tank';

@Component({
    selector: 'jhi-request-filter-element-dialog',
    templateUrl: './request-filter-element-dialog.component.html'
})
export class RequestFilterElementDialogComponent implements OnInit {

    requestFilterElement: RequestFilterElement;
    isSaving: boolean;
    isView: boolean;

    refuelcenters: RefuelCenter[];
    requestElement = new RequestElement();

    filters: Filter[];
    elements: Element[];
    selectedProduct: any;
    customProducts: any[];
    products: any;
    trackElementById: any;
    reverse: any;
    predicate: any;
    tempRequestElement: RequestElement;
    CustomerGroup = CustomerGroup;
    oilTanks: OilTank[];
    FilterLocation = FilterLocation;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private requestFilterElementService: RequestFilterElementService,
        private elementService: ElementService,
        private refuelCenterService: RefuelCenterService,
        private filterService: FilterService,
        private productService: ProductService,
        private eventManager: JhiEventManager,
        private oilTankService: OilTankService
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        if (this.requestFilterElement.id != null) {
            this.elements = [];
            this.requestFilterElement.lastChangeDateElements.forEach(value => {
                const element = new Element();
                element.title = value.elementTitle;
                element.id = value.elementId;
                element.count = value.elementCount;
                element.currentModel = value.currentModel;
                element.lastChangeDate = value.lastChangeDate;
                element.elementRequestReason = value.elementRequestReason;
                element.originalModel = value.elementOriginalModel;
                this.elements.push(element);
            });
        }
        this.refuelCenterService.queryByReadAccess()
            .subscribe((res: HttpResponse<RefuelCenter[]>) => {
                this.refuelcenters = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.queryByCustomerGroup(this.CustomerGroup[this.CustomerGroup.AIRPLANE])
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
                }
                if (this.requestFilterElement.id) {
                    this.selectedProduct = this.requestFilterElement.productId;
                }
            },res => this.onError(res.message));

        this.refuelCenterChanged(this.requestFilterElement.refuelCenterId);
    }

    onChangeProduct(data) {
        this.requestFilterElement.productId = data;
    }

    refuelCenterChanged(data) {
        if (data != null) {
            this.requestFilterElement.refuelCenterId = data;
            this.filterService.queryByRefuelCenter(this.requestFilterElement.refuelCenterId)
                .subscribe((res: HttpResponse<Filter[]>) => {
                    this.filters = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
            this.oilTankService.queryByRefuelCenterByUnit(this.requestFilterElement.refuelCenterId)
                .subscribe((res: HttpResponse<OilTank[]>) => {
                    this.oilTanks = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
    }

    filterChanged(data) {
        if (data != null) {
            this.requestFilterElement.filterId = data;
            this.elementService.query(this.requestFilterElement.filterId).subscribe(
                (res: HttpResponse<Element[]>) => this.elements = res.body,
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    addRequestElement() {
        if (this.requestFilterElement.requestElements == null) {
            this.requestFilterElement.requestElements = [];
        }
        if (this.requestFilterElement.requestElements.filter(value => value.elementId === this.requestElement.elementId).length === 0) {
            this.requestFilterElement.requestElements.push(Object.assign({}, this.requestElement));
            this.requestElement = new RequestElement();
            this.tempRequestElement = null;
        }
    }

    cancelRequestElement() {
        if (this.tempRequestElement == null) {
            this.requestElement = new RequestElement();
        } else {
            this.requestElement = Object.assign({}, this.tempRequestElement);
            this.addRequestElement();
        }

    }

    editRequestElement(item) {
        this.requestElement = Object.assign({}, item);
        this.tempRequestElement = Object.assign({}, item);
        this.removeRequestElement(this.tempRequestElement.elementId);
    }

    removeRequestElement(elementId) {
        console.log(elementId);
        this.requestFilterElement.requestElements.splice(
            this.requestFilterElement.requestElements
                .findIndex(value => value.elementId === elementId)
            , 1
        );
    }

    elementChanged(data) {
        if (data != null) {
            this.requestElement.count = this.elements.filter(value => value.id === data)[0].count;
            this.requestElement.elementTitle = this.elements.filter(value => value.id === data)[0].title;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.requestFilterElement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.requestFilterElementService.update(this.requestFilterElement));
        } else {
            this.subscribeToSaveResponse(
                this.requestFilterElementService.create(this.requestFilterElement));
        }
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackFilterById(index: number, item: Filter) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RequestFilterElement>>) {
        result.subscribe((res: HttpResponse<RequestFilterElement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RequestFilterElement) {
        this.eventManager.broadcast({name: 'requestFilterElementListModification', content: 'OK'});
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
    selector: 'jhi-request-filter-element-popup',
    template: ''
})
export class RequestFilterElementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requestFilterElementPopupService: RequestFilterElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.requestFilterElementPopupService
                    .open(RequestFilterElementDialogComponent as Component, params['id']);
            } else {
                this.requestFilterElementPopupService
                    .open(RequestFilterElementDialogComponent as Component);
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
