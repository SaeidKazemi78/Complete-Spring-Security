import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {BaseQuery, BaseQueryParameter, BaseQueryResult} from './base-query.model';
import {BaseQueryPopupService} from './base-query-popup.service';
import {BaseQueryService} from './base-query.service';
import {TranslateService} from '@ngx-translate/core';
import {Depot, DepotService} from '../depot';
import {RefuelCenter, RefuelCenterService} from '../ao-entities/refuel-center';

@Component({
    selector: 'jhi-base-query-dialog',
    templateUrl: './base-query-dialog.component.html'
})
export class BaseQueryDialogComponent implements OnInit {

    baseQuery: BaseQuery;
    isSaving: boolean;
    isView: boolean;
    cols: any;
    refuelCenters: RefuelCenter[];

    resultList: any;
    baseQueryResult: BaseQueryResult;
    locationId: number;
    customerId: number;
    date: any;
    startDate: any;
    finishDate: any;
    depots: Depot[];

    parameters = [];
    parameterDate: boolean;
    parameterStartDate: boolean;
    parameterFinishDate: boolean;
    parameterLocation: boolean;
    parameterCustomer: boolean;

    currentSearch: string;
    page: any;
    itemsPerPage: any;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private refuelCenterService: RefuelCenterService,
                private baseQueryService: BaseQueryService,
                private depotService: DepotService,
                private translateService: TranslateService,
                private eventManager: JhiEventManager) {

        for (const baseQueryParameter in BaseQueryParameter) {
            if (isNaN(parseInt(baseQueryParameter, 10))) {
                this.parameters.push({
                    value: baseQueryParameter,
                    label: this.translateService.instant('niopdcgatewayApp.BaseQueryParameter.' + baseQueryParameter),

                });
            }
        }

    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        if (this.baseQuery.id) {
            this.onChangeParameters();
        }
        this.loadAll();
    }

    onChangeParameters() {
        if (this.baseQuery.parameters && this.baseQuery.parameters.length) {
            this.parameterDate = this.baseQuery.parameters.includes('DATE');
            this.parameterStartDate = this.baseQuery.parameters.includes('START_DATE');
            this.parameterFinishDate = this.baseQuery.parameters.includes('FINISH_DATE');
            this.parameterLocation = this.baseQuery.parameters.includes('LOCATION');
            this.parameterCustomer = this.baseQuery.parameters.includes('CUSTOMER');
        } else {
            this.parameterDate =
                this.parameterStartDate =
                    this.parameterFinishDate =
                        this.parameterLocation =
                            this.parameterCustomer = false;
        }
    }

    loadAll() {
        this.refuelCenterService.query({}).subscribe((res: HttpResponse<RefuelCenter[]>) => {
            this.refuelCenters = res.body;
        });
    }

    runQuery() {
        this.baseQueryService.resultListByTempQuery(this.baseQuery, this.date, this.locationId, this.startDate, this.finishDate, this.customerId).subscribe(baseQueryResult => {
            this.baseQueryResult = baseQueryResult.body;
            this.resultList = [];
            if (!this.baseQueryResult.resultList) {
                return;
            }
            this.baseQueryResult.resultList.forEach(value => {
                let column: any;
                column = {};
                for (let i = 0; i < this.baseQueryResult.header.length; i++) {
                    column[this.baseQueryResult.header[i]] = value[i];
                }
                this.resultList.push(column);

            });

            this.cols = [];
            this.baseQueryResult.header.forEach(value => {
                let header: any;
                header = {};
                header.field = value;
                header.header = value;
                this.cols.push(header);
            });
            this.cols = this.cols.reverse();

        }, error1 => console.log(error1));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.baseQuery.id !== undefined) {
            this.subscribeToSaveResponse(
                this.baseQueryService.update(this.baseQuery));
        } else {
            this.subscribeToSaveResponse(
                this.baseQueryService.create(this.baseQuery));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BaseQuery>>) {
        result.subscribe((res: HttpResponse<BaseQuery>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BaseQuery) {
        this.eventManager.broadcast({name: 'baseQueryListModification', content: 'OK'});
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
    selector: 'jhi-base-query-popup',
    template: ''
})
export class BaseQueryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private baseQueryPopupService: BaseQueryPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.baseQueryPopupService
                    .open(BaseQueryDialogComponent as Component, params['id']);
            } else {
                this.baseQueryPopupService
                    .open(BaseQueryDialogComponent as Component);
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
