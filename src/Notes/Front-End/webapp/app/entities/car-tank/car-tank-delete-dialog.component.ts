import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarTank } from './car-tank.model';
import { CarTankPopupService } from './car-tank-popup.service';
import { CarTankService } from './car-tank.service';

@Component({
    selector: 'jhi-car-tank-delete-dialog',
    templateUrl: './car-tank-delete-dialog.component.html'
})
export class CarTankDeleteDialogComponent {

    carTank: CarTank;

    constructor(
        private carTankService: CarTankService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carTankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'carTankListModification',
                content: 'Deleted an carTank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-car-tank-delete-popup',
    template: ''
})
export class CarTankDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carTankPopupService: CarTankPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.carTankPopupService
                .open(CarTankDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
