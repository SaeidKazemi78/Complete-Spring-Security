import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {DayDepotServiceOilTankPopupService} from './day-depot-service-oil-tank-popup.service';
import {DayDepotServiceOilTank} from './day-depot-service-oil-tank.model';
import {DayDepotServiceOilTankService} from './day-depot-service-oil-tank.service';

@Component({
    selector: 'jhi-full-end-measurement',
    templateUrl: './full-end-measurement-dialog.component.html'
})
export class FullEndMeasurementDialogComponent {

    dayDepotServiceOilTank: DayDepotServiceOilTank;

    constructor(private dayDepotServiceOilTankService: DayDepotServiceOilTankService,
                public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    fullEndMeasurement(id: number) {
        this.dayDepotServiceOilTankService.fullEndMeasurement(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dayDepotServiceOilTankListModification',
                content: 'Closed an dayDepotServiceOilTank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-full-end-measurement-popup',
    template: ''
})
export class FullEndMeasurementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private dayDepotServiceOilTankPopupService: DayDepotServiceOilTankPopupService) {
    }

    ngOnInit() {
        console.log('close called test');
        this.routeSub = this.route.params.subscribe(params => {
            this.dayDepotServiceOilTankPopupService
                .open(FullEndMeasurementDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
