import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {MeasurementOilTank} from './measurement-oil-tank.model';
import {MeasurementOilTankPopupService} from './measurement-oil-tank-popup.service';
import {MeasurementOilTankService} from './measurement-oil-tank.service';

@Component({
    selector: 'jhi-measurement-oil-tank-delete-dialog',
    templateUrl: './measurement-oil-tank-delete-dialog.component.html'
})
export class MeasurementOilTankDeleteDialogComponent {

    measurementOilTank: MeasurementOilTank;

    constructor(
        private measurementOilTankService: MeasurementOilTankService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.measurementOilTankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'measurementOilTankListModification',
                content: 'Deleted an measurementOilTank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-measurement-oil-tank-delete-popup',
    template: ''
})
export class MeasurementOilTankDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private measurementOilTankPopupService: MeasurementOilTankPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.measurementOilTankPopupService
                .open(MeasurementOilTankDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
