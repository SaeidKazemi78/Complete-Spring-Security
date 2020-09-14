import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CostRate} from './cost-rate.model';
import {CostRatePopupService} from './cost-rate-popup.service';
import {CostRateService} from './cost-rate.service';
import {Currency, CurrencyService} from '../currency';
import {CurrencyRateGroup, CurrencyRateGroupService} from '../currency-rate-group';
import {Cost, CostService} from '../cost';
import {RateType} from '../cost';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ProductStepService} from '../product-step';
import {CostGroup, CostGroupService} from '../cost-group';

@Component({
    selector: 'jhi-cost-rate-dialog',
    templateUrl: './cost-rate-dialog.component.html'
})
export class CostRateDialogComponent implements OnInit {

    costRate: CostRate;
    isSaving: boolean;
    isView: boolean;

    cost: Cost;
    costGroup: CostGroup;

    costGroupId: number;
    costId: number;
    currencies: Currency[];
    isPercent: boolean;
    RateType = RateType;

    stepNos = [];

    currencyrategroups: CurrencyRateGroup[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private costRateService: CostRateService,
                private currencyService: CurrencyService,
                private router: Router,
                private currencyRateGroupService: CurrencyRateGroupService,
                private costService: CostService,
                private costGroupService: CostGroupService,
                private productStepService: ProductStepService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.costId = UsefulId.costId;
        this.costGroupId = UsefulId.costGroupId;
        this.currencyService.query()
            .subscribe((res: HttpResponse<Currency[]>) => {
                this.currencies = res.body;
                if (!this.costRate.id) {
                    this.currencies.forEach(currency => {
                        if (currency.isNationalCurrency) {
                            this.costRate.currencyId = currency.id;
                        }
                    });
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.currencyRateGroupService.query()
            .subscribe((res: HttpResponse<CurrencyRateGroup[]>) => {
                this.currencyrategroups = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.costService.find(this.costId)
            .subscribe((cost: HttpResponse<Cost>) => {
                this.cost = cost.body;
                this.costGroupId = this.cost.costGroupId;

                this.costGroupService.find(this.costGroupId)
                    .subscribe((cost: HttpResponse<Cost>) => {
                        this.costGroup = cost.body;
                        if (this.costGroup.step) {
                            this.productStepService.findAllStepNo()
                                .subscribe((steps: HttpResponse<number[]>) => {
                                    this.stepNos = steps.body;
                                });
                        }
                    });

                if (this.cost.rateType === this.RateType[this.RateType.PERCENT]) {
                    this.isPercent = true;
                }
            });

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNextLevel ?: boolean, showNext ?: boolean) {
        this.isSaving = true;
        if (this.cost.rateType === RateType[RateType.PERCENT]) {
            this.costRate.currencyId = null;
        }

        if (this.costRate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costRateService.update(this.costRate));
        } else {
            this.subscribeToSaveResponse(
                this.costRateService.create(this.costRate), showNextLevel, showNext);
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CostRate>>, showNextLevel ?: boolean, showNext ?: boolean) {
        result.subscribe((res: HttpResponse<CostRate>) =>
            this.onSaveSuccess(res.body, showNextLevel, showNext), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CostRate, showNextLevel ?: boolean, showNext ?: boolean) {
        this.eventManager.broadcast({name: 'costRateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNext) {
            setTimeout(() => {
                this.router.navigateByUrl(`/cost-group/${this.costGroupId}/cost/${result.costId}/cost-rate(popup:cost-rate-new/${result.costId})`);
            }, 1000);
        }
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

    trackCostById(index: number, item: Cost) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cost-rate-popup',
    template: ''
})
export class CostRatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private costRatePopupService: CostRatePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.costRatePopupService
                    .open(CostRateDialogComponent as Component, params['id']);
            } else if (params['costId']) {
                UsefulId.costId = params['costId'];
                this.costRatePopupService
                    .open(CostRateDialogComponent as Component, null, params['costId']);
            } else {
                console.log('not be');
            }
            if (params['costId']) {
                UsefulId.costId = params['costId'];
            }
            if (params['costGroupId']) {
                UsefulId.costGroupId = params['costGroupId'];
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

class UsefulId {
    static costId: number;
    static costGroupId: number;
}
