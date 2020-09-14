import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {CleaningReportOilTank} from './cleaning-report-oil-tank.model';
import {CleaningReportOilTankPopupService} from './cleaning-report-oil-tank-popup.service';
import {CleaningReportOilTankService} from './cleaning-report-oil-tank.service';

@Component({
    selector: 'jhi-cleaning-report-oil-tank-delete-dialog',
    templateUrl: './cleaning-report-oil-tank-delete-dialog.component.html'
})
export class CleaningReportOilTankDeleteDialogComponent {

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

    confirmDelete(id: number) {
        this.cleaningReportOilTankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cleaningReportOilTankListModification',
                content: 'Deleted an cleaningReportOilTank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cleaning-report-oil-tank-delete-popup',
    template: ''
})
export class CleaningReportOilTankDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cleaningReportOilTankPopupService: CleaningReportOilTankPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.cleaningReportOilTankPopupService
                .open(CleaningReportOilTankDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
