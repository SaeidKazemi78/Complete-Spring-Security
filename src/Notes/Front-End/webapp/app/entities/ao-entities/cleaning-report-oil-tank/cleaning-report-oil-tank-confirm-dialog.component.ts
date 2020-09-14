import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {CleaningReportOilTank} from './cleaning-report-oil-tank.model';
import {CleaningReportOilTankPopupService} from './cleaning-report-oil-tank-popup.service';
import {CleaningReportOilTankService} from './cleaning-report-oil-tank.service';

@Component({
    selector: 'jhi-cleaning-report-oil-tank-confirm-dialog',
    templateUrl: './cleaning-report-oil-tank-confirm-dialog.component.html'
})
export class CleaningReportOilTankConfirmDialogComponent {

    cleaningReportOilTank: CleaningReportOilTank;

    constructor(
        private cleaningReportOilTankService: CleaningReportOilTankService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmConfirm(id: number) {
        this.cleaningReportOilTankService.confirm(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cleaningReportOilTankListModification',
                content: 'Confirmd an cleaningReportOilTank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cleaning-report-oil-tank-confirm-popup',
    template: ''
})
export class CleaningReportOilTankConfirmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cleaningReportOilTankPopupService: CleaningReportOilTankPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.cleaningReportOilTankPopupService
                .open(CleaningReportOilTankConfirmDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
