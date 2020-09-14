import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {LastChangeDateElement} from './last-change-date-element.model';
import {LastChangeDateElementPopupService} from './last-change-date-element-popup.service';
import {LastChangeDateElementService} from './last-change-date-element.service';
import {Element, ElementService} from '../element';
import {RequestFilterElement, RequestFilterElementService} from '../request-filter-element';

@Component({
    selector: 'jhi-last-change-date-element-dialog',
    templateUrl: './last-change-date-element-dialog.component.html'
})
export class LastChangeDateElementDialogComponent implements OnInit {

    lastChangeDateElement: LastChangeDateElement;
    isSaving: boolean;

    requestfilterelements: RequestFilterElement[];

    elements: Element[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lastChangeDateElementService: LastChangeDateElementService,
        private requestFilterElementService: RequestFilterElementService,
        private elementService: ElementService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.requestFilterElementService.query()
            .subscribe((res: HttpResponse<RequestFilterElement[]>) => {
                this.requestfilterelements = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        /*this.elementService.query()
            .subscribe((res: HttpResponse<Element[]>) => { this.elements = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));*/
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lastChangeDateElement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lastChangeDateElementService.update(this.lastChangeDateElement));
        } else {
            this.subscribeToSaveResponse(
                this.lastChangeDateElementService.create(this.lastChangeDateElement));
        }
    }

    trackRequestFilterElementById(index: number, item: RequestFilterElement) {
        return item.id;
    }

    trackElementById(index: number, item: Element) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LastChangeDateElement>>) {
        result.subscribe((res: HttpResponse<LastChangeDateElement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LastChangeDateElement) {
        this.eventManager.broadcast({name: 'lastChangeDateElementListModification', content: 'OK'});
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
    selector: 'jhi-last-change-date-element-popup',
    template: ''
})
export class LastChangeDateElementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lastChangeDateElementPopupService: LastChangeDateElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.lastChangeDateElementPopupService
                    .open(LastChangeDateElementDialogComponent as Component, params['id']);
            } else {
                this.lastChangeDateElementPopupService
                    .open(LastChangeDateElementDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
