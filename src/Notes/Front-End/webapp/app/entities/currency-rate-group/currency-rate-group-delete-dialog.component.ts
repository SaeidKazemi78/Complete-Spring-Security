import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CurrencyRateGroup } from './currency-rate-group.model';
import { CurrencyRateGroupPopupService } from './currency-rate-group-popup.service';
import { CurrencyRateGroupService } from './currency-rate-group.service';

@Component({
    selector: 'jhi-currency-rate-group-delete-dialog',
    templateUrl: './currency-rate-group-delete-dialog.component.html'
})
export class CurrencyRateGroupDeleteDialogComponent {

    currencyRateGroup: CurrencyRateGroup;

    constructor(
        private currencyRateGroupService: CurrencyRateGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.currencyRateGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'currencyRateGroupListModification',
                content: 'Deleted an currencyRateGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-currency-rate-group-delete-popup',
    template: ''
})
export class CurrencyRateGroupDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private currencyRateGroupPopupService: CurrencyRateGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.currencyRateGroupPopupService
                .open(CurrencyRateGroupDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
