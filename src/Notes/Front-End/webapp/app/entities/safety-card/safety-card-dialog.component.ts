import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {SafetyCard} from './safety-card.model';
import {SafetyCardPopupService} from './safety-card-popup.service';
import {SafetyCardService} from './safety-card.service';
import {Driver, DriverService} from '../driver';
import {Depot, DepotService} from '../depot';

@Component({
    selector: 'jhi-safety-card-dialog',
    templateUrl: './safety-card-dialog.component.html'
})
export class SafetyCardDialogComponent implements OnInit {

    safetyCard: SafetyCard;
    isSaving: boolean;
    isView: boolean;

    depot: Depot[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private safetyCardService: SafetyCardService,
        private driverService: DriverService,
        private depotService: DepotService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.depotService.query()
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.depot = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.safetyCard.id !== undefined) {
            this.subscribeToSaveResponse(
                this.safetyCardService.update(this.safetyCard));
        } else {
            this.subscribeToSaveResponse(
                this.safetyCardService.create(this.safetyCard));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SafetyCard>>) {
        result.subscribe((res: HttpResponse<SafetyCard>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SafetyCard) {
        this.eventManager.broadcast({name: 'safetyCardListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDriverById(index: number, item: Driver) {
        return item.id;
    }

    trackDepotById(index: number, item: Depot) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-safety-card-popup',
    template: ''
})
export class SafetyCardPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private safetyCardPopupService: SafetyCardPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.safetyCardPopupService
                    .open(SafetyCardDialogComponent as Component, params['id']);
            } else if (params['driverId']) {
                this.safetyCardPopupService
                    .open(SafetyCardDialogComponent as Component, null, params['driverId']);
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
