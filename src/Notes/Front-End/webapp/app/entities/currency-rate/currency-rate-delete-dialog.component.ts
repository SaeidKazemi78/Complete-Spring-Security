import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CurrencyRate } from './currency-rate.model';
import { CurrencyRatePopupService } from './currency-rate-popup.service';
import { CurrencyRateService } from './currency-rate.service';

@Component({
    selector: 'jhi-currency-rate-delete-dialog',
    templateUrl: './currency-rate-delete-dialog.component.html'
})
export class CurrencyRateDeleteDialogComponent {

    currencyRate: CurrencyRate;

    constructor(
        private currencyRateService: CurrencyRateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.currencyRateService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'currencyRateListModification',
                content: 'Deleted an currencyRate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-currency-rate-delete-popup',
    template: ''
})
export class CurrencyRateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private currencyRatePopupService: CurrencyRatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.currencyRatePopupService
                .open(CurrencyRateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
