import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Pos} from './pos.model';
import {PosPopupService} from './pos-popup.service';
import {PosService} from './pos.service';
import {Airport, AirportService} from '../airport/index';

@Component({
    selector: 'jhi-pos-dialog',
    templateUrl: './pos-dialog.component.html'
})
export class PosDialogComponent implements OnInit {

    pos: Pos;
    isSaving: boolean;
    isView: boolean;

    airports: Airport[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private posService: PosService,
        private airportService: AirportService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.airportService.query()
            .subscribe((res: HttpResponse<Airport[]>) => {
                this.airports = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pos.id !== undefined) {
            this.subscribeToSaveResponse(
                this.posService.update(this.pos));
        } else {
            this.subscribeToSaveResponse(
                this.posService.create(this.pos));
        }
    }

    trackAirportById(index: number, item: Airport) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Pos>>) {
        result.subscribe((res: HttpResponse<Pos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Pos) {
        this.eventManager.broadcast({name: 'posListModification', content: 'OK'});
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
    selector: 'jhi-pos-popup',
    template: ''
})
export class PosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private posPopupService: PosPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.posPopupService
                    .open(PosDialogComponent as Component, params['id']);
            } else if (params['airportId']) {
                this.posPopupService
                    .open(PosDialogComponent as Component, null, params['airportId']);
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
