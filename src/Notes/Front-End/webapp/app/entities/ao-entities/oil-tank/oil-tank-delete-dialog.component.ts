import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {OilTank} from './oil-tank.model';
import {OilTankPopupService} from './oil-tank-popup.service';
import {OilTankService} from './oil-tank.service';

@Component({
    selector: 'jhi-oil-tank-delete-dialog',
    templateUrl: './oil-tank-delete-dialog.component.html'
})
export class OilTankDeleteDialogComponent {

    oilTank: OilTank;

    constructor(
        private oilTankService: OilTankService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.oilTankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'oilTankListModification',
                content: 'Deleted an oilTank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-oil-tank-delete-popup',
    template: ''
})
export class OilTankDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private oilTankPopupService: OilTankPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.oilTankPopupService
                .open(OilTankDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
