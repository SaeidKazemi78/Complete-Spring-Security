import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ExportPiPayment} from './export-pi-payment.model';
import {ExportPiPaymentPopupService} from './export-pi-payment-popup.service';
import {ExportPiPaymentService} from './export-pi-payment.service';

@Component({
    selector: 'jhi-export-pi-payment-delete-dialog',
    templateUrl: './export-pi-payment-delete-dialog.component.html'
})
export class ExportPiPaymentDeleteDialogComponent {

    exportPiPayment: ExportPiPayment;

    constructor(
        private exportPiPaymentService: ExportPiPaymentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.exportPiPaymentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'exportPiPaymentListModification',
                content: 'Deleted an exportPiPayment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-export-pi-payment-delete-popup',
    template: ''
})
export class ExportPiPaymentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exportPiPaymentPopupService: ExportPiPaymentPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.exportPiPaymentPopupService
                .open(ExportPiPaymentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
