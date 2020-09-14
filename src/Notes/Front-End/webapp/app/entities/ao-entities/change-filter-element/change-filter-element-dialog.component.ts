import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ChangeFilterElement} from './change-filter-element.model';
import {ChangeFilterElementPopupService} from './change-filter-element-popup.service';
import {ChangeFilterElementService} from './change-filter-element.service';
import {RequestFilterElement, RequestFilterElementService} from '../request-filter-element';
import {ChangeRequestElement} from '../change-request-element';

@Component({
    selector: 'jhi-change-filter-element-dialog',
    templateUrl: './change-filter-element-dialog.component.html'
})
export class ChangeFilterElementDialogComponent implements OnInit {

    changeFilterElement: ChangeFilterElement;
    elements: any[];
    isSaving: boolean;
    isView: boolean;
    mode: string;
    requestfilterelements: RequestFilterElement[];
    reverse: any[];
    predicate: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private changeFilterElementService: ChangeFilterElementService,
        private requestFilterElementService: RequestFilterElementService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.mode = Mode.mode;
        if (this.mode !== 'response-draft') {
            this.isView = true;
        }
        this.isSaving = false;

        if (this.changeFilterElement.requestFilterElementId != null) {
            if (this.changeFilterElement.id == null) {
                this.changeFilterElement.changeRequestElements = [];
                this.changeFilterElement.requestFilterElement.requestElements.forEach(value => {
                    const changeRequestElement = new ChangeRequestElement();
                    changeRequestElement.requestElementId = value.id;
                    changeRequestElement.title = value.elementTitle;
                    changeRequestElement.count = value.count;
                    changeRequestElement.currentModel = value.currentModel;
                    changeRequestElement.lastChangeDate = value.lastChangeDate;
                    changeRequestElement.elementRequestReason = value.elementRequestReason;
                    changeRequestElement.originalModel = value.elementOriginalModel;
                    this.changeFilterElement.changeRequestElements.push(changeRequestElement);
                });
            }
        }
        /*this.requestFilterElementService
            .query()
            .subscribe((res: HttpResponse<RequestFilterElement[]>) => {
                if (!this.changeFilterElement.requestFilterElementId) {
                    this.requestfilterelements = res.body;
                } else {
                    this.requestFilterElementService
                        .find(this.changeFilterElement.requestFilterElementId)
                        .subscribe((subRes: RequestFilterElement) => {
                            this.requestfilterelements = [subRes].concat(res.message);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));*/
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirm() {
        this.subscribeToSaveResponse(this.changeFilterElementService.confirm(this.changeFilterElement.id));
    }

    send() {
        this.subscribeToSaveResponse(this.changeFilterElementService.send(this.changeFilterElement.id));
    }

    save() {
        this.isSaving = true;
        if (this.changeFilterElement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.changeFilterElementService.update(this.changeFilterElement));
        } else {
            this.subscribeToSaveResponse(
                this.changeFilterElementService.create(this.changeFilterElement));
        }
    }

    trackRequestFilterElementById(index: number, item: RequestFilterElement) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChangeFilterElement>>) {
        result.subscribe((res: HttpResponse<ChangeFilterElement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChangeFilterElement) {
        this.eventManager.broadcast({name: 'changeFilterElementListModification', content: 'OK'});
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
    selector: 'jhi-change-filter-element-popup',
    template: ''
})
export class ChangeFilterElementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private changeFilterElementPopupService: ChangeFilterElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            Mode.mode = params['mode'];

            if (params['id']) {
                this.changeFilterElementPopupService
                    .open(ChangeFilterElementDialogComponent as Component, params['id']);
            } else if (params['requestFilterElementId']) {
                this.changeFilterElementPopupService
                    .open(ChangeFilterElementDialogComponent as Component, null, params['requestFilterElementId']);
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

class Mode {
    static mode: string;
}
