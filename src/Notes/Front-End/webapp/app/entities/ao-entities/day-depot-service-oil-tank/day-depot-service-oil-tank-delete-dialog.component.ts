import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {DayDepotServiceOilTank} from './day-depot-service-oil-tank.model';
import {DayDepotServiceOilTankPopupService} from './day-depot-service-oil-tank-popup.service';
import {DayDepotServiceOilTankService} from './day-depot-service-oil-tank.service';

@Component({
    selector: 'jhi-day-depot-service-oil-tank-delete-dialog',
    templateUrl: './day-depot-service-oil-tank-delete-dialog.component.html'
})
export class DayDepotServiceOilTankDeleteDialogComponent {

    dayDepotServiceOilTank: DayDepotServiceOilTank;

    constructor(
        private dayDepotServiceOilTankService: DayDepotServiceOilTankService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dayDepotServiceOilTankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dayDepotServiceOilTankListModification',
                content: 'Deleted an dayDepotServiceOilTank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-day-depot-service-oil-tank-delete-popup',
    template: ''
})
export class DayDepotServiceOilTankDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dayDepotServiceOilTankPopupService: DayDepotServiceOilTankPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.dayDepotServiceOilTankPopupService
                .open(DayDepotServiceOilTankDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
