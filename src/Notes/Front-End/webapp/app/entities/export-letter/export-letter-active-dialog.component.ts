import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ExportPiPayment} from '../export-pi-payment/export-pi-payment.model';
import {ExportPiPaymentPopupService} from '../export-pi-payment/export-pi-payment-popup.service';
import {ExportPiPaymentService} from '../export-pi-payment/export-pi-payment.service';
import {ExportPi, ExportPiPopupService, ExportPiService} from 'app/entities/export-pi';
import {ExportLetterService} from 'app/entities/export-letter/export-letter.service';
import {ExportLetterPopupService} from 'app/entities/export-letter/export-letter-popup.service';
import {ExportLetter} from 'app/entities/export-letter/export-letter.model';

@Component({
    selector: 'jhi-export-pi-active-dialog',
    templateUrl: './export-letter-active-dialog.component.html'
})
export class ExportLetterActiveDialogComponent {

    exportLetter: ExportLetter;

    constructor(
        private exportLetterService: ExportLetterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    activeConfirm(id: number) {
        this.exportLetterService.active(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'exportLetterListModification',
                content: 'activated an exportLetter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-export-pi-active-popup',
    template: ''
})
export class ExportLetterActivePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exportLetterPopupService: ExportLetterPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.exportLetterPopupService
                .open(ExportLetterActiveDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
