import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {BuyType, BuyGroup, BuyTypeUsage, TypeEffect} from './buy-type.model';
import {BuyTypePopupService} from './buy-type-popup.service';
import {BuyTypeService} from './buy-type.service';
import {CustomerGroup} from 'app/entities/customer-type';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-buy-type-dialog',
    templateUrl: './buy-type-dialog.component.html'
})
export class BuyTypeDialogComponent implements OnInit {

    buyType: BuyType;
    isSaving: boolean;
    isView: boolean;
    buyGroup = BuyGroup;
    customerGroupOptions: any[] = [];
    CustomerGroup = CustomerGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private buyTypeService: BuyTypeService,
        private eventManager: JhiEventManager,
        private translateService: TranslateService
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        for (const group in CustomerGroup) {
            if (group !== this.CustomerGroup[CustomerGroup.BOUNDARY] &&  isNaN(parseInt(group, 10))) {
                this.customerGroupOptions.push({
                    value: group,
                    label: this.translateService.instant('niopdcgatewayApp.CustomerGroup.' + group),

                });
            }
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.buyType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.buyTypeService.update(this.buyType));
        } else {
            this.subscribeToSaveResponse(
                this.buyTypeService.create(this.buyType));
        }
    }

    buyGroupChanged(buyGroup) {
        if (buyGroup === BuyGroup[this.buyGroup.QUOTA] ||
            buyGroup === BuyGroup[this.buyGroup.PREBUY] ||
            buyGroup === BuyGroup[this.buyGroup.CASH]) {
            if (buyGroup === BuyGroup[this.buyGroup.QUOTA]) {
                this.buyType.buyTypeUsage = BuyTypeUsage[BuyTypeUsage.PRODUCT];
                this.buyType.typeEffect = TypeEffect[TypeEffect.AMOUNT];
            } else {
                this.buyType.buyTypeUsage = BuyTypeUsage[BuyTypeUsage.BOTH];
                this.buyType.typeEffect = TypeEffect[TypeEffect.BOTH];
            }
            this.buyType.effectDate = null;
            this.buyType.sellLimit = null;
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BuyType>>) {
        result.subscribe((res: HttpResponse<BuyType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BuyType) {
        this.eventManager.broadcast({name: 'buyTypeListModification', content: 'OK'});
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
    selector: 'jhi-buy-type-popup',
    template: ''
})
export class BuyTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private buyTypePopupService: BuyTypePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.buyTypePopupService
                    .open(BuyTypeDialogComponent as Component, params['id']);
            } else {
                this.buyTypePopupService
                    .open(BuyTypeDialogComponent as Component);
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
