import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CarTag } from './car-tag.model';
import { CarTagPopupService } from './car-tag-popup.service';
import { CarTagService } from './car-tag.service';
import { Location, LocationService } from '../location';

@Component({
    selector: 'jhi-car-tag-dialog',
    templateUrl: './car-tag-dialog.component.html'
})
export class CarTagDialogComponent implements OnInit {

    carTag: CarTag;
    isSaving: boolean;

    locations: Location[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carTagService: CarTagService,
        private locationService: LocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.locationService.query()
            .subscribe((res: HttpResponse<Location[]>) => { this.locations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carTag.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carTagService.update(this.carTag));
        } else {
            this.subscribeToSaveResponse(
                this.carTagService.create(this.carTag));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarTag>>) {
        result.subscribe((res: HttpResponse<CarTag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarTag) {
        this.eventManager.broadcast({ name: 'carTagListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-car-tag-popup',
    template: ''
})
export class CarTagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carTagPopupService: CarTagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.carTagPopupService
                    .open(CarTagDialogComponent as Component, params['id']);
            } else {
                this.carTagPopupService
                    .open(CarTagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
