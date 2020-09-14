import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CustomerDeactiveRule, DeactiveReason} from './customer-deactive-rule.model';
import {CustomerDeactiveRulePopupService} from './customer-deactive-rule-popup.service';
import {CustomerDeactiveRuleService} from './customer-deactive-rule.service';
import {Location, LocationService} from '../location';
import {CustomerType, CustomerTypeService} from '../customer-type';
import {HttpResponse} from '@angular/common/http';
import {SelectItem} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-customer-deactive-rule-dialog',
    templateUrl: './customer-deactive-rule-dialog.component.html'
})
export class CustomerDeactiveRuleDialogComponent implements OnInit {

    customerDeactiveRule: CustomerDeactiveRule;
    isSaving: boolean;
    isView: boolean;

    locations: Location[];
    deactiveReasons: SelectItem[] = [];
    customertypes: SelectItem[] = [];
    selectedCustomertypes: number[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerDeactiveRuleService: CustomerDeactiveRuleService,
        private locationService: LocationService,
        private customerTypeService: CustomerTypeService,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        if (this.customerDeactiveRule.id) {
            this.selectedCustomertypes = this.customerDeactiveRule.customerTypes
                .map(value => value.id);
        }

        if (this.customerDeactiveRule.customerGroup) {
            this.onChangeCustomerGroup(this.customerDeactiveRule.customerGroup);
        }

        for (const deactiveReason in DeactiveReason) {
            if (isNaN(parseInt(deactiveReason, 10))) {
                this.translateService.get('niopdcgatewayApp.DeactiveReason.' + deactiveReason)
                    .subscribe(value => {
                        this.deactiveReasons.push({
                            value: deactiveReason,
                            label: value
                        });
                    });
            }
        }

    }

    onChangeCustomerGroup(data) {
        this.customerDeactiveRule.customerTypes = [];
        this.customerTypeService.queryByCustomerGroup(data).subscribe(customerTypes => {
            this.customertypes = customerTypes.body.map((value1: CustomerType) => {
                return {label: value1.title, value: value1.id};
            });
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {

        this.customerDeactiveRule.customerTypes = this.selectedCustomertypes.map(value => new CustomerType(value));
        this.isSaving = true;
        if (this.customerDeactiveRule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerDeactiveRuleService.update(this.customerDeactiveRule));
        } else {
            this.subscribeToSaveResponse(
                this.customerDeactiveRuleService.create(this.customerDeactiveRule));
        }
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerDeactiveRule>>) {
        result.subscribe((res: HttpResponse<CustomerDeactiveRule>) =>
            this.onSaveSuccess(res.body), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerDeactiveRule) {
        this.eventManager.broadcast({name: 'customerDeactiveRuleListModification', content: 'OK'});
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
    selector: 'jhi-customer-deactive-rule-popup',
    template: ''
})
export class CustomerDeactiveRulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerDeactiveRulePopupService: CustomerDeactiveRulePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {

                this.customerDeactiveRulePopupService
                    .open(CustomerDeactiveRuleDialogComponent as Component, params['id']);
            } else {
                this.customerDeactiveRulePopupService
                    .open(CustomerDeactiveRuleDialogComponent as Component, null, params['customerId']);
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
