import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostElement } from './cost-element.model';
import { CostElementPopupService } from './cost-element-popup.service';
import { CostElementService } from './cost-element.service';

@Component({
    selector: 'jhi-cost-element-delete-dialog',
    templateUrl: './cost-element-delete-dialog.component.html'
})
export class CostElementDeleteDialogComponent {

    costElement: CostElement;

    constructor(
        private costElementService: CostElementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costElementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'costElementListModification',
                content: 'Deleted an costElement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cost-element-delete-popup',
    template: ''
})
export class CostElementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costElementPopupService: CostElementPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.costElementPopupService
                .open(CostElementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
