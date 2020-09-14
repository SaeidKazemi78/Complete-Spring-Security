import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {RequestPlunging} from './request-plunging.model';
import {RequestPlungingPopupService} from './request-plunging-popup.service';
import {RequestPlungingService} from './request-plunging.service';

@Component({
    selector: 'jhi-request-plunging-dialog',
    templateUrl: './request-plunging-dialog.component.html'
})
export class RequestPlungingDialogComponent implements OnInit {

    requestPlunging: RequestPlunging;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private requestPlungingService: RequestPlungingService,
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
        if (this.requestPlunging.id !== undefined) {
            this.subscribeToSaveResponse(
                this.requestPlungingService.update(this.requestPlunging));
        } else {
            this.subscribeToSaveResponse(
                this.requestPlungingService.create(this.requestPlunging));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RequestPlunging>>) {
        result.subscribe((res: HttpResponse<RequestPlunging>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RequestPlunging) {
        this.eventManager.broadcast({name: 'requestPlungingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-request-plunging-popup',
    template: ''
})
export class RequestPlungingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requestPlungingPopupService: RequestPlungingPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.requestPlungingPopupService
                    .open(RequestPlungingDialogComponent as Component, params['id']);
            } else {
                this.requestPlungingPopupService
                    .open(RequestPlungingDialogComponent as Component);
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
