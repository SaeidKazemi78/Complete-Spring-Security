import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cost } from './cost.model';
import { CostPopupService } from './cost-popup.service';
import { CostService } from './cost.service';

@Component({
    selector: 'jhi-cost-delete-dialog',
    templateUrl: './cost-delete-dialog.component.html'
})
export class CostDeleteDialogComponent {

    cost: Cost;

    constructor(
        private costService: CostService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'costListModification',
                content: 'Deleted an cost'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cost-delete-popup',
    template: ''
})
export class CostDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costPopupService: CostPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.costPopupService
                .open(CostDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
