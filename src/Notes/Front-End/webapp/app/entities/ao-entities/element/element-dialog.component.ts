import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Element} from './element.model';
import {ElementPopupService} from './element-popup.service';
import {ElementService} from './element.service';
import {Filter, FilterService} from '../filter';

@Component({
    selector: 'jhi-element-dialog',
    templateUrl: './element-dialog.component.html'
})
export class ElementDialogComponent implements OnInit {

    element: Element;
    isSaving: boolean;
    isView: boolean;
    filter: Filter[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private elementService: ElementService,
        private filterService: FilterService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.filterService.query()
            .subscribe((res: HttpResponse<Filter[]>) => {
                this.filter = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.element.id !== undefined) {
            this.subscribeToSaveResponse(
                this.elementService.update(this.element));
        } else {
            this.subscribeToSaveResponse(
                this.elementService.create(this.element));
        }
    }

    trackFilterById(index: number, item: Filter) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Element>>) {
        result.subscribe((res: HttpResponse<Element>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Element) {
        this.eventManager.broadcast({name: 'elementListModification', content: 'OK'});
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
    selector: 'jhi-element-popup',
    template: ''
})
export class ElementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private elementPopupService: ElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.elementPopupService
                    .open(ElementDialogComponent as Component, params['id']);
            } else if (params['filterId']) {
                this.elementPopupService
                    .open(ElementDialogComponent as Component, null, params['filterId']);
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
