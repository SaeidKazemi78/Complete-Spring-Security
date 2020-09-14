import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarRfId } from './car-rf-id.model';
import { CarRfIdPopupService } from './car-rf-id-popup.service';
import { CarRfIdService } from './car-rf-id.service';

@Component({
    selector: 'jhi-car-rf-id-un-allocate-dialog',
    templateUrl: './car-rf-id-unAllocate-dialog.component.html'
})
export class CarRfIdUnAllocateDialogComponent {

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

    confirmUnAllocate(id: number) {
        this.carRfIdService.hold(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'carRfIdListModification',
                content: 'Deleted an carRfId'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-car-rf-id-un-allocate-popup',
    template: ''
})
export class CarRfIdUnAllocatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carRfIdPopupService: CarRfIdPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.carRfIdPopupService
                .open(CarRfIdUnAllocateDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
