import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ChangeRequestElement} from './change-request-element.model';
import {ChangeRequestElementPopupService} from './change-request-element-popup.service';
import {ChangeRequestElementService} from './change-request-element.service';
import {RequestElement, RequestElementService} from '../request-element';

@Component({
    selector: 'jhi-change-request-element-dialog',
    templateUrl: './change-request-element-dialog.component.html'
})
export class ChangeRequestElementDialogComponent implements OnInit {

    changeRequestElement: ChangeRequestElement;
    isSaving: boolean;

    requestelements: RequestElement[];
    changefilterelements: any;
    trackChangeFilterElementById: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private changeRequestElementService: ChangeRequestElementService,
        private requestElementService: RequestElementService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        /* this.requestElementService.query()
             .subscribe((res: HttpResponse<RequestElement[]>) => { this.requestelements = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));*/
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.changeRequestElement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.changeRequestElementService.update(this.changeRequestElement));
        } else {
            this.subscribeToSaveResponse(
                this.changeRequestElementService.create(this.changeRequestElement));
        }
    }

    trackRequestElementById(index: number, item: RequestElement) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChangeRequestElement>>) {
        result.subscribe((res: HttpResponse<ChangeRequestElement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChangeRequestElement) {
        this.eventManager.broadcast({name: 'changeRequestElementListModification', content: 'OK'});
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
    selector: 'jhi-change-request-element-popup',
    template: ''
})
export class ChangeRequestElementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private changeRequestElementPopupService: ChangeRequestElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.changeRequestElementPopupService
                    .open(ChangeRequestElementDialogComponent as Component, params['id']);
            } else {
                this.changeRequestElementPopupService
                    .open(ChangeRequestElementDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
