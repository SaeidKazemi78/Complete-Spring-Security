import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {CarRfId} from 'app/entities/car-rf-id/car-rf-id.model';
import {CarRfIdService} from 'app/entities/car-rf-id/car-rf-id.service';
import {CarRfIdPopupService} from 'app/entities/car-rf-id/car-rf-id-popup.service';


@Component({
    selector: 'jhi-active-car-rf-id-dialog',
    templateUrl: './active-car-rf-id-dialog.component.html'
})
export class ActiveCarRfIdDialogComponent {

    carRfId: CarRfId;

    constructor(
        private carRfIdService: CarRfIdService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    allocate() {
        this.carRfIdService.allocate(this.carRfId).subscribe(response => {
            this.eventManager.broadcast({
                name: 'carRfIdListModification',
                content: 'Deleted an cost'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-active-car-rf-id-popup',
    template: ''
})
export class ActiveCarRfIdPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carRfIdPopupService: CarRfIdPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.carRfIdPopupService
                .open(ActiveCarRfIdDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
