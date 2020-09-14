import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {BoundaryTag} from './boundary-tag.model';
import {BoundaryTagPopupService} from './boundary-tag-popup.service';
import {BoundaryTagService} from './boundary-tag.service';
import {Location, LocationService} from '../location';

@Component({
    selector: 'jhi-boundary-tag-dialog',
    templateUrl: './boundary-tag-dialog.component.html'
})
export class BoundaryTagDialogComponent implements OnInit {

    boundaryTag: BoundaryTag;
    isSaving: boolean;
    isView: boolean;

    locations: Location[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private boundaryTagService: BoundaryTagService,
        private locationService: LocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.locationService.query()
            .subscribe((res: HttpResponse<Location[]>) => { this.locations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.boundaryTag.id !== undefined) {
            this.subscribeToSaveResponse(
                this.boundaryTagService.update(this.boundaryTag));
        } else {
            this.subscribeToSaveResponse(
                this.boundaryTagService.create(this.boundaryTag));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BoundaryTag>>) {
        result.subscribe((res: HttpResponse<BoundaryTag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BoundaryTag) {
        this.eventManager.broadcast({ name: 'boundaryTagListModification', content: 'OK'});
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
    selector: 'jhi-boundary-tag-popup',
    template: ''
})
export class BoundaryTagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private boundaryTagPopupService: BoundaryTagPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.boundaryTagPopupService
                    .open(BoundaryTagDialogComponent as Component, params['id']);
            } else if (params['locationId']) {
                this.boundaryTagPopupService
                    .open(BoundaryTagDialogComponent as Component, null, params['locationId']);
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
