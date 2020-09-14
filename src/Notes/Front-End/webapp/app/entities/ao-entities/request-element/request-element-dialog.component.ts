import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {RequestElement} from './request-element.model';
import {RequestElementPopupService} from './request-element-popup.service';
import {RequestElementService} from './request-element.service';
import {RequestFilterElement, RequestFilterElementService} from '../request-filter-element';
import {ElementService} from '../element';

@Component({
    selector: 'jhi-request-element-dialog',
    templateUrl: './request-element-dialog.component.html'
})
export class RequestElementDialogComponent implements OnInit {

    requestElement: RequestElement;
    isSaving: boolean;
    isView: boolean;
    elements: any;
    requestfilterelements: any;
    lastchangedateelements: any;
    trackLastChangeDateElementById: any;

    requestfilterelement: RequestFilterElement[];

    element: Element[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private requestElementService: RequestElementService,
        private requestFilterElementService: RequestFilterElementService,
        private elementService: ElementService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        /* this.requestFilterElementService.query()
             .subscribe((res: HttpResponse<RequestFilterElement[]>) => { this.requestfilterelement = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));*/
        /*   this.elementService.query()
               .subscribe((res: HttpResponse<Element[]>) => { this.element = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));*/
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.requestElement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.requestElementService.update(this.requestElement));
        } else {
            this.subscribeToSaveResponse(
                this.requestElementService.create(this.requestElement));
        }
    }

    trackRequestFilterElementById(index: number, item: RequestFilterElement) {
        return item.id;
    }

    trackElementById(index: number, item: Element) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RequestElement>>) {
        result.subscribe((res: HttpResponse<RequestElement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RequestElement) {
        this.eventManager.broadcast({name: 'requestElementListModification', content: 'OK'});
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
    selector: 'jhi-request-element-popup',
    template: ''
})
export class RequestElementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requestElementPopupService: RequestElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.requestElementPopupService
                    .open(RequestElementDialogComponent as Component, params['id']);
            } else if (params['requestFilterElementId']) {
                this.requestElementPopupService
                    .open(RequestElementDialogComponent as Component, null, params['requestFilterElementId']);
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
