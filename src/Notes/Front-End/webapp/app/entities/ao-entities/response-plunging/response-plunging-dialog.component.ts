import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ResponsePlunging} from './response-plunging.model';
import {ResponsePlungingPopupService} from './response-plunging-popup.service';
import {ResponsePlungingService} from './response-plunging.service';
import {RequestPlunging, RequestPlungingService} from '../request-plunging/index';

@Component({
    selector: 'jhi-response-plunging-dialog',
    templateUrl: './response-plunging-dialog.component.html'
})
export class ResponsePlungingDialogComponent implements OnInit {

    responsePlunging: ResponsePlunging;
    isSaving: boolean;
    isView: boolean;

    requestplungings: RequestPlunging[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private responsePlungingService: ResponsePlungingService,
                private requestPlungingService: RequestPlungingService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.requestPlungingService
            .query({filter: 'responseplunging-is-null'})
            .subscribe((res: HttpResponse<RequestPlunging[]>) => {
                if (!this.responsePlunging.requestPlungingId) {
                    this.requestplungings = res.body;
                } else {
                    this.requestPlungingService
                        .find(this.responsePlunging.requestPlungingId)
                        .subscribe((subRes: HttpResponse<RequestPlunging>) => {
                            this.requestplungings = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.responsePlunging.id !== undefined) {
            this.subscribeToSaveResponse(
                this.responsePlungingService.update(this.responsePlunging));
        } else {
            this.subscribeToSaveResponse(
                this.responsePlungingService.create(this.responsePlunging));
        }
    }

    trackRequestPlungingById(index: number, item: RequestPlunging) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ResponsePlunging>>) {
        result.subscribe((res: HttpResponse<ResponsePlunging>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ResponsePlunging) {
        this.eventManager.broadcast({name: 'responsePlungingListModification', content: 'OK'});
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
    selector: 'jhi-response-plunging-popup',
    template: ''
})
export class ResponsePlungingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private responsePlungingPopupService: ResponsePlungingPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.responsePlungingPopupService
                    .open(ResponsePlungingDialogComponent as Component, params['id']);
            } else if (params['requestPlungingId']) {
                this.responsePlungingPopupService
                    .open(ResponsePlungingDialogComponent as Component, null, params['requestPlungingId']);
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
