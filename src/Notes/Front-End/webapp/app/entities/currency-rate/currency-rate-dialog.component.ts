import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CurrencyRate } from './currency-rate.model';
import { CurrencyRatePopupService } from './currency-rate-popup.service';
import { CurrencyRateService } from './currency-rate.service';
import { Currency, CurrencyService } from '../currency';
import { CurrencyRateGroup, CurrencyRateGroupService } from '../currency-rate-group';

@Component({
    selector: 'jhi-currency-rate-dialog',
    templateUrl: './currency-rate-dialog.component.html'
})
export class CurrencyRateDialogComponent implements OnInit {

    currencyRate: CurrencyRate;
    isSaving: boolean;
    isView: boolean;

        currencies: Currency[];

        currencyrategroups: CurrencyRateGroup[];

    constructor(
        public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
        private currencyRateService: CurrencyRateService,
            private currencyService: CurrencyService,
            private currencyRateGroupService: CurrencyRateGroupService,
    private eventManager: JhiEventManager
) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.currencyService.query()
            .subscribe((res: HttpResponse<Currency[]>) => { this.currencies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.currencyRateGroupService.query()
            .subscribe((res: HttpResponse<CurrencyRateGroup[]>) => { this.currencyrategroups = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.currencyRate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.currencyRateService.update(this.currencyRate));
        } else {
            this.subscribeToSaveResponse(
                this.currencyRateService.create(this.currencyRate));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CurrencyRate>>) {
        result.subscribe((res: HttpResponse<CurrencyRate>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CurrencyRate) {
        this.eventManager.broadcast({ name: 'currencyRateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCurrencyById(index: number, item: Currency) {
        return item.id;
    }

    trackCurrencyRateGroupById(index: number, item: CurrencyRateGroup) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-currency-rate-popup',
    template: ''
})
export class CurrencyRatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private currencyRatePopupService: CurrencyRatePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.currencyRatePopupService
                    .open(CurrencyRateDialogComponent as Component, params['id']);
            } else if (params['currencyId'])  {
                this.currencyRatePopupService
                    .open(CurrencyRateDialogComponent as Component, null, params['currencyId']);
            } else { console.log('not be'); }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class View {
    static isView: boolean;
}
