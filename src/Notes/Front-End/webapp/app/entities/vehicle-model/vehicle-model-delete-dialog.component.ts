import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleModel } from './vehicle-model.model';
import { VehicleModelPopupService } from './vehicle-model-popup.service';
import { VehicleModelService } from './vehicle-model.service';

@Component({
    selector: 'jhi-vehicle-model-delete-dialog',
    templateUrl: './vehicle-model-delete-dialog.component.html'
})
export class VehicleModelDeleteDialogComponent {

    vehicleModel: VehicleModel;

    constructor(
        private vehicleModelService: VehicleModelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleModelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vehicleModelListModification',
                content: 'Deleted an vehicleModel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-model-delete-popup',
    template: ''
})
export class VehicleModelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleModelPopupService: VehicleModelPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.vehicleModelPopupService
                .open(VehicleModelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
