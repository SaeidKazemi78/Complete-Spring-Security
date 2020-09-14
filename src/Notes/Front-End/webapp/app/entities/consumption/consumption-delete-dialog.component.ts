import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Consumption } from './consumption.model';
import { ConsumptionPopupService } from './consumption-popup.service';
import { ConsumptionService } from './consumption.service';

@Component({
    selector: 'jhi-consumption-delete-dialog',
    templateUrl: './consumption-delete-dialog.component.html'
})
export class ConsumptionDeleteDialogComponent {

    consumption: Consumption;

    constructor(
        private consumptionService: ConsumptionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.consumptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'consumptionListModification',
                content: 'Deleted an consumption'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-consumption-delete-popup',
    template: ''
})
export class ConsumptionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private consumptionPopupService: ConsumptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.consumptionPopupService
                .open(ConsumptionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
