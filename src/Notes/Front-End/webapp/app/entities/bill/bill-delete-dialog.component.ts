import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bill } from './bill.model';
import { BillPopupService } from './bill-popup.service';
import { BillService } from './bill.service';

@Component({
    selector: 'jhi-bill-delete-dialog',
    templateUrl: './bill-delete-dialog.component.html'
})
export class BillDeleteDialogComponent {

    bill: Bill;

    constructor(
        private billService: BillService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.billService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'billListModification',
                content: 'Deleted an bill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bill-delete-popup',
    template: ''
})
export class BillDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billPopupService: BillPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.billPopupService
                .open(BillDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
