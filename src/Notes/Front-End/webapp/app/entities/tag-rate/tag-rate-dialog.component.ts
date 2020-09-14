import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TagRate } from './tag-rate.model';
import { TagRatePopupService } from './tag-rate-popup.service';
import { TagRateService } from './tag-rate.service';
import { Location, LocationService } from '../location';

@Component({
    selector: 'jhi-tag-rate-dialog',
    templateUrl: './tag-rate-dialog.component.html'
})
export class TagRateDialogComponent implements OnInit {

    tagRate: TagRate;
    isSaving: boolean;
    isView: boolean;

    locations: Location[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tagRateService: TagRateService,
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
        if (this.tagRate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tagRateService.update(this.tagRate));
        } else {
            this.subscribeToSaveResponse(
                this.tagRateService.create(this.tagRate));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TagRate>>) {
        result.subscribe((res: HttpResponse<TagRate>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TagRate) {
        this.eventManager.broadcast({ name: 'tagRateListModification', content: 'OK'});
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
    selector: 'jhi-tag-rate-popup',
    template: ''
})
export class TagRatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagRatePopupService: TagRatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.tagRatePopupService
                    .open(TagRateDialogComponent as Component, params['id']);
            } else if (params['locationId']) {
                this.tagRatePopupService
                    .open(TagRateDialogComponent as Component, null, params['locationId']);
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
