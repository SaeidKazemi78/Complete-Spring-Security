import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CustomerStationInfo} from './customer-station-info.model';
import {CustomerStationInfoPopupService} from './customer-station-info-popup.service';
import {CustomerStationInfoService} from './customer-station-info.service';
import {Customer, CustomerService} from '../customer';
import {NozzleProductCountService} from '../nozzle-product-count';
import {NozzleProductCount} from '../nozzle-product-count/nozzle-product-count.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'jhi-customer-station-info-dialog',
    templateUrl: './customer-station-info-dialog.component.html'
})
export class CustomerStationInfoDialogComponent implements OnInit {

    customerStationInfo: CustomerStationInfo;
    isSaving: boolean;
    isView: boolean;

    nozzleProductCount: NozzleProductCount = new NozzleProductCount();
    tempEditNozzleProductCount: NozzleProductCount = new NozzleProductCount();
    nozzleProductCounts: NozzleProductCount[] = [];
    customer: Customer[];
    nozzleProductCountCreate: boolean;
    nozzleProductCountEdit: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerStationInfoService: CustomerStationInfoService,
        private nozzleProductCountService: NozzleProductCountService,
        private customerService: CustomerService,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        if (this.customerStationInfo && this.customerStationInfo.nozzleProductCounts) {
            this.nozzleProductCounts = this.customerStationInfo.nozzleProductCounts;
        }
        this.isView = View.isView;
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => {
                this.customer = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
    print() {
        this.activeModal.dismiss('cancel');
        this.eventManager.broadcast({name: 'customerStationInfoPrint', content: this.customerStationInfo.id});

    }

    save() {
        this.isSaving = true;

        this.customerStationInfo.nozzleProductCounts = this.nozzleProductCounts;

        if (this.customerStationInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerStationInfoService.update(this.customerStationInfo));
        } else {
            this.subscribeToSaveResponse(
                this.customerStationInfoService.create(this.customerStationInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerStationInfo>>) {
        result.subscribe((res: HttpResponse<CustomerStationInfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerStationInfo) {
        this.eventManager.broadcast({name: 'customerStationInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    newNozzleProductCount() {

        this.nozzleProductCountCreate = true;
        this.nozzleProductCount = new NozzleProductCount();
    }

    cancelNozzleProductCount() {
        if (this.nozzleProductCountCreate) {
            this.nozzleProductCount = new NozzleProductCount();
            this.nozzleProductCountCreate = false;
        } else {
            this.nozzleProductCount = this.nozzleProductCount[0];
            this.nozzleProductCountEdit = false;
        }
    }

    saveNozzleProductCount() {
        if (this.nozzleProductCountCreate) {
            this.nozzleProductCounts.push(this.nozzleProductCount);
            this.nozzleProductCountCreate = false;
        } else {
            this.nozzleProductCounts[this.nozzleProductCounts.indexOf(this.tempEditNozzleProductCount)] = this.nozzleProductCount;
            this.nozzleProductCountEdit = false;
        }
    }

    deleteNozzleProductCount(item) {
        this.nozzleProductCounts.splice(this.nozzleProductCounts.findIndex(value => value.nozzleProductType === item.nozzleProductType), 1);
    }

    editNozzleProductCount(item) {
        this.nozzleProductCountEdit = true;
        this.tempEditNozzleProductCount = this.nozzleProductCounts[this.nozzleProductCounts.indexOf(item)];
        this.nozzleProductCount = this.nozzleProductCounts[this.nozzleProductCounts.indexOf(item)];
    }

    isExistProductType(item) {
        return this.nozzleProductCounts.map(value => value.nozzleProductType).includes(item);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-customer-station-info-popup',
    template: ''
})
export class CustomerStationInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;
    eventSubscriber: Subscription;

    constructor(
        private route: ActivatedRoute,
        private eventManager: JhiEventManager,
        private router: Router,
        private customerStationInfoPopupService: CustomerStationInfoPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.customerStationInfoPopupService
                    .open(CustomerStationInfoDialogComponent as Component, params['id']);
            } else {
                console.log('not be');
            }
        });

        this.eventSubscriber = this.eventManager.subscribe('customerStationInfoPrint',response => {

            console.log(response);
            this.router.navigate(['report/customer-station-info/', response.content]);

        });

    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);

    }
}

class View {
    static isView: boolean;
}
