import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostRate } from './cost-rate.model';
import { CostRatePopupService } from './cost-rate-popup.service';
import { CostRateService } from './cost-rate.service';

@Component({
    selector: 'jhi-cost-rate-delete-dialog',
    templateUrl: './cost-rate-delete-dialog.component.html'
})
export class CostRateDeleteDialogComponent {

    costRate: CostRate;

    constructor(
        private costRateService: CostRateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costRateService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'costRateListModification',
                content: 'Deleted an costRate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cost-rate-delete-popup',
    template: ''
})
export class CostRateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costRatePopupService: CostRatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.costRatePopupService
                .open(CostRateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
