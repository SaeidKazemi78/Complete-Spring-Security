import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {RefuelCenter} from './refuel-center.model';
import {RefuelCenterPopupService} from './refuel-center-popup.service';
import {RefuelCenterService} from './refuel-center.service';

@Component({
    selector: 'jhi-refuel-center-delete-dialog',
    templateUrl: './refuel-center-delete-dialog.component.html'
})
export class RefuelCenterDeleteDialogComponent {

    refuelCenter: RefuelCenter;

    constructor(
        private refuelCenterService: RefuelCenterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.refuelCenterService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'refuelCenterListModification',
                content: 'Deleted an refuelCenter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-refuel-center-delete-popup',
    template: ''
})
export class RefuelCenterDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private refuelCenterPopupService: RefuelCenterPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.refuelCenterPopupService
                .open(RefuelCenterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
