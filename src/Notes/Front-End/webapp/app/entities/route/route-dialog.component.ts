import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Route } from './route.model';
import { RoutePopupService } from './route-popup.service';
import { RouteService } from './route.service';

@Component({
    selector: 'jhi-route-dialog',
    templateUrl: './route-dialog.component.html'
})
export class RouteDialogComponent implements OnInit {

    route: Route;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private routeService: RouteService,
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
        if (this.route.id !== undefined) {
            this.subscribeToSaveResponse(
                this.routeService.update(this.route));
        } else {
            this.subscribeToSaveResponse(
                this.routeService.create(this.route));
        }
    }

private subscribeToSaveResponse(result: Observable<HttpResponse<Route>>) {
        result.subscribe((res: HttpResponse<Route>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

private onSaveSuccess(result: Route) {
        this.eventManager.broadcast({ name: 'routeListModification', content: 'OK'});
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
    selector: 'jhi-route-popup',
    template: ''
})
export class RoutePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private routePopupService: RoutePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.routePopupService
                    .open(RouteDialogComponent as Component, params['id']);
            } else {
                this.routePopupService
                    .open(RouteDialogComponent as Component);
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
