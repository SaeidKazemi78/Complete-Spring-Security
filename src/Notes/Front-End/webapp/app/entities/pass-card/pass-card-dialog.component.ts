import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {PassCard} from './pass-card.model';
import {PassCardPopupService} from './pass-card-popup.service';
import {PassCardService} from './pass-card.service';
import {Driver, DriverService} from '../driver';

@Component({
    selector: 'jhi-pass-card-dialog',
    templateUrl: './pass-card-dialog.component.html'
})
export class PassCardDialogComponent implements OnInit {

    passCard: PassCard;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private passCardService: PassCardService,
        private driverService: DriverService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.passCard.id !== undefined) {
            this.subscribeToSaveResponse(
                this.passCardService.update(this.passCard));
        } else {
            this.subscribeToSaveResponse(
                this.passCardService.create(this.passCard));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PassCard>>) {
        result.subscribe((res: HttpResponse<PassCard>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PassCard) {
        this.eventManager.broadcast({name: 'passCardListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-pass-card-popup',
    template: ''
})
export class PassCardPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private passCardPopupService: PassCardPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.passCardPopupService
                    .open(PassCardDialogComponent as Component, params['id']);
            } else if (params['driverId']) {
                this.passCardPopupService
                    .open(PassCardDialogComponent as Component, null, params['driverId']);
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
