import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PosDevice } from './pos-device.model';
import { PosDevicePopupService } from './pos-device-popup.service';
import { PosDeviceService } from './pos-device.service';

@Component({
    selector: 'jhi-pos-device-delete-dialog',
    templateUrl: './pos-device-delete-dialog.component.html'
})
export class PosDeviceDeleteDialogComponent {

    posDevice: PosDevice;

    constructor(
        private posDeviceService: PosDeviceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.posDeviceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'posDeviceListModification',
                content: 'Deleted an posDevice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pos-device-delete-popup',
    template: ''
})
export class PosDeviceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private posDevicePopupService: PosDevicePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.posDevicePopupService
                .open(PosDeviceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
