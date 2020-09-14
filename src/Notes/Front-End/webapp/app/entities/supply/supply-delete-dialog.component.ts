import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Supply } from './supply.model';
import { SupplyPopupService } from './supply-popup.service';
import { SupplyService } from './supply.service';

@Component({
    selector: 'jhi-supply-delete-dialog',
    templateUrl: './supply-delete-dialog.component.html'
})
export class SupplyDeleteDialogComponent {

    supply: Supply;

    constructor(
        private supplyService: SupplyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.supplyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'supplyListModification',
                content: 'Deleted an supply'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-supply-delete-popup',
    template: ''
})
export class SupplyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyPopupService: SupplyPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.supplyPopupService
                .open(SupplyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
