import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {CurrencyRateGroup} from './currency-rate-group.model';
import {CurrencyRateGroupPopupService} from './currency-rate-group-popup.service';
import {CurrencyRateGroupService} from './currency-rate-group.service';

@Component({
    selector: 'jhi-currency-rate-group-dialog',
    templateUrl: './currency-rate-group-dialog.component.html'
})
export class CurrencyRateGroupDialogComponent implements OnInit {

    currencyRateGroup: CurrencyRateGroup;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private currencyRateGroupService: CurrencyRateGroupService,
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
        if (this.currencyRateGroup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.currencyRateGroupService.update(this.currencyRateGroup));
        } else {
            this.subscribeToSaveResponse(
                this.currencyRateGroupService.create(this.currencyRateGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CurrencyRateGroup>>) {
        result.subscribe((res: HttpResponse<CurrencyRateGroup>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CurrencyRateGroup) {
        this.eventManager.broadcast({name: 'currencyRateGroupListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-currency-rate-group-popup',
    template: ''
})
export class CurrencyRateGroupPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private currencyRateGroupPopupService: CurrencyRateGroupPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.currencyRateGroupPopupService
                    .open(CurrencyRateGroupDialogComponent as Component, params['id']);
            } else {
                this.currencyRateGroupPopupService
                    .open(CurrencyRateGroupDialogComponent as Component);
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
