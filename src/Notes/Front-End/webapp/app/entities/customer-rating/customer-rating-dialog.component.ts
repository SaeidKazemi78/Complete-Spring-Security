import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CustomerRating} from './customer-rating.model';
import {CustomerRatingPopupService} from './customer-rating-popup.service';
import {CustomerRatingService} from './customer-rating.service';
import {Location, LocationService} from '../location';

@Component({
    selector: 'jhi-customer-rating-dialog',
    templateUrl: './customer-rating-dialog.component.html'
})
export class CustomerRatingDialogComponent implements OnInit {

    customerRating: CustomerRating;
    isSaving: boolean;
    isView: boolean;
    locations: Location[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private locationService: LocationService,
        private jhiAlertService: JhiAlertService,
        private customerRatingService: CustomerRatingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.locationService.query()
            .subscribe((res: HttpResponse<Location[]>) => {
                this.locations = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customerRating.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerRatingService.update(this.customerRating));
        } else {
            this.subscribeToSaveResponse(
                this.customerRatingService.create(this.customerRating));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerRating>>) {
        result.subscribe((res: HttpResponse<CustomerRating>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerRating) {
        this.eventManager.broadcast({name: 'customerRatingListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-customer-rating-popup',
    template: ''
})
export class CustomerRatingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerRatingPopupService: CustomerRatingPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.customerRatingPopupService
                    .open(CustomerRatingDialogComponent as Component, params['id']);
            } else {
                this.customerRatingPopupService
                    .open(CustomerRatingDialogComponent as Component);
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
