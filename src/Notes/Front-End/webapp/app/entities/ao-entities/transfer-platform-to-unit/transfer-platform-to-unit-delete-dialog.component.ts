import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {TransferPlatformToUnit} from './transfer-platform-to-unit.model';
import {TransferPlatformToUnitPopupService} from './transfer-platform-to-unit-popup.service';
import {TransferPlatformToUnitService} from './transfer-platform-to-unit.service';

@Component({
    selector: 'jhi-transfer-platform-to-unit-delete-dialog',
    templateUrl: './transfer-platform-to-unit-delete-dialog.component.html'
})
export class TransferPlatformToUnitDeleteDialogComponent {

    transferPlatformToUnit: TransferPlatformToUnit;

    constructor(
        private transferPlatformToUnitService: TransferPlatformToUnitService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transferPlatformToUnitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transferPlatformToUnitListModification',
                content: 'Deleted an transferPlatformToUnit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transfer-platform-to-unit-delete-popup',
    template: ''
})
export class TransferPlatformToUnitDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transferPlatformToUnitPopupService: TransferPlatformToUnitPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.transferPlatformToUnitPopupService
                .open(TransferPlatformToUnitDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
