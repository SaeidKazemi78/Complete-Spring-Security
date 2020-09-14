import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {OrderNumber} from './order-number.model';
import {OrderNumberPopupService} from './order-number-popup.service';
import {OrderNumberService} from './order-number.service';
import {Location, LocationService} from '../location';

@Component({
    selector: 'jhi-order-number-dialog',
    templateUrl: './order-number-dialog.component.html'
})
export class OrderNumberDialogComponent implements OnInit {

    orderNumber: OrderNumber;
    isSaving: boolean;
    isView: boolean;

    orderNumbers: OrderNumber[];
    exist: OrderNumber;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderNumberService: OrderNumberService,
        private locationService: LocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.orderNumberService.findAll()
            .subscribe((res: HttpResponse<OrderNumber[]>) => {
                this.orderNumbers = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderNumber.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderNumberService.update(this.orderNumber));
        } else {
            this.subscribeToSaveResponse(
                this.orderNumberService.create(this.orderNumber));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderNumber>>) {
        result.subscribe((res: HttpResponse<OrderNumber>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderNumber) {
        this.eventManager.broadcast({name: 'orderNumberListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    checkNumbers() {
        this.exist = this.orderNumbers.find(value =>
            ((this.orderNumber.startOrderNumber &&
                value.startOrderNumber <= this.orderNumber.startOrderNumber &&
                value.endOrderNumber >= this.orderNumber.startOrderNumber) ||

                (this.orderNumber.currentOrderNumber &&
                    value.startOrderNumber <= this.orderNumber.currentOrderNumber &&
                    value.endOrderNumber >= this.orderNumber.currentOrderNumber) ||

                (this.orderNumber.endOrderNumber &&
                    value.startOrderNumber <= this.orderNumber.endOrderNumber &&
                    value.endOrderNumber >= this.orderNumber.endOrderNumber)) &&

            value.id !== this.orderNumber.id
        );

    }

}

@Component({
    selector: 'jhi-order-number-popup',
    template: ''
})
export class OrderNumberPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderNumberPopupService: OrderNumberPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.orderNumberPopupService
                    .open(OrderNumberDialogComponent as Component, params['id']);
            } else if (params['locationId'] || params['refuelCenterId']) {
                this.orderNumberPopupService
                    .open(OrderNumberDialogComponent as Component, null, params['locationId'], params['refuelCenterId']);
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
