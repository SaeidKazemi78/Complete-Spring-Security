import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleCapacity } from './vehicle-capacity.model';
import { VehicleCapacityPopupService } from './vehicle-capacity-popup.service';
import { VehicleCapacityService } from './vehicle-capacity.service';

@Component({
    selector: 'jhi-vehicle-capacity-delete-dialog',
    templateUrl: './vehicle-capacity-delete-dialog.component.html'
})
export class VehicleCapacityDeleteDialogComponent {

    vehicleCapacity: VehicleCapacity;

    constructor(
        private vehicleCapacityService: VehicleCapacityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleCapacityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vehicleCapacityListModification',
                content: 'Deleted an vehicleCapacity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-capacity-delete-popup',
    template: ''
})
export class VehicleCapacityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleCapacityPopupService: VehicleCapacityPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.vehicleCapacityPopupService
                .open(VehicleCapacityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
