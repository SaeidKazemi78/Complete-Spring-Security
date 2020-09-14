import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {MilliPoor} from './milli-poor.model';
import {MilliPoorPopupService} from './milli-poor-popup.service';
import {MilliPoorService} from './milli-poor.service';

@Component({
    selector: 'jhi-milli-poor-dialog',
    templateUrl: './milli-poor-dialog.component.html'
})
export class MilliPoorDialogComponent implements OnInit {

    milliPoor: MilliPoor;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private milliPoorService: MilliPoorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.milliPoor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.milliPoorService.update(this.milliPoor));
        } else {
            this.subscribeToSaveResponse(
                this.milliPoorService.create(this.milliPoor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MilliPoor>>) {
        result.subscribe((res: HttpResponse<MilliPoor>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MilliPoor) {
        this.eventManager.broadcast({name: 'milliPoorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-milli-poor-popup',
    template: ''
})
export class MilliPoorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private milliPoorPopupService: MilliPoorPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.milliPoorPopupService
                    .open(MilliPoorDialogComponent as Component, params['id']);
            } else {
                this.milliPoorPopupService
                    .open(MilliPoorDialogComponent as Component);
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
