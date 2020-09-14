import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleModel } from './vehicle-model.model';
import { VehicleModelPopupService } from './vehicle-model-popup.service';
import { VehicleModelService } from './vehicle-model.service';

@Component({
    selector: 'jhi-vehicle-model-confirm-dialog',
    templateUrl: './vehicle-model-confirm-dialog.component.html'
})
export class VehicleModelConfirmDialogComponent implements OnInit {

    vehicleModel: VehicleModel;
    confirmMode: boolean;

    constructor(
        private vehicleModelService: VehicleModelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }
    ngOnInit() {
        this.confirmMode = View.confirm;
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        if (this.confirmMode) {
            this.vehicleModelService.confirm(id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'vehicleModelListModification',
                    content: 'Deleted an vehicleModel'
                });
                this.activeModal.dismiss(true);
            });
        } else  {
            this.vehicleModelService.revertConfirm(id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'vehicleModelListModification',
                    content: 'Deleted an vehicleModel'
                });
                this.activeModal.dismiss(true);
            });
        }

    }
}

@Component({
    selector: 'jhi-vehicle-model-delete-popup',
    template: ''
})
export class VehicleModelConfirmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleModelPopupService: VehicleModelPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.queryParams.subscribe(params => {
            debugger
            View.confirm = params['mode'] === 'confirm';
        });

        this.routeSub = this.route.params.subscribe(params => {
            this.vehicleModelPopupService
                .open(VehicleModelConfirmDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class View {
    static confirm: boolean;
}

