import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ServiceOilTank} from './service-oil-tank.model';
import {ServiceOilTankPopupService} from './service-oil-tank-popup.service';
import {ServiceOilTankService} from './service-oil-tank.service';

@Component({
    selector: 'jhi-service-oil-tank-delete-dialog',
    templateUrl: './service-oil-tank-delete-dialog.component.html'
})
export class ServiceOilTankDeleteDialogComponent {

    serviceOilTank: ServiceOilTank;

    constructor(
        private serviceOilTankService: ServiceOilTankService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceOilTankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'serviceOilTankListModification',
                content: 'Deleted an serviceOilTank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-oil-tank-delete-popup',
    template: ''
})
export class ServiceOilTankDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceOilTankPopupService: ServiceOilTankPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.serviceOilTankPopupService
                .open(ServiceOilTankDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
