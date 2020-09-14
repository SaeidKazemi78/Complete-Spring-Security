import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Filter} from './filter.model';
import {FilterPopupService} from './filter-popup.service';
import {FilterService} from './filter.service';
import {Manufacture, ManufactureService} from '../../manufacture';
import {RefuelCenter, RefuelCenterService} from '../refuel-center';

@Component({
    selector: 'jhi-filter-dialog',
    templateUrl: './filter-dialog.component.html'
})
export class FilterDialogComponent implements OnInit {

    filter: Filter;
    isSaving: boolean;
    isView: boolean;
    trackManufactureById: any;
    refuelcenters: RefuelCenter[];
    manufactures: Manufacture[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private filterService: FilterService,
        private manufactureService: ManufactureService,
        private refuelCenterService: RefuelCenterService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.refuelCenterService.queryByReadAccess().subscribe(
            (res: HttpResponse<RefuelCenter[]>) => {
                this.refuelcenters = res.body;
            });
        this.manufactureService.query()
            .subscribe((res: HttpResponse<Manufacture[]>) => {
                this.manufactures = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.filter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.filterService.update(this.filter));
        } else {
            this.subscribeToSaveResponse(
                this.filterService.create(this.filter));
        }
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Filter>>) {
        result.subscribe((res: HttpResponse<Filter>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Filter) {
        this.eventManager.broadcast({name: 'filterListModification', content: 'OK'});
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
    selector: 'jhi-filter-popup',
    template: ''
})
export class FilterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private filterPopupService: FilterPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.filterPopupService
                    .open(FilterDialogComponent as Component, params['id']);
            } else {
                this.filterPopupService
                    .open(FilterDialogComponent as Component);
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
