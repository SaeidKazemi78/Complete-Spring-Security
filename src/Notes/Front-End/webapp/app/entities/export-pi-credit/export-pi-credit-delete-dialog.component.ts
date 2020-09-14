import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ExportPiCreditPopupService} from './export-pi-credit-popup.service';
import {CustomerCredit, CustomerCreditService} from 'app/entities/customer-credit';

@Component({
    selector: 'jhi-export-pi-payment-delete-dialog',
    templateUrl: './export-pi-credit-delete-dialog.component.html'
})
export class ExportPiCreditDeleteDialogComponent {

    customerCredit: CustomerCredit;

    constructor(
        private customerCreditService: CustomerCreditService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerCreditService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'exportPiCreditListModification',
                content: 'Deleted an exportPiPayment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-export-pi-credit-delete-popup',
    template: ''
})
export class ExportPiCreditDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exportPiCreditPopupService: ExportPiCreditPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.exportPiCreditPopupService
                .open(ExportPiCreditDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
