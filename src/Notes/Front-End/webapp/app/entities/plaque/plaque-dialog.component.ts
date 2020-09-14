import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Plaque} from './plaque.model';
import {PlaquePopupService} from './plaque-popup.service';
import {PlaqueService} from './plaque.service';

@Component({
    selector: 'jhi-plaque-dialog',
    templateUrl: './plaque-dialog.component.html'
})
export class PlaqueDialogComponent implements OnInit {

    plaque: Plaque;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private plaqueService: PlaqueService,
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
        if (this.plaque.id !== undefined) {
            this.subscribeToSaveResponse(
                this.plaqueService.update(this.plaque));
        } else {
            this.subscribeToSaveResponse(
                this.plaqueService.create(this.plaque));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Plaque>>) {
        result.subscribe((res: HttpResponse<Plaque>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Plaque) {
        this.eventManager.broadcast({ name: 'plaqueListModification', content: 'OK'});
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
    selector: 'jhi-plaque-popup',
    template: ''
})
export class PlaquePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private plaquePopupService: PlaquePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.plaquePopupService
                    .open(PlaqueDialogComponent as Component, params['id']);
            } else {
                this.plaquePopupService
                    .open(PlaqueDialogComponent as Component);
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
